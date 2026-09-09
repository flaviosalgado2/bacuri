<script setup lang="ts">
definePageMeta({ layout: 'padrao', middleware: 'logado', titulo: 'Todas as Contas', subtitulo: 'Gerencie suas contas' })
useHead({ title: 'Contas - Bacuri' })

const { listar } = useContas()
const rota = useRoute()
const router = useRouter()

const filtros = reactive({
  tipo: rota.query.tipo as 'pagar' | 'receber' | undefined,
  status: rota.query.status as 'pendente' | 'pago' | undefined,
  de: rota.query.de as string | undefined,
  ate: rota.query.ate as string | undefined
})

const { data: contas, pending, refresh } = await useLazyAsyncData(() => listar(filtros), { watch: [filtros] })

function aplicar() {
  router.push({ query: { ...(filtros.tipo && { tipo: filtros.tipo }), ...(filtros.status && { status: filtros.status }), ...(filtros.de && { de: filtros.de }), ...(filtros.ate && { ate: filtros.ate }) } })
}

function limpar() {
  Object.assign(filtros, { tipo: undefined, status: undefined, de: undefined, ate: undefined })
  router.push({ query: {} })
}
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex flex-wrap items-end gap-3">
            <UFormField label="Tipo" class="w-40">
              <USelect v-model="filtros.tipo" :items="[{ label: 'Todos' }, { label: 'Pagar', value: 'pagar' }, { label: 'Receber', value: 'receber' }]" @update:model-value="aplicar" />
            </UFormField>
            <UFormField label="Status" class="w-40">
              <USelect v-model="filtros.status" :items="[{ label: 'Todos' }, { label: 'Pendente', value: 'pendente' }, { label: 'Pago', value: 'pago' }]" @update:model-value="aplicar" />
            </UFormField>
            <UFormField label="De" class="w-40"><UInput v-model="filtros.de" type="date" @change="aplicar" /></UFormField>
            <UFormField label="Até" class="w-40"><UInput v-model="filtros.ate" type="date" @change="aplicar" /></UFormField>
            <UButton color="neutral" variant="ghost" icon="i-lucide-x" @click="limpar">Limpar</UButton>
          </div>
          <UButton to="/contas/nova" color="primary" icon="i-lucide-plus">Nova</UButton>
        </div>
      </template>

      <ListaContas :contas="contas || []" @atualizar="refresh" />
    </UCard>
  </div>
</template>
