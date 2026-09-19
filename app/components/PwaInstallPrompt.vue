<script setup lang="ts">
const { $pwa } = useNuxtApp()
</script>

<template>
  <div
    v-if="$pwa?.showInstallPrompt"
    class="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-lg border border-(--ui-border) bg-(--ui-bg-elevated) p-4 shadow-lg"
  >
    <div class="flex items-start gap-3">
      <div class="flex-1">
        <p class="font-medium text-(--ui-text-highlighted)">
          Instalar Bacuri
        </p>
        <p class="text-sm text-(--ui-text-muted)">
          Adicione o app à sua tela inicial para acesso rápido e offline.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <UButton
          color="neutral"
          variant="ghost"
          size="sm"
          @click="$pwa.cancelInstall"
        >
          Agora não
        </UButton>
        <UButton
          color="primary"
          size="sm"
          @click="$pwa.install"
        >
          Instalar
        </UButton>
      </div>
    </div>
  </div>
</template>
