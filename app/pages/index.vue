<script setup lang="ts">
definePageMeta({ layout: 'padrao', middleware: 'logado', titulo: 'Dashboard', subtitulo: 'Visão geral das suas finanças' })
useHead({ title: 'Dashboard - Bacuri' })

const { contasPagar, contasReceber, pending } = useResumoContas()

function paraDataLocal(d: string) {
  const [ano, mes, dia] = d.split('-').map(Number)
  return new Date(ano, mes - 1, dia)
}

const pendentesPagar = computed(() => contasPagar.value.filter(c => c.status === 'pendente'))
const pendentesReceber = computed(() => contasReceber.value.filter(c => c.status === 'pendente'))
const todasPendentes = computed(() => [...pendentesPagar.value, ...pendentesReceber.value])

const totalPagar = computed(() => pendentesPagar.value.reduce((a, c) => a + Number(c.valor), 0))
const totalReceber = computed(() => pendentesReceber.value.reduce((a, c) => a + Number(c.valor), 0))

const vencidas = computed(() => {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  return todasPendentes.value.filter(c => paraDataLocal(c.vencimento) < hoje)
})

const proximas = computed(() => {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)

  const limite = new Date()
  limite.setDate(hoje.getDate() + 7)
  limite.setHours(23, 59, 59, 999)

  return todasPendentes.value
    .filter(c => {
      const vencimento = paraDataLocal(c.vencimento)
      return vencimento >= hoje && vencimento <= limite
    })
    .sort((a, b) => +paraDataLocal(a.vencimento) - +paraDataLocal(b.vencimento))
    .slice(0, 5)
})

const moeda = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
const data = (d: string) => paraDataLocal(d).toLocaleDateString('pt-BR')

const mostrarDados = useState('mostrarDadosDashboard', () => false)
</script>

<template>
  <div>
    <div v-if="pending" class="flex justify-center py-12">
      <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-(--ui-primary)" />
    </div>

    <template v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <UCard>
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-(--ui-text-muted)">Quantidade de Contas a Pagar (Pendentes)</p>
              <p class="text-2xl font-bold text-red-500">{{ mostrarDados ? pendentesPagar.length : '••' }}</p>
            </div>
            <UIcon name="i-lucide-receipt" class="w-6 h-6 text-red-500" />
          </div>
        </UCard>
        <UCard>
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-(--ui-text-muted)">Valor Total Contas a Pagar (Pendentes)</p>
              <p class="text-2xl font-bold text-red-500">{{ mostrarDados ? moeda(totalPagar) : 'R$ ••••' }}</p>
            </div>
            <UIcon name="i-lucide-receipt" class="w-6 h-6 text-red-500" />
          </div>
        </UCard>
        <UCard>
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-(--ui-text-muted)">Quantidade de Contas a Receber (Pendentes)</p>
              <p class="text-2xl font-bold text-emerald-500">{{ mostrarDados ? pendentesReceber.length : '••' }}</p>
            </div>
            <UIcon name="i-lucide-hand-coins" class="w-6 h-6 text-emerald-500" />
          </div>
        </UCard>
        <UCard>
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-(--ui-text-muted)">Valor Total Contas a Receber (Pendentes)</p>
              <p class="text-2xl font-bold text-emerald-500">{{ mostrarDados ? moeda(totalReceber) : 'R$ ••••' }}</p>
            </div>
            <UIcon name="i-lucide-hand-coins" class="w-6 h-6 text-emerald-500" />
          </div>
        </UCard>
        <UCard>
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-(--ui-text-muted)">Quantidade Geral de Contas Vencidas (Pendentes)</p>
              <p class="text-2xl font-bold text-red-500">{{ mostrarDados ? vencidas.length : '••' }}</p>
            </div>
            <UIcon name="i-lucide-calendar-x" class="w-6 h-6 text-red-500" />
          </div>
        </UCard>
        <UCard>
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-(--ui-text-muted)">Quantidade Geral Total (Pendentes)</p>
              <p class="text-2xl font-bold">{{ mostrarDados ? todasPendentes.length : '••' }}</p>
            </div>
            <UIcon name="i-lucide-clock-alert" class="w-6 h-6 text-(--ui-warning)" />
          </div>
        </UCard>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <UCard class="lg:col-span-2">
          <template #header><h3 class="font-semibold">Ações rápidas</h3></template>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UButton to="/contas/pagar/nova" color="error" variant="soft" size="xl" block icon="i-lucide-receipt">Nova conta a pagar</UButton>
            <UButton to="/contas/receber/nova" color="success" variant="soft" size="xl" block icon="i-lucide-hand-coins">Nova conta a receber</UButton>
          </div>
        </UCard>

        <UCard>
          <template #header><h3 class="font-semibold flex items-center gap-2"><UIcon name="i-lucide-clock" class="text-(--ui-warning)" /> Próximos vencimentos</h3></template>
          <div v-if="!proximas.length" class="text-center py-6 text-(--ui-text-muted)">
            <UIcon name="i-lucide-check-circle" class="w-12 h-12 mx-auto mb-2 text-(--ui-success)" />
            <p>Nada para os próximos 7 dias</p>
          </div>
          <ul v-else class="space-y-3">
            <li v-for="c in proximas" :key="c.id">
              <ULink :to="`/contas/${c.tipo}?destaque=${c.id}`" class="flex justify-between p-3 rounded-lg transition-colors" :class="c.tipo === 'pagar' ? 'bg-red-500/10 hover:bg-red-500/20' : 'bg-emerald-500/10 hover:bg-emerald-500/20'">
                <div>
                  <p class="font-medium text-sm">{{ mostrarDados ? c.nome : '••••••' }}</p>
                  <p class="text-xs text-(--ui-text-muted)">Vence em {{ data(c.vencimento) }}</p>
                </div>
                <p class="font-semibold text-sm">{{ mostrarDados ? moeda(Number(c.valor)) : 'R$ ••••' }}</p>
              </ULink>
            </li>
          </ul>
        </UCard>
      </div>

      <UCard>
        <template #header><h3 class="font-semibold">Despesas mensais</h3></template>
        <GraficoDespesasMensais :contas-pagar="contasPagar" :contas-receber="contasReceber" :mostrar-valores="mostrarDados" />
      </UCard>
    </template>
  </div>
</template>
