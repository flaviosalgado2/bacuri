export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  await verificarAcesso(event, id)
  await excluirConta(id)
  return { ok: true }
})
