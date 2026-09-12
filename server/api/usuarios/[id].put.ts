import { z } from 'zod'
import { garantirRoot } from '../../services/autenticacaoService'
import { atualizarUsuario, buscarUsuarioPorEmail, buscarUsuarioPorId, usuarioSemSenha } from '../../services/usuarioService'

const schema = z.object({
  nome: z.string().min(2).max(255).optional(),
  email: z.string().email().max(255).optional(),
  senha: z.string().min(8).max(100).optional(),
  perfil: z.enum(['usuario', 'root']).optional(),
  ativo: z.boolean().optional()
})

export default defineEventHandler(async (event) => {
  const sessao = await garantirRoot(event)
  const id = Number(getRouterParam(event, 'id'))

  const usuario = await buscarUsuarioPorId(id)
  if (!usuario) {
    throw createError({ statusCode: 404, statusMessage: 'Usuário não encontrado' })
  }

  const body = await readValidatedBody(event, schema.parse)

  // Impede que o root se desative a si mesmo
  if (id === sessao.user.id && body.ativo === false) {
    throw createError({ statusCode: 403, statusMessage: 'Você não pode desativar sua própria conta' })
  }

  // Impede que o root mude seu próprio perfil para usuário
  if (id === sessao.user.id && body.perfil === 'usuario') {
    throw createError({ statusCode: 403, statusMessage: 'Você não pode rebaixar sua própria conta de root' })
  }

  // Verifica se o novo e-mail já está em uso por outro usuário
  if (body.email && body.email.toLowerCase().trim() !== usuario.email.toLowerCase()) {
    if (await buscarUsuarioPorEmail(body.email)) {
      throw createError({ statusCode: 409, statusMessage: 'E-mail já está em uso' })
    }
  }

  const atualizado = await atualizarUsuario(id, body)
  return usuarioSemSenha(atualizado)
})
