export default defineEventHandler(async (event) => {
  const sessao = await requireUserSession(event)
  return sessao.user
})
