<script setup lang="ts">
definePageMeta({ layout: 'padrao', middleware: 'logado', titulo: 'Contas a Receber', subtitulo: 'Suas entradas' })
useHead({ title: 'A Receber - Bacuri' })

const { listar } = useContas()
const filtros = reactive({ tipo: 'receber' as const, status: null as 'pendente' | 'pago' | null, de: null as string | null, ate: null as string | null })
const { data: contas, pending, refresh } = await useLazyAsyncData('contas-receber', () => listar(filtros), { watch: [filtros] })
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex flex-wrap items-end gap-3">
            <UFormField label="Status" class="w-44">
              <USelect v-model="filtros.status" :items="[{ label: 'Todos', value: null }, { label: 'Pendente', value: 'pendente' }, { label: 'Recebido', value: 'pago' }]" class="w-full" />
            </UFormField>
            <UFormField label="De" class="w-44"><UInput v-model="filtros.de" type="date" icon="i-lucide-calendar" /></UFormField>
            <UFormField label="Até" class="w-44"><UInput v-model="filtros.ate" type="date" icon="i-lucide-calendar" /></UFormField>
          </div>
          <UButton to="/contas/receber/nova" color="success" icon="i-lucide-hand-coins">Nova conta</UButton>
        </div>
      </template>

      <ListaContas :contas="contas || []" @atualizar="refresh" />
    </UCard>
  </div>
</template>
