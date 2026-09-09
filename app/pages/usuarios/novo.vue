<script setup lang="ts">
import { z } from 'zod'

definePageMeta({ layout: 'padrao', middleware: 'root', titulo: 'Novo Usuário', subtitulo: 'Cadastre um novo usuário' })
useHead({ title: 'Novo Usuário - Bacuri' })

const schema = z.object({
  nome: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(8, 'Mínimo 8 caracteres'),
  perfil: z.enum(['usuario', 'root']),
  ativo: z.boolean()
})

type Schema = z.output<typeof schema>

const router = useRouter()
const { criar } = useUsuarios()
const mostrarSenha = ref(false)
const carregando = ref(false)

const estado = reactive<Partial<Schema>>({
  nome: '',
  email: '',
  senha: '',
  perfil: 'usuario',
  ativo: true
})

async function enviar() {
  carregando.value = true
  try {
    await criar(estado as Schema)
    router.push('/usuarios')
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div>
    <UCard class="max-w-2xl">
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

        <UFormField label="Senha" name="senha">
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
          <UButton type="submit" color="primary" :loading="carregando">Cadastrar usuário</UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>
