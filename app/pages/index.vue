<script setup lang="ts">
definePageMeta({ layout: 'padrao', middleware: 'logado', titulo: 'Dashboard', subtitulo: 'Visão geral das suas finanças' })
useHead({ title: 'Dashboard - Bacuri' })

const { listar } = useContas()
const { data: resultado, pending } = await useLazyAsyncData('dashboard', () => listar(), { default: () => ({ contas: [], total: 0, temMais: false }) })

const contas = computed(() => resultado.value?.contas ?? [])

const totalPagar = computed(() => pendentes.value.filter(c => c.tipo === 'pagar').reduce((a, c) => a + Number(c.valor), 0))
const totalReceber = computed(() => pendentes.value.filter(c => c.tipo === 'receber').reduce((a, c) => a + Number(c.valor), 0))
const pagarPendentes = computed(() => pendentes.value.filter(c => c.tipo === 'pagar'))
const receberPendentes = computed(() => pendentes.value.filter(c => c.tipo === 'receber'))
const pendentes = computed(() => contas.value.filter(c => c.status === 'pendente'))

function paraDataLocal(d: string) {
  const [ano, mes, dia] = d.split('-').map(Number)
  return new Date(ano, mes - 1, dia)
}

const proximas = computed(() => {
  const limite = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  return pendentes.value.filter(c => paraDataLocal(c.vencimento) <= limite).sort((a, b) => +paraDataLocal(a.vencimento) - +paraDataLocal(b.vencimento)).slice(0, 5)
})

const moeda = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
const data = (d: string) => paraDataLocal(d).toLocaleDateString('pt-BR')
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
              <p class="text-2xl font-bold text-red-500">{{ pagarPendentes.length }}</p>
            </div>
            <UIcon name="i-lucide-receipt" class="w-6 h-6 text-red-500" />
          </div>
        </UCard>
        <UCard>
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-(--ui-text-muted)">Valor Total Contas a Pagar (Pendentes)</p>
              <p class="text-2xl font-bold text-red-500">{{ moeda(totalPagar) }}</p>
            </div>
            <UIcon name="i-lucide-receipt" class="w-6 h-6 text-red-500" />
          </div>
        </UCard>
        <UCard>
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-(--ui-text-muted)">Quantidade de Contas a Receber (Pendentes)</p>
              <p class="text-2xl font-bold text-emerald-500">{{ receberPendentes.length }}</p>
            </div>
            <UIcon name="i-lucide-hand-coins" class="w-6 h-6 text-emerald-500" />
          </div>
        </UCard>
        <UCard>
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-(--ui-text-muted)">Valor Total Contas a Receber (Pendentes)</p>
              <p class="text-2xl font-bold text-emerald-500">{{ moeda(totalReceber) }}</p>
            </div>
            <UIcon name="i-lucide-hand-coins" class="w-6 h-6 text-emerald-500" />
          </div>
        </UCard>
        <UCard>
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-(--ui-text-muted)">Quantidade Geral (Pendentes)</p>
              <p class="text-2xl font-bold">{{ pendentes.length }}</p>
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
                  <p class="font-medium text-sm">{{ c.nome }}</p>
                  <p class="text-xs text-(--ui-text-muted)">Vence em {{ data(c.vencimento) }}</p>
                </div>
                <p class="font-semibold text-sm">{{ moeda(Number(c.valor)) }}</p>
              </ULink>
            </li>
          </ul>
        </UCard>
      </div>

      <UCard>
        <template #header><h3 class="font-semibold">Despesas mensais</h3></template>
        <GraficoDespesasMensais :contas="contas || []" />
      </UCard>
    </template>
  </div>
</template>
