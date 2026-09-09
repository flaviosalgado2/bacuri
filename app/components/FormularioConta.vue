<script setup lang="ts">
import { z } from 'zod'
import type { FormularioConta } from '~/composables/useContas'

const props = defineProps<{ modelo: FormularioConta; carregando?: boolean; rotulo?: string }>()
const emit = defineEmits<{ (e: 'update:modelo', v: FormularioConta): void; (e: 'submit'): void }>()

const schema = z.object({
  nome: z.string().min(1, 'Obrigatório').max(255),
  tipo: z.enum(['pagar', 'receber']),
  valor: z.number().min(0.01, 'Valor inválido'),
  vencimento: z.string().min(1, 'Obrigatório'),
  descontoAte: z.string().optional().nullable(),
  observacoes: z.string().max(2000).optional().nullable(),
  status: z.enum(['pendente', 'pago'])
})

const estado = computed({
  get: () => props.modelo,
  set: (v) => emit('update:modelo', v)
})

const status = [
  { label: 'Pendente', value: 'pendente' },
  { label: 'Pago', value: 'pago' }
]
</script>

<template>
  <UForm :schema="schema" :state="estado" class="space-y-5" @submit="emit('submit')">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UFormField label="Nome" name="nome" required class="md:col-span-2">
        <UInput v-model="estado.nome" placeholder="Ex: Aluguel" icon="i-lucide-file-text" class="w-full" />
      </UFormField>

      <UFormField label="Tipo" name="tipo" required>
        <USelect v-model="estado.tipo" :items="[
          { label: 'A Pagar', value: 'pagar' },
          { label: 'A Receber', value: 'receber' }
        ]" class="w-full" />
      </UFormField>

      <UFormField label="Valor" name="valor" required>
        <UInputNumber v-model="estado.valor" :min="0.01" :step="0.01" placeholder="0,00" class="w-full" :format-options="{ style: 'currency', currency: 'BRL' }" />
      </UFormField>

      <UFormField label="Vencimento" name="vencimento" required>
        <UInput v-model="estado.vencimento" type="date" icon="i-lucide-calendar" class="w-full" />
      </UFormField>

      <UFormField label="Desconto até" name="descontoAte">
        <UInput v-model="estado.descontoAte" type="date" icon="i-lucide-calendar-check" class="w-full" />
      </UFormField>

      <UFormField label="Status" name="status" required class="md:col-span-2">
        <URadioGroup v-model="estado.status" :items="status" class="flex gap-4" />
      </UFormField>

      <UFormField label="Observações" name="observacoes" class="md:col-span-2">
        <UTextarea v-model="estado.observacoes" placeholder="Informações adicionais" :rows="4" class="w-full" />
      </UFormField>
    </div>

    <div class="flex justify-end gap-3 pt-4">
      <UButton type="button" color="neutral" variant="ghost" to="/contas">Cancelar</UButton>
      <UButton type="submit" color="primary" :loading="carregando">{{ rotulo || 'Salvar' }}</UButton>
    </div>
  </UForm>
</template>
