import type { Conta, FiltrosConta, FormularioConta, Paginacao, ResultadoListagemContas } from '~/composables/useContas'

export function createContaService(fetch: typeof $fetch = $fetch) {
  return {
    listar: (filtros: FiltrosConta = {}, paginacao?: Paginacao) =>
      fetch<ResultadoListagemContas>('/api/contas', { query: { ...filtros, ...paginacao } }),

    buscar: (id: number) =>
      fetch<Conta>(`/api/contas/${id}`),

    criar: (dados: FormularioConta) =>
      fetch<Conta>('/api/contas', {
        method: 'POST',
        body: { ...dados, descontoAte: dados.descontoAte || null, observacoes: dados.observacoes || null }
      }),

    atualizar: (id: number, dados: Partial<FormularioConta>) =>
      fetch<Conta>(`/api/contas/${id}`, {
        method: 'PUT',
        body: { ...dados, descontoAte: dados.descontoAte || null, observacoes: dados.observacoes || null }
      }),

    excluir: (id: number) =>
      fetch(`/api/contas/${id}`, { method: 'DELETE' }),

    mudarStatus: (id: number, status: 'pendente' | 'pago') =>
      fetch<Conta>(`/api/contas/${id}/status`, { method: 'PATCH', body: { status } })
  }
}

export const contaService = createContaService()
