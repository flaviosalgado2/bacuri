<script setup lang="ts">
const { usuario, sair } = useAutenticacao()
const rota = useRoute()
const modoCor = useColorMode()

const root = computed(() => usuario.value?.perfil === 'root')

const itens = ref([
  { label: 'Início', icon: 'i-lucide-layout-dashboard', to: '/' },
  { label: 'Contas a pagar', icon: 'i-lucide-receipt', to: '/contas/pagar' },
  { label: 'Contas a receber', icon: 'i-lucide-hand-coins', to: '/contas/receber' },
  { label: 'Todas as contas', icon: 'i-lucide-list-checks', to: '/contas' }
])

watchEffect(() => {
  const base = [
    { label: 'Início', icon: 'i-lucide-layout-dashboard', to: '/' },
    { label: 'Contas a pagar', icon: 'i-lucide-receipt', to: '/contas/pagar' },
    { label: 'Contas a receber', icon: 'i-lucide-hand-coins', to: '/contas/receber' },
    { label: 'Todas as contas', icon: 'i-lucide-list-checks', to: '/contas' },
    { label: 'Configurações', icon: 'i-lucide-settings', to: '/configuracoes' }
  ]

  if (root.value) {
    base.push({ label: 'Usuários', icon: 'i-lucide-users', to: '/usuarios' })
  }

  itens.value = base
})

const escuro = computed(() => modoCor.value === 'dark')
</script>

<template>
  <USidebar variant="inset" class="h-full">
    <template #header>
      <NuxtLink to="/" class="flex items-center gap-3 px-2">
        <LogoBacuri :tamanho="36" />
        <div>
          <h2 class="font-bold text-lg">Bacuri</h2>
          <p class="text-xs text-(--ui-text-muted)">Finanças</p>
        </div>
      </NuxtLink>
    </template>

    <UNavigationMenu :items="itens" orientation="vertical" />

    <template #footer>
      <USeparator class="my-2" />
      <div class="px-2 py-2">
        <div class="flex items-center gap-3 mb-3">
          <UAvatar :text="usuario?.nome?.[0]" class="bg-(--ui-primary) text-white" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">{{ usuario?.nome }}</p>
            <p class="text-xs text-(--ui-text-muted) truncate">{{ usuario?.email }}</p>
          </div>
          <UBadge v-if="root" color="warning" size="xs">Root</UBadge>
        </div>
        <div class="flex gap-2">
          <UButton color="neutral" variant="ghost" :icon="escuro ? 'i-lucide-sun' : 'i-lucide-moon'" class="flex-1" @click="modoCor.preference = escuro ? 'light' : 'dark'">
            {{ escuro ? 'Claro' : 'Escuro' }}
          </UButton>
          <UButton color="neutral" variant="ghost" icon="i-lucide-log-out" class="flex-1" @click="sair">
            Sair
          </UButton>
        </div>
      </div>
    </template>
  </USidebar>
</template>
