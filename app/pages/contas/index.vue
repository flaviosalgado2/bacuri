<script setup lang="ts">
definePageMeta({ layout: 'padrao', middleware: 'logado', titulo: 'Todas as Contas', subtitulo: 'Gerencie suas contas' })
useHead({ title: 'Contas - Bacuri' })

const { listar } = useContas()
const rota = useRoute()
const router = useRouter()

const filtros = reactive({
  tipo: (rota.query.tipo ?? null) as 'pagar' | 'receber' | null,
  status: (rota.query.status ?? null) as 'pendente' | 'pago' | null,
  de: (rota.query.de ?? null) as string | null,
  ate: (rota.query.ate ?? null) as string | null
})

const { data: contas, pending, refresh } = await useLazyAsyncData('contas', () => listar(filtros), { watch: [filtros] })

function aplicar() {
  router.push({ query: { ...(filtros.tipo && { tipo: filtros.tipo }), ...(filtros.status && { status: filtros.status }), ...(filtros.de && { de: filtros.de }), ...(filtros.ate && { ate: filtros.ate }) } })
}

function limpar() {
  Object.assign(filtros, { tipo: null, status: null, de: null, ate: null })
  router.push({ query: {} })
}
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex flex-wrap items-end gap-3">
            <UFormField label="Tipo" class="w-48">
              <USelect v-model="filtros.tipo" :items="[{ label: 'Todos', value: null }, { label: 'Contas a pagar', value: 'pagar' }, { label: 'Contas a receber', value: 'receber' }]" class="w-full" @update:model-value="aplicar" />
            </UFormField>
            <UFormField label="Status" class="w-44">
              <USelect v-model="filtros.status" :items="[{ label: 'Todos', value: null }, { label: 'Pendente', value: 'pendente' }, { label: 'Pago', value: 'pago' }]" class="w-full" @update:model-value="aplicar" />
            </UFormField>
            <UFormField label="De" class="w-44"><UInput v-model="filtros.de" type="date" icon="i-lucide-calendar" @change="aplicar" /></UFormField>
            <UFormField label="Até" class="w-44"><UInput v-model="filtros.ate" type="date" icon="i-lucide-calendar" @change="aplicar" /></UFormField>
            <UButton color="neutral" variant="ghost" icon="i-lucide-filter-x" @click="limpar">Limpar</UButton>
          </div>
          <UButton to="/contas/nova" color="primary" icon="i-lucide-plus">Nova conta</UButton>
        </div>
      </template>

      <ListaContas :contas="contas || []" @atualizar="refresh" />
    </UCard>
  </div>
</template>
