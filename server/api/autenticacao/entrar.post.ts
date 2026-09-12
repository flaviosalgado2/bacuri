import { z } from 'zod'
import { buscarUsuarioPorEmail, usuarioSemSenha } from '../../services/usuarioService'

const schema = z.object({
  email: z.string().email(),
  senha: z.string().min(1)
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, schema.parse)
  const usuario = await buscarUsuarioPorEmail(body.email)

  if (!usuario || !(await verifyPassword(usuario.senhaHash, body.senha))) {
    throw createError({ statusCode: 401, statusMessage: 'E-mail ou senha inválidos' })
  }

  if (!usuario.ativo) {
    throw createError({ statusCode: 403, statusMessage: 'Usuário desativado. Entre em contato com o administrador.' })
  }

  await setUserSession(event, { user: usuarioSemSenha(usuario) })
  return usuarioSemSenha(usuario)
})
