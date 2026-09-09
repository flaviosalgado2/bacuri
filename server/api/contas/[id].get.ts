export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  return verificarAcesso(event, id)
})
