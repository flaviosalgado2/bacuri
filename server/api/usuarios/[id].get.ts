export default defineEventHandler(async (event) => {
  await garantirRoot(event)
  const id = Number(getRouterParam(event, 'id'))

  const usuario = await buscarUsuarioPorId(id)
  if (!usuario) {
    throw createError({ statusCode: 404, statusMessage: 'Usuário não encontrado' })
  }

  return usuarioSemSenha(usuario)
})
