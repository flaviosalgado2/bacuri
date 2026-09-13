import { buscarConfiguracao } from '../../../services/configuracaoService'

export default defineEventHandler(async (event) => {
  const sessao = await requireUserSession(event)
  const configuracao = await buscarConfiguracao(sessao.user.id)

  if (!configuracao.outlookToken) {
    throw createError({ statusCode: 401, statusMessage: 'Conta do Outlook não conectada' })
  }

  try {
    const calendarios = await $fetch('https://graph.microsoft.com/v1.0/me/calendars', {
      headers: { Authorization: `Bearer ${configuracao.outlookToken}` }
    }) as any

    return (calendarios.value || []).map((c: any) => ({
      id: c.id,
      nome: c.name,
      padrao: c.isDefaultCalendar
    }))
  } catch (err: any) {
    throw createError({ statusCode: 502, statusMessage: `Erro ao listar calendários: ${err?.data?.error?.message || err?.message || 'desconhecido'}` })
  }
})
