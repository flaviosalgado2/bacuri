import { z } from 'zod'

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

  await setUserSession(event, { user: usuarioSemSenha(usuario) })
  return usuarioSemSenha(usuario)
})
