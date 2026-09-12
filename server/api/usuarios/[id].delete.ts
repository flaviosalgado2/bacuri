import { garantirRoot } from '../../services/autenticacaoService'
import { buscarUsuarioPorId, desativarUsuario } from '../../services/usuarioService'

export default defineEventHandler(async (event) => {
  const sessao = await garantirRoot(event)
  const id = Number(getRouterParam(event, 'id'))

  const usuario = await buscarUsuarioPorId(id)
  if (!usuario) {
    throw createError({ statusCode: 404, statusMessage: 'Usuário não encontrado' })
  }

  if (id === sessao.user.id) {
    throw createError({ statusCode: 403, statusMessage: 'Você não pode desativar sua própria conta' })
  }

  await desativarUsuario(id)
  return { ok: true }
})
