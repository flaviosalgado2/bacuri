<script setup lang="ts">
import type { DadosUsuario } from '~/services/usuarioService'

const rota = useRoute()
const router = useRouter()
const { criar, atualizar } = useUsuarios()

const id = computed(() => Number(rota.query.id) || undefined)
const modo = computed(() => {
  const m = rota.query.modo as string | undefined
  if ((m === 'editar' || m === 'visualizar') && id.value) return m
  return id.value ? 'visualizar' : 'criar'
})

const tituloPagina = computed(() => ({
  criar: { titulo: 'Novo Usuário', subtitulo: 'Cadastre um novo usuário' },
  editar: { titulo: 'Editar Usuário', subtitulo: 'Altere os dados do usuário' },
  visualizar: { titulo: 'Visualizar Usuário', subtitulo: 'Detalhes do usuário' }
}[modo.value]))

definePageMeta({ layout: 'padrao', middleware: 'root' })

useHead(() => ({
  title: `${tituloPagina.value.titulo} - Bacuri`
}))

const { data: usuario, pending } = await useFetch(() => id.value ? `/api/usuarios/${id.value}` : null, {
  immediate: !!id.value,
  default: () => null
})

const carregando = ref(false)

async function enviar(dados: DadosUsuario & { senha?: string }) {
  carregando.value = true
  try {
    if (modo.value === 'criar') await criar(dados as DadosUsuario & { senha: string })
    else if (id.value) await atualizar(id.value, dados)
    router.push('/usuarios')
  } catch {
    // erro já tratado pelo composable (toast)
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div>
    <UCard v-if="pending" class="max-w-2xl">
      <div class="flex justify-center py-12">
        <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-(--ui-primary)" />
      </div>
    </UCard>

    <UsuarioFormulario
      v-else
      :modo="modo"
      :usuario="usuario"
      :carregando="carregando"
      @submit="enviar"
      @cancelar="router.push('/usuarios')"
    />
  </div>
</template>
