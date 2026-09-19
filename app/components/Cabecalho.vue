<script setup lang="ts">
const { usuario } = useAutenticacao()
const rota = useRoute()
const config = useRuntimeConfig()

const root = computed(() => usuario.value?.perfil === 'root')
const titulo = computed(() => rota.meta.titulo as string | undefined)
const subtitulo = computed(() => rota.meta.subtitulo as string | undefined)
const nomeAmbiente = computed(() => `Ambiente Docker: ${String(config.public.appEnv || 'local').toUpperCase()}`)
const mostrarDados = useState('mostrarDadosDashboard', () => false)
const mostrarOlho = computed(() => ['Dashboard', 'Contas a Pagar', 'Contas a Receber'].includes(titulo.value ?? ''))
</script>

<template>
  <header class="h-16 border-b border-(--ui-border) bg-(--ui-bg) grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 lg:px-6">
    <div class="flex items-center gap-4 min-w-0">
      <USlideover side="left" class="lg:hidden">
        <UButton icon="i-lucide-menu" color="neutral" variant="ghost" />
        <template #content>
          <BarraLateral />
        </template>
      </USlideover>

      <div class="min-w-0">
        <h1 class="text-xl font-semibold truncate">{{ titulo }}</h1>
        <p v-if="subtitulo" class="text-sm text-(--ui-text-muted) truncate">{{ subtitulo }}</p>
      </div>
    </div>

    <div class="flex justify-center">
      <UBadge color="error" variant="solid" class="px-3 py-1">{{ nomeAmbiente }}</UBadge>
    </div>

    <div class="flex items-center justify-end gap-3">
      <UButton
        v-if="mostrarOlho"
        color="neutral"
        variant="ghost"
        size="sm"
        :icon="mostrarDados ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :title="mostrarDados ? 'Ocultar dados sensíveis' : 'Mostrar dados sensíveis'"
        @click="mostrarDados = !mostrarDados"
      />
      <UBadge v-if="root" color="warning" variant="subtle">Admin</UBadge>
      <span class="hidden sm:flex items-center gap-2 text-sm text-(--ui-text-muted)">
        <UIcon name="i-lucide-user" class="w-4 h-4" />
        {{ usuario?.nome }}
      </span>
    </div>
  </header>
</template>