export default defineEventHandler(async (event) => {
  await garantirRoot(event)
  const usuarios = await listarUsuarios()
  return usuarios.map(usuarioSemSenha)
})
