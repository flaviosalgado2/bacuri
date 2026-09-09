<script setup lang="ts">
const { usuario } = useAutenticacao()
const rota = useRoute()

const root = computed(() => usuario.value?.perfil === 'root')
const titulo = computed(() => rota.meta.titulo as string | undefined)
const subtitulo = computed(() => rota.meta.subtitulo as string | undefined)
</script>

<template>
  <header class="h-16 border-b border-(--ui-border) bg-(--ui-bg) flex items-center justify-between px-4 lg:px-6">
    <div class="flex items-center gap-4">
      <USlideover side="left" class="lg:hidden">
        <UButton icon="i-lucide-menu" color="neutral" variant="ghost" />
        <template #content>
          <BarraLateral />
        </template>
      </USlideover>

      <div>
        <h1 class="text-xl font-semibold">{{ titulo }}</h1>
        <p v-if="subtitulo" class="text-sm text-(--ui-text-muted)">{{ subtitulo }}</p>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <UBadge v-if="root" color="warning" variant="subtle">Admin</UBadge>
      <span class="hidden sm:flex items-center gap-2 text-sm text-(--ui-text-muted)">
        <UIcon name="i-lucide-user" class="w-4 h-4" />
        {{ usuario?.nome }}
      </span>
    </div>
  </header>
</template>
