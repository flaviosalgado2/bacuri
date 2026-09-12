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
  tipo?: 'pagar' | 'receber'
  status?: 'pendente' | 'pago'
  de?: string
  ate?: string
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

  const tratarErro = (err: any, padrao: string) => {
    toast.add({
      title: 'Erro',
      description: err?.data?.statusMessage || padrao,
      color: 'error'
    })
    throw err
  }

  const sucesso = (titulo: string, descricao?: string) => toast.add({ title: titulo, description: descricao, color: 'success' })

  async function listar(filtros: FiltrosConta = {}) {
    try {
      return await apiFetch<Conta[]>('/api/contas', { query: filtros })
    } catch (err) { tratarErro(err, 'Erro ao carregar contas') }
  }

  async function buscar(id: number) {
    try {
      return await apiFetch<Conta>(`/api/contas/${id}`)
    } catch (err) { tratarErro(err, 'Erro ao carregar conta') }
  }

  async function criar(dados: FormularioConta) {
    try {
      const conta = await $fetch<Conta>('/api/contas', {
        method: 'POST',
        body: { ...dados, descontoAte: dados.descontoAte || null, observacoes: dados.observacoes || null }
      })
      sucesso('Conta cadastrada', `"${conta.nome}" foi salva com sucesso.`)
      return conta
    } catch (err) { tratarErro(err, 'Erro ao cadastrar conta') }
  }

  async function atualizar(id: number, dados: Partial<FormularioConta>) {
    try {
      const conta = await $fetch<Conta>(`/api/contas/${id}`, {
        method: 'PUT',
        body: { ...dados, descontoAte: dados.descontoAte || null, observacoes: dados.observacoes || null }
      })
      sucesso('Conta atualizada', `"${conta.nome}" foi editada com sucesso.`)
      return conta
    } catch (err) { tratarErro(err, 'Erro ao atualizar conta') }
  }

  async function excluir(id: number) {
    try {
      await $fetch(`/api/contas/${id}`, { method: 'DELETE' })
      sucesso('Conta excluída', 'A conta foi removida com sucesso.')
    } catch (err) { tratarErro(err, 'Erro ao excluir conta') }
  }

  async function mudarStatus(id: number, status: 'pendente' | 'pago') {
    try {
      const conta = await $fetch<Conta>(`/api/contas/${id}/status`, { method: 'PATCH', body: { status } })
      sucesso(
        status === 'pago' ? 'Conta paga' : 'Conta pendente',
        status === 'pago' ? `"${conta.nome}" foi marcada como paga.` : `"${conta.nome}" foi marcada como pendente.`
      )
      return conta
    } catch (err) { tratarErro(err, 'Erro ao mudar status') }
  }

  return { listar, buscar, criar, atualizar, excluir, mudarStatus }
}
