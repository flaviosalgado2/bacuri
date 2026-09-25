export function useResumoContas() {
  const { listar } = useContas()

  const { data: pagar, pending: pendingPagar } = useLazyAsyncData(
    'dashboard-pagar',
    () => listar({ tipo: 'pagar' }),
    { default: () => ({ contas: [], total: 0, temMais: false }) }
  )

  const { data: receber, pending: pendingReceber } = useLazyAsyncData(
    'dashboard-receber',
    () => listar({ tipo: 'receber' }),
    { default: () => ({ contas: [], total: 0, temMais: false }) }
  )

  const pending = computed(() => pendingPagar.value || pendingReceber.value)

  const contasPagar = computed(() => pagar.value?.contas ?? [])
  const contasReceber = computed(() => receber.value?.contas ?? [])

  return {
    contasPagar,
    contasReceber,
    pending
  }
}
