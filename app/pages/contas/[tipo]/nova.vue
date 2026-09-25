<script setup lang="ts">
import type { FormularioConta } from '~/composables/useContas'

definePageMeta({
  layout: 'padrao',
  middleware: 'logado',
  titulo: 'Nova Conta',
  subtitulo: 'Cadastre uma conta',
  validate: rota => ['pagar', 'receber'].includes(rota.params.tipo as string)
})

const rota = useRoute()
const router = useRouter()
const { criar } = useContas()

const tipo = rota.params.tipo as 'pagar' | 'receber'
useHead({ title: `Nova Conta a ${tipo === 'pagar' ? 'Pagar' : 'Receber'} - Bacuri` })

const formulario = reactive<FormularioConta>({
  nome: '',
  valor: 0,
  vencimento: new Date().toISOString().split('T')[0],
  descontoAte: null,
  observacoes: null,
  status: 'pendente'
})

const carregando = ref(false)

async function enviar() {
  carregando.value = true
  try {
    await criar({ ...formulario, tipo })
    router.push(`/contas/${tipo}`)
  } catch {
    // erro já tratado pelo composable (toast)
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div>
    <UCard class="max-w-3xl">
      <FormularioConta v-model:modelo="formulario" :tipo="tipo" :carregando="carregando" rotulo="Cadastrar" @submit="enviar" />
    </UCard>
  </div>
</template>
