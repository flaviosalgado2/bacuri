<script setup lang="ts">
definePageMeta({ layout: 'padrao', middleware: 'root', titulo: 'Visualizar Usuário', subtitulo: 'Detalhes do usuário' })
useHead({ title: 'Visualizar Usuário - Bacuri' })

const rota = useRoute()
const router = useRouter()
const id = Number(rota.params.id)

const { data: usuario, pending } = await useFetch(`/api/usuarios/${id}`)
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
      modo="visualizar"
      :usuario="usuario"
      @cancelar="router.push('/usuarios')"
    />
  </div>
</template>
