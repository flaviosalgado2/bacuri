<script setup lang="ts">
import type { Conta } from '~/composables/useContas'

definePageMeta({ layout: 'padrao', middleware: 'logado', titulo: 'Contas a Pagar', subtitulo: 'Seus compromissos' })
useHead({ title: 'A Pagar - Bacuri' })

const { listar } = useContas()

const OPÇÕES_POR_PÁGINA = [5, 10, 15, 20]

const filtros = reactive({ tipo: 'pagar' as const, status: null as 'pendente' | 'pago' | null, de: null as string | null, ate: null as string | null })
const pagina = ref(1)
const itensPorPagina = ref(10)
const contas = ref<Conta[]>([])
const total = ref(0)

const totalPaginas = computed(() => Math.ceil(total.value / itensPorPagina.value))
const paginas = computed(() => paginasVisiveis(totalPaginas.value, pagina.value))

const { data: resultado, pending, refresh } = await useLazyAsyncData('contas-pagar', () => listar(filtros, { pagina: pagina.value, limite: itensPorPagina.value }), { watch: [filtros, itensPorPagina] })

watch(resultado, (novo) => {
  if (!novo) return
  contas.value = novo.contas
  total.value = novo.total
}, { immediate: true })

watch(filtros, () => {
  pagina.value = 1
}, { deep: true })

watch(itensPorPagina, () => {
  pagina.value = 1
})

async function irParaPagina(novaPagina: number) {
  if (novaPagina < 1 || novaPagina > totalPaginas.value) return
  pagina.value = novaPagina
  await refresh()
}

async function recarregar() {
  pagina.value = 1
  await refresh()
}
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex flex-wrap items-end gap-3">
            <UFormField label="Status" class="w-44">
              <USelect v-model="filtros.status" :items="[{ label: 'Todos', value: null }, { label: 'Pendente', value: 'pendente' }, { label: 'Pago', value: 'pago' }]" class="w-full" />
            </UFormField>
            <UFormField label="De" class="w-44"><UInput v-model="filtros.de" type="date" icon="i-lucide-calendar" /></UFormField>
            <UFormField label="Até" class="w-44"><UInput v-model="filtros.ate" type="date" icon="i-lucide-calendar" /></UFormField>
          </div>
          <UButton to="/contas/pagar/nova" color="error" icon="i-lucide-receipt">Nova conta</UButton>
        </div>
      </template>

      <ListaContas :contas="contas" @atualizar="recarregar" />

      <div v-if="totalPaginas > 1 || total > OPÇÕES_POR_PÁGINA[0]" class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-(--ui-border)">
        <p class="text-sm text-(--ui-text-muted)">
          Mostrando {{ contas.length }} de {{ total }} registros
        </p>

        <div class="flex items-center gap-3">
          <UFormField label="Por página" class="w-24">
            <USelect v-model="itensPorPagina" :items="OPÇÕES_POR_PÁGINA.map(v => ({ label: String(v), value: v }))" class="w-full" />
          </UFormField>

          <div class="flex items-center gap-1">
            <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-chevron-left" :disabled="pagina === 1" @click="irParaPagina(pagina - 1)" />
            <template v-for="p in paginas" :key="p">
              <UButton
                v-if="typeof p === 'number'"
                :color="pagina === p ? 'primary' : 'neutral'"
                :variant="pagina === p ? 'soft' : 'ghost'"
                size="sm"
                @click="irParaPagina(p)"
              >
                {{ p }}
              </UButton>
              <span v-else class="px-2 text-sm text-(--ui-text-muted)">{{ p }}</span>
            </template>
            <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-chevron-right" :disabled="pagina === totalPaginas" @click="irParaPagina(pagina + 1)" />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
