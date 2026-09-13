import { buscarConfiguracao } from '../../../services/configuracaoService'

export default defineEventHandler(async (event) => {
  const sessao = await requireUserSession(event)
  const configuracao = await buscarConfiguracao(sessao.user.id)

  if (!configuracao.outlookToken) {
    throw createError({ statusCode: 401, statusMessage: 'Conta do Outlook não conectada' })
  }

  try {
    const perfil = await $fetch('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${configuracao.outlookToken}` }
    }) as any

    return {
      ok: true,
      conta: perfil.mail || perfil.userPrincipalName,
      nome: perfil.displayName
    }
  } catch (err: any) {
    throw createError({ statusCode: 502, statusMessage: `Falha na conexão com Outlook: ${err?.data?.error?.message || err?.message || 'desconhecido'}` })
  }
})
