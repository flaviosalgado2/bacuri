<template>
  <div class="min-h-screen flex items-center justify-center bg-(--ui-bg-muted) p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold">Bacuri</h1>
        <p class="text-(--ui-text-muted) mt-2">Gerenciamento de contas pessoais</p>
      </div>
      <slot />
    </div>

    <UToaster />
  </div>
</template>
