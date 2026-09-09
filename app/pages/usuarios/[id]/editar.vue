<script setup lang="ts">
import { z } from 'zod'

definePageMeta({ layout: 'padrao', middleware: 'root', titulo: 'Editar Usuário', subtitulo: 'Altere os dados do usuário' })
useHead({ title: 'Editar Usuário - Bacuri' })

const schema = z.object({
  nome: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(8, 'Mínimo 8 caracteres').optional().or(z.literal('')),
  perfil: z.enum(['usuario', 'root']),
  ativo: z.boolean()
})

type Schema = z.output<typeof schema>

const rota = useRoute()
const router = useRouter()
const { atualizar } = useUsuarios()
const id = Number(rota.params.id)

const { data: usuario, pending } = await useFetch(`/api/usuarios/${id}`)

const mostrarSenha = ref(false)
const carregando = ref(false)

const estado = reactive<Partial<Schema>>({
  nome: '',
  email: '',
  senha: '',
  perfil: 'usuario',
  ativo: true
})

watchEffect(() => {
  if (!usuario.value) return
  estado.nome = usuario.value.nome
  estado.email = usuario.value.email
  estado.perfil = usuario.value.perfil
  estado.ativo = usuario.value.ativo
  estado.senha = ''
})

async function enviar() {
  carregando.value = true
  try {
    const dados: Partial<Schema> = {
      nome: estado.nome,
      email: estado.email,
      perfil: estado.perfil,
      ativo: estado.ativo
    }
    if (estado.senha) dados.senha = estado.senha

    await atualizar(id, dados)
    router.push('/usuarios')
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

    <UCard v-else class="max-w-2xl">
      <template #header>
        <h3 class="font-semibold">Dados do usuário</h3>
      </template>

      <UForm :schema="schema" :state="estado" class="space-y-4" @submit="enviar">
        <UFormField label="Nome" name="nome">
          <UInput v-model="estado.nome" placeholder="Nome completo" icon="i-lucide-user" class="w-full" />
        </UFormField>

        <UFormField label="E-mail" name="email">
          <UInput v-model="estado.email" type="email" placeholder="usuario@email.com" icon="i-lucide-mail" class="w-full" />
        </UFormField>

        <UFormField label="Nova senha" name="senha" hint="Deixe em branco para manter a senha atual">
          <UInput v-model="estado.senha" :type="mostrarSenha ? 'text' : 'password'" placeholder="Mínimo 8 caracteres" icon="i-lucide-lock" class="w-full">
            <template #trailing>
              <UButton color="neutral" variant="link" size="sm" :icon="mostrarSenha ? 'i-lucide-eye-off' : 'i-lucide-eye'" @click="mostrarSenha = !mostrarSenha" />
            </template>
          </UInput>
        </UFormField>

        <UFormField label="Perfil" name="perfil">
          <USelect v-model="estado.perfil" :items="[
            { label: 'Usuário', value: 'usuario' },
            { label: 'Root', value: 'root' }
          ]" class="w-full" />
        </UFormField>

        <UFormField label="Status" name="ativo">
          <USwitch v-model="estado.ativo" label="Usuário ativo" />
        </UFormField>

        <div class="flex justify-end gap-3 pt-4">
          <UButton to="/usuarios" color="neutral" variant="ghost">Cancelar</UButton>
          <UButton type="submit" color="primary" :loading="carregando">Salvar alterações</UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>
