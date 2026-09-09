import { z } from 'zod'

const schema = z.object({
  nome: z.string().min(2).max(255),
  email: z.string().email().max(255),
  senha: z.string().min(8).max(100)
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, schema.parse)

  if (await buscarUsuarioPorEmail(body.email)) {
    throw createError({ statusCode: 409, statusMessage: 'E-mail já está em uso' })
  }

  const usuario = await criarUsuario(body)
  await setUserSession(event, { user: usuarioSemSenha(usuario) })

  return usuarioSemSenha(usuario)
})
