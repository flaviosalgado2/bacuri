<template>
  <div class="min-h-screen flex bg-(--ui-bg-muted)">
    <aside class="hidden lg:block w-72 fixed inset-y-0 left-0 z-30">
      <BarraLateral />
    </aside>

    <div class="flex-1 lg:ml-72 flex flex-col min-h-screen">
      <Cabecalho />
      <main class="flex-1 p-4 lg:p-6 overflow-auto">
        <slot />
      </main>
    </div>

  </div>
</template>
