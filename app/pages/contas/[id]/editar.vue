<script setup lang="ts">
import type { FormularioConta } from '~/composables/useContas'

definePageMeta({ layout: 'padrao', middleware: 'logado', titulo: 'Editar Conta', subtitulo: 'Altere os dados' })
useHead({ title: 'Editar Conta - Bacuri' })

const rota = useRoute()
const router = useRouter()
const { buscar, atualizar } = useContas()
const id = Number(rota.params.id)

const { data: conta, pending } = await useLazyAsyncData(`conta-${id}`, () => buscar(id))

const tipoConta = computed(() => conta.value?.tipo ?? 'pagar')

const formulario = reactive<FormularioConta>({
  nome: '', valor: 0, vencimento: '',
  descontoAte: null, observacoes: null, status: 'pendente'
})

watchEffect(() => {
  if (!conta.value) return
  Object.assign(formulario, {
    nome: conta.value.nome,
    valor: Number(conta.value.valor),
    vencimento: conta.value.vencimento.split('T')[0],
    descontoAte: conta.value.descontoAte ? conta.value.descontoAte.split('T')[0] : null,
    observacoes: conta.value.observacoes,
    status: conta.value.status
  })
})

const carregando = ref(false)

async function enviar() {
  carregando.value = true
  try {
    await atualizar(id, formulario)
    router.push(`/contas/${tipoConta.value}`)
  } catch {
    // erro já tratado pelo composable (toast)
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div>
    <UCard v-if="pending" class="max-w-3xl">
      <div class="flex justify-center py-12">
        <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-(--ui-primary)" />
      </div>
    </UCard>
    <UCard v-else class="max-w-3xl">
      <FormularioConta v-model:modelo="formulario" :tipo="tipoConta" :carregando="carregando" rotulo="Salvar" modo-edicao @submit="enviar" />
    </UCard>
  </div>
</template>
