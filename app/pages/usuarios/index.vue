<script setup lang="ts">
definePageMeta({ layout: 'padrao', middleware: 'root', titulo: 'Usuários', subtitulo: 'Gerencie os usuários do sistema' })
useHead({ title: 'Usuários - Bacuri' })

const { desativar } = useUsuarios()

const { data: usuarios, pending, error, refresh } = await useFetch('/api/usuarios', {
  default: () => []
})

async function remover(usuario: { id: number; nome: string }) {
  if (!confirm(`Deseja desativar o usuário "${usuario.nome}"? Ele não poderá mais acessar o sistema.`)) return
  try {
    await desativar(usuario.id)
    refresh()
  } catch {
    // erro já tratado pelo composable (toast)
  }
}
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">Lista de usuários</h3>
          <div class="flex gap-2">
            <UButton color="neutral" variant="ghost" icon="i-lucide-refresh-ccw" :loading="pending" @click="refresh">Atualizar</UButton>
            <UButton to="/usuarios/formulario" color="primary" icon="i-lucide-user-plus">Novo usuário</UButton>
          </div>
        </div>
      </template>

      <div v-if="pending" class="flex justify-center py-12">
        <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-(--ui-primary)" />
      </div>

      <UAlert
        v-else-if="error"
        color="error"
        icon="i-lucide-circle-alert"
        title="Erro ao carregar usuários"
        :description="error?.data?.statusMessage || 'Não foi possível carregar a lista de usuários.'"
      >
        <template #actions>
          <UButton color="error" variant="ghost" icon="i-lucide-refresh-ccw" @click="refresh">Tentar novamente</UButton>
        </template>
      </UAlert>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-(--ui-border)">
              <th class="text-left py-3 px-4 font-medium text-(--ui-text-muted)">Nome</th>
              <th class="text-left py-3 px-4 font-medium text-(--ui-text-muted)">E-mail</th>
              <th class="text-left py-3 px-4 font-medium text-(--ui-text-muted)">Perfil</th>
              <th class="text-center py-3 px-4 font-medium text-(--ui-text-muted)">Status</th>
              <th class="text-right py-3 px-4 font-medium text-(--ui-text-muted)">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in usuarios" :key="u.id" class="border-b border-(--ui-border) hover:bg-(--ui-bg-elevated)/50">
              <td class="py-3 px-4 font-medium">{{ u.nome }}</td>
              <td class="py-3 px-4">{{ u.email }}</td>
              <td class="py-3 px-4">
                <UBadge :color="u.perfil === 'root' ? 'warning' : 'neutral'" size="xs" variant="subtle">
                  {{ u.perfil === 'root' ? 'Root' : 'Usuário' }}
                </UBadge>
              </td>
              <td class="py-3 px-4 text-center">
                <UBadge :color="u.ativo ? 'success' : 'error'" size="xs" variant="subtle">
                  {{ u.ativo ? 'Ativo' : 'Inativo' }}
                </UBadge>
              </td>
              <td class="py-3 px-4 text-right">
                <div class="flex justify-end gap-1">
                  <UButton :to="`/usuarios/formulario?id=${u.id}`" color="neutral" variant="ghost" size="xs" icon="i-lucide-eye" title="Visualizar" />
                  <UButton :to="`/usuarios/formulario?id=${u.id}&modo=editar`" color="neutral" variant="ghost" size="xs" icon="i-lucide-pencil" title="Editar" />
                  <UButton color="error" variant="ghost" size="xs" icon="i-lucide-user-x" title="Desativar" :disabled="u.perfil === 'root'" @click="remover(u)" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="!usuarios.length" class="text-center py-12 text-(--ui-text-muted)">
          <UIcon name="i-lucide-users" class="w-12 h-12 mx-auto mb-3" />
          <p>Nenhum usuário encontrado</p>
        </div>
      </div>
    </UCard>
  </div>
</template>
