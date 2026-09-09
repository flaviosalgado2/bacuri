<script setup lang="ts">
definePageMeta({ layout: 'padrao', middleware: 'root', titulo: 'Novo Usuário', subtitulo: 'Cadastre um novo usuário' })
useHead({ title: 'Novo Usuário - Bacuri' })

const router = useRouter()
const { criar } = useUsuarios()
const carregando = ref(false)

async function enviar(dados: Parameters<typeof criar>[0]) {
  carregando.value = true
  try {
    await criar(dados)
    router.push('/usuarios')
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div>
    <UsuarioFormulario modo="criar" :carregando="carregando" @submit="enviar" @cancelar="router.push('/usuarios')" />
  </div>
</template>
