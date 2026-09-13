import { configuracaoService } from '~/services/configuracaoService'
import type { Configuracao, DadosConfiguracao } from '~/services/configuracaoService'

export type { Configuracao, DadosConfiguracao }

export function useConfiguracoes() {
  const toast = useToast()

  const tratarErro = (err: any, padrao: string) => {
    toast.add({
      title: 'Erro',
      description: err?.data?.statusMessage || padrao,
      color: 'error'
    })
    throw err
  }

  const sucesso = (titulo: string, descricao?: string) =>
    toast.add({ title: titulo, description: descricao, color: 'success' })

  return {
    buscar: async () => {
      try {
        return await configuracaoService.buscar()
      } catch (err) {
        tratarErro(err, 'Erro ao carregar configurações')
      }
    },

    atualizar: async (dados: DadosConfiguracao) => {
      try {
        const resultado = await configuracaoService.atualizar(dados)
        sucesso('Configurações salvas', 'Suas preferências foram atualizadas com sucesso.')
        return resultado
      } catch (err) {
        tratarErro(err, 'Erro ao salvar configurações')
      }
    },

    obterUrlAuth: async () => {
      try {
        return await configuracaoService.obterUrlAuth()
      } catch (err) {
        tratarErro(err, 'Erro ao iniciar conexão com Outlook')
      }
    },

    desconectar: async () => {
      try {
        const resultado = await configuracaoService.desconectar()
        sucesso('Conta desconectada', 'A integração com o Outlook foi desativada.')
        return resultado
      } catch (err) {
        tratarErro(err, 'Erro ao desconectar conta do Outlook')
      }
    },

    listarCalendarios: async () => {
      try {
        return await configuracaoService.listarCalendarios()
      } catch (err) {
        tratarErro(err, 'Erro ao listar calendários do Outlook')
      }
    },

    testarConexao: async () => {
      try {
        const resultado = await configuracaoService.testarConexao()
        sucesso('Conexão OK', `Conectado como ${resultado.conta}`)
        return resultado
      } catch (err) {
        tratarErro(err, 'Erro ao testar conexão com Outlook')
      }
    }
  }
}
