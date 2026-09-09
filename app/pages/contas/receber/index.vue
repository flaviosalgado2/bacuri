<script setup lang="ts">
definePageMeta({ layout: 'padrao', middleware: 'logado', titulo: 'Contas a Receber', subtitulo: 'Suas entradas' })
useHead({ title: 'A Receber - Bacuri' })

const { listar } = useContas()
const filtros = reactive({ tipo: 'receber' as const, status: undefined as 'pendente' | 'pago' | undefined, de: undefined as string | undefined, ate: undefined as string | undefined })
const { data: contas, pending, refresh } = await useLazyAsyncData(() => listar(filtros), { watch: [filtros] })
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex flex-wrap items-end gap-3">
            <UFormField label="Status" class="w-40">
              <USelect v-model="filtros.status" :items="[{ label: 'Todos' }, { label: 'Pendente', value: 'pendente' }, { label: 'Recebido', value: 'pago' }]" />
            </UFormField>
            <UFormField label="De" class="w-40"><UInput v-model="filtros.de" type="date" /></UFormField>
            <UFormField label="Até" class="w-40"><UInput v-model="filtros.ate" type="date" /></UFormField>
          </div>
          <UButton to="/contas/receber/nova" color="success" icon="i-lucide-plus">Nova</UButton>
        </div>
      </template>

      <ListaContas :contas="contas || []" @atualizar="refresh" />
    </UCard>
  </div>
</template>
