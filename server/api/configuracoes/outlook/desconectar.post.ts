import { atualizarConfiguracao, buscarConfiguracao, configuracaoPublica } from '../../../services/configuracaoService'

export default defineEventHandler(async (event) => {
  const sessao = await requireUserSession(event)

  await buscarConfiguracao(sessao.user.id)
  const atualizada = await atualizarConfiguracao(sessao.user.id, {
    outlookAtivado: false,
    outlookCalendarioId: null,
    outlookContaEmail: null,
    outlookToken: null,
    outlookRefreshToken: null
  })

  return configuracaoPublica(atualizada)
})
