<script setup lang="ts">
import type { FormularioConta } from '~/composables/useContas'

definePageMeta({ layout: 'padrao', middleware: 'logado', titulo: 'Nova Conta', subtitulo: 'Cadastre uma conta' })
useHead({ title: 'Nova Conta - Bacuri' })

const rota = useRoute()
const router = useRouter()
const { criar } = useContas()

const tipo = rota.query.tipo as 'pagar' | 'receber' | undefined

const formulario = reactive<FormularioConta>({
  nome: '',
  tipo: tipo || 'pagar',
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
    await criar(formulario)
    router.push(`/contas/${formulario.tipo}`)
  } finally { carregando.value = false }
}
</script>

<template>
  <div>
    <UCard class="max-w-3xl">
      <FormularioConta v-model:modelo="formulario" :carregando="carregando" rotulo="Cadastrar" @submit="enviar" />
    </UCard>
  </div>
</template>
