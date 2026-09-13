import { atualizarConfiguracao, buscarConfiguracao, configuracaoPublica } from '../../../services/configuracaoService'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const code = query.code
  const state = query.state
  const error = query.error

  if (error) {
    throw createError({ statusCode: 400, statusMessage: `Erro no OAuth: ${error}` })
  }

  if (!code || typeof code !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Código de autorização não recebido' })
  }

  let usuarioId: number
  try {
    const decoded = JSON.parse(Buffer.from(String(state), 'base64url').toString())
    usuarioId = Number(decoded.u)
    if (!usuarioId) throw new Error('state inválido')
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Parâmetro state inválido' })
  }

  const configuracao = await buscarConfiguracao(usuarioId)

  if (!configuracao.outlookClientId || !configuracao.outlookClientSecret) {
    throw createError({ statusCode: 503, statusMessage: 'Credenciais do Outlook não configuradas' })
  }

  const redirectUri = configuracao.outlookRedirectUri || `${getRequestURL(event).origin}/api/configuracoes/outlook/callback`
  const tenantId = configuracao.outlookTenantId || 'common'

  let tokenData: any
  try {
    tokenData = await $fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: configuracao.outlookClientId,
        client_secret: configuracao.outlookClientSecret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri
      }).toString()
    })
  } catch (err: any) {
    throw createError({ statusCode: 502, statusMessage: `Erro ao trocar código por token: ${err?.data?.error_description || err?.message || 'desconhecido'}` })
  }

  const accessToken = tokenData.access_token
  const refreshToken = tokenData.refresh_token

  let perfil: any
  try {
    perfil = await $fetch('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
  } catch (err: any) {
    throw createError({ statusCode: 502, statusMessage: `Erro ao buscar perfil do Outlook: ${err?.data?.error?.message || err?.message || 'desconhecido'}` })
  }

  const email = perfil.mail || perfil.userPrincipalName

  const atualizada = await atualizarConfiguracao(usuarioId, {
    outlookAtivado: true,
    outlookContaEmail: email,
    outlookToken: accessToken,
    outlookRefreshToken: refreshToken
  })

  return configuracaoPublica(atualizada)
})
