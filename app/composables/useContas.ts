import { createContaService } from '~/services/contaService'

export interface Conta {
  id: number
  usuarioId: number
  nome: string
  tipo: 'pagar' | 'receber'
  valor: string
  vencimento: string
  descontoAte: string | null
  observacoes: string | null
  status: 'pendente' | 'pago'
  criadoEm: string
  atualizadoEm: string
}

export interface FiltrosConta {
  tipo?: 'pagar' | 'receber' | null
  status?: 'pendente' | 'pago' | null
  de?: string | null
  ate?: string | null
}

export interface Paginacao {
  pagina: number
  limite: number
}

export interface ResultadoListagemContas {
  contas: Conta[]
  total: number
  temMais: boolean
}

export interface FormularioConta {
  nome: string
  tipo: 'pagar' | 'receber'
  valor: number
  vencimento: string
  descontoAte?: string | null
  observacoes?: string | null
  status: 'pendente' | 'pago'
}

export function useContas() {
  const toast = useToast()
  const apiFetch = import.meta.server ? useRequestFetch() : $fetch
  const contaService = createContaService(apiFetch)

  const tratarErro = (err: any, padrao: string) => {
    toast.add({
      title: 'Erro',
      description: err?.data?.statusMessage || padrao,
      color: 'error'
    })
    throw err
  }

  const sucesso = (titulo: string, descricao?: string) => toast.add({ title: titulo, description: descricao, color: 'success' })

  async function listar(filtros: FiltrosConta = {}, paginacao?: Paginacao) {
    try {
      const query = Object.fromEntries(
        Object.entries(filtros).filter(([, v]) => v != null && v !== '')
      )
      return await contaService.listar(query, paginacao)
    } catch (err) { tratarErro(err, 'Erro ao carregar contas') }
  }

  async function buscar(id: number) {
    try {
      return await contaService.buscar(id)
    } catch (err) { tratarErro(err, 'Erro ao carregar conta') }
  }

  async function criar(dados: FormularioConta) {
    try {
      const conta = await contaService.criar(dados)
      sucesso('Conta cadastrada', `"${conta.nome}" foi salva com sucesso.`)
      return conta
    } catch (err) { tratarErro(err, 'Erro ao cadastrar conta') }
  }

  async function atualizar(id: number, dados: Partial<FormularioConta>) {
    try {
      const conta = await contaService.atualizar(id, dados)
      sucesso('Conta atualizada', `"${conta.nome}" foi editada com sucesso.`)
      return conta
    } catch (err) { tratarErro(err, 'Erro ao atualizar conta') }
  }

  async function excluir(id: number) {
    try {
      await contaService.excluir(id)
      sucesso('Conta excluída', 'A conta foi removida com sucesso.')
    } catch (err) { tratarErro(err, 'Erro ao excluir conta') }
  }

  async function mudarStatus(id: number, status: 'pendente' | 'pago') {
    try {
      const conta = await contaService.mudarStatus(id, status)
      sucesso(
        status === 'pago' ? 'Conta paga' : 'Conta pendente',
        status === 'pago' ? `"${conta.nome}" foi marcada como paga.` : `"${conta.nome}" foi marcada como pendente.`
      )
      return conta
    } catch (err) { tratarErro(err, 'Erro ao mudar status') }
  }

  return { listar, buscar, criar, atualizar, excluir, mudarStatus }
}
