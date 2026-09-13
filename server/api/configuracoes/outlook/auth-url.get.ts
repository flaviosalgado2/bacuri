import { buscarConfiguracao } from '../../../services/configuracaoService'

export default defineEventHandler(async (event) => {
  const sessao = await requireUserSession(event)
  const configuracao = await buscarConfiguracao(sessao.user.id)

  if (!configuracao.outlookClientId) {
    throw createError({ statusCode: 503, statusMessage: 'Preencha o Client ID do Outlook nas configurações' })
  }

  const redirectUri = configuracao.outlookRedirectUri || `${getRequestURL(event).origin}/api/configuracoes/outlook/callback`
  const tenantId = configuracao.outlookTenantId || 'common'
  const state = Buffer.from(JSON.stringify({ u: sessao.user.id })).toString('base64url')

  const url = new URL(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`)
  url.searchParams.set('client_id', configuracao.outlookClientId)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('response_mode', 'query')
  url.searchParams.set('scope', 'offline_access Calendars.ReadWrite User.Read')
  url.searchParams.set('state', state)

  return { url: url.toString() }
})
