export async function garantirRoot(event: any) {
  const sessao = await requireUserSession(event)
  if (sessao.user.perfil !== 'root') {
    throw createError({ statusCode: 403, statusMessage: 'Apenas administradores podem executar esta ação' })
  }
  return sessao
}
