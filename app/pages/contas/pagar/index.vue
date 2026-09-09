<script setup lang="ts">
definePageMeta({ layout: 'padrao', middleware: 'logado', titulo: 'Contas a Pagar', subtitulo: 'Seus compromissos' })
useHead({ title: 'A Pagar - Bacuri' })

const { listar } = useContas()
const filtros = reactive({ tipo: 'pagar' as const, status: undefined as 'pendente' | 'pago' | undefined, de: undefined as string | undefined, ate: undefined as string | undefined })
const { data: contas, pending, refresh } = await useLazyAsyncData(() => listar(filtros), { watch: [filtros] })
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex flex-wrap items-end gap-3">
            <UFormField label="Status" class="w-44">
              <USelect v-model="filtros.status" :items="[{ label: 'Todos' }, { label: 'Pendente', value: 'pendente' }, { label: 'Pago', value: 'pago' }]" />
            </UFormField>
            <UFormField label="De" class="w-44"><UInput v-model="filtros.de" type="date" icon="i-lucide-calendar" /></UFormField>
            <UFormField label="Até" class="w-44"><UInput v-model="filtros.ate" type="date" icon="i-lucide-calendar" /></UFormField>
          </div>
          <UButton to="/contas/pagar/nova" color="error" icon="i-lucide-receipt">Nova conta</UButton>
        </div>
      </template>

      <ListaContas :contas="contas || []" @atualizar="refresh" />
    </UCard>
  </div>
</template>
