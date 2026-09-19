<script setup lang="ts">
import type { Conta } from '~/composables/useContas'

const props = defineProps<{ contas: Conta[] }>()
const emit = defineEmits<{ (e: 'atualizar'): void }>()

const { mudarStatus, excluir } = useContas()

const rota = useRoute()
const destaqueId = computed(() => Number(rota.query.destaque))

const formatarValor = (v: string) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v))
const formatarData = (d: string) => new Date(d).toLocaleDateString('pt-BR')
const atrasada = (c: Conta) => new Date(c.vencimento) < new Date().setHours(0, 0, 0, 0)

const classeLinha = (c: Conta) => {
  const classes = ['border-b', 'border-(--ui-border)']
  if (destaqueId.value === c.id) {
    classes.push('bg-(--ui-primary)/10', 'ring-1', 'ring-(--ui-primary)', 'ring-inset')
  } else {
    classes.push('hover:bg-(--ui-bg-elevated)/50')
  }
  return classes
}

const modalAberto = ref(false)
const modalTitulo = ref('')
const modalDescricao = ref('')
const modalCor = ref('primary')
const modalAcao = ref<() => void>(() => {})

function abrirConfirmacao(titulo: string, descricao: string, cor: string, acao: () => void) {
  modalTitulo.value = titulo
  modalDescricao.value = descricao
  modalCor.value = cor
  modalAcao.value = acao
  modalAberto.value = true
}

function confirmar() {
  modalAcao.value()
  modalAberto.value = false
}

async function toggle(c: Conta) {
  const novoStatus = c.status === 'pago' ? 'pendente' : 'pago'
  const titulo = novoStatus === 'pago' ? 'Marcar como pago' : 'Marcar como pendente'
  const descricao = `Deseja alterar o status da conta "${c.nome}" para ${novoStatus === 'pago' ? 'pago' : 'pendente'}?`

  abrirConfirmacao(titulo, descricao, 'success', async () => {
    try {
      await mudarStatus(c.id, novoStatus)
      emit('atualizar')
    } catch {
      // erro já tratado pelo composable (toast)
    }
  })
}

async function remover(c: Conta) {
  abrirConfirmacao(
    'Excluir conta',
    `Deseja realmente excluir a conta "${c.nome}"? Esta ação não pode ser desfeita.`,
    'error',
    async () => {
      try {
        await excluir(c.id)
        emit('atualizar')
      } catch {
        // erro já tratado pelo composable (toast)
      }
    }
  )
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-(--ui-border)">
          <th class="text-left py-3 px-4 font-medium text-(--ui-text-muted)">Nome</th>
          <th class="text-left py-3 px-4 font-medium text-(--ui-text-muted)">Vencimento</th>
          <th class="text-left py-3 px-4 font-medium text-(--ui-text-muted)">Desconto</th>
          <th class="text-right py-3 px-4 font-medium text-(--ui-text-muted)">Valor</th>
          <th class="text-center py-3 px-4 font-medium text-(--ui-text-muted)">Status</th>
          <th class="text-right py-3 px-4 font-medium text-(--ui-text-muted)">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in contas" :key="c.id" :class="classeLinha(c)">
          <td class="py-3 px-4">
            <p class="font-medium">{{ c.nome }}</p>
            <p v-if="c.observacoes" class="text-xs text-(--ui-text-muted) truncate max-w-[200px]">{{ c.observacoes }}</p>
          </td>
          <td class="py-3 px-4" :class="atrasada(c) ? 'text-red-500 font-medium' : ''">{{ formatarData(c.vencimento) }}</td>
          <td class="py-3 px-4">{{ c.descontoAte ? formatarData(c.descontoAte) : '-' }}</td>
          <td class="py-3 px-4 text-right font-medium">{{ formatarValor(c.valor) }}</td>
          <td class="py-3 px-4 text-center">
            <UBadge :color="c.status === 'pago' ? 'success' : 'warning'" size="xs">{{ c.status === 'pago' ? 'Pago' : 'Pendente' }}</UBadge>
          </td>
          <td class="py-3 px-4 text-right">
            <div class="flex justify-end gap-1">
              <UButton :color="c.status === 'pago' ? 'warning' : 'success'" variant="ghost" size="xs" :icon="c.status === 'pago' ? 'i-lucide-circle-x' : 'i-lucide-circle-check'" :title="c.status === 'pago' ? 'Marcar como pendente' : 'Marcar como pago'" @click="toggle(c)" />
              <UButton :to="`/contas/${c.id}/editar`" color="neutral" variant="ghost" size="xs" icon="i-lucide-pencil" title="Editar" />
              <UButton color="error" variant="ghost" size="xs" icon="i-lucide-trash-2" title="Excluir" @click="remover(c)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="!contas.length" class="text-center py-12 text-(--ui-text-muted)">
      <UIcon name="i-lucide-inbox" class="w-12 h-12 mx-auto mb-3" />
      <p>Nenhuma conta encontrada</p>
    </div>

    <UModal v-model:open="modalAberto" :title="modalTitulo" :description="modalDescricao">
      <template #footer>
        <div class="flex justify-end gap-2 w-full">
          <UButton color="neutral" variant="ghost" @click="modalAberto = false">Cancelar</UButton>
          <UButton :color="modalCor" @click="confirmar">Confirmar</UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>
