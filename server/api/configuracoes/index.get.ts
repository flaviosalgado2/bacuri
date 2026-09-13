import { buscarConfiguracao, configuracaoPublica } from '../../services/configuracaoService'

export default defineEventHandler(async (event) => {
  const sessao = await requireUserSession(event)
  const configuracao = await buscarConfiguracao(sessao.user.id)
  return configuracaoPublica(configuracao)
})
