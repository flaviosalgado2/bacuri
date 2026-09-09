<script setup lang="ts">
import { z } from 'zod'

definePageMeta({ layout: 'autenticacao', middleware: 'visitante' })
useHead({ title: 'Entrar - Bacuri' })

const schema = z.object({ email: z.string().email('E-mail inválido'), senha: z.string().min(1, 'Obrigatória') })
type Schema = z.output<typeof schema>

const { entrar } = useAutenticacao()
const estado = reactive<Partial<Schema>>({ email: '', senha: '' })
const mostrarSenha = ref(false)
const carregando = ref(false)

async function enviar() {
  carregando.value = true
  try { await entrar({ email: estado.email!, senha: estado.senha! }) }
  finally { carregando.value = false }
}
</script>

<template>
  <UCard class="shadow-lg">
    <template #header>
      <div class="text-center">
        <h2 class="text-2xl font-bold">Entrar</h2>
        <p class="text-(--ui-text-muted)">Acesse sua conta</p>
      </div>
    </template>

    <UForm :schema="schema" :state="estado" class="space-y-4" @submit="enviar">
      <UFormField label="E-mail" name="email">
        <UInput v-model="estado.email" type="email" placeholder="seu@email.com" icon="i-lucide-mail" class="w-full" />
      </UFormField>

      <UFormField label="Senha" name="senha">
        <UInput v-model="estado.senha" :type="mostrarSenha ? 'text' : 'password'" placeholder="Digite sua senha" icon="i-lucide-lock" class="w-full">
          <template #trailing>
            <UButton color="neutral" variant="link" size="sm" :icon="mostrarSenha ? 'i-lucide-eye-off' : 'i-lucide-eye'" @click="mostrarSenha = !mostrarSenha" />
          </template>
        </UInput>
      </UFormField>

      <UButton type="submit" color="primary" block size="lg" :loading="carregando">Entrar</UButton>
    </UForm>

    <template #footer>
      <p class="text-center text-sm text-(--ui-text-muted)">
        Ainda não tem conta?
        <ULink to="/cadastro" class="text-(--ui-primary) font-medium">Cadastre-se</ULink>
      </p>
    </template>
  </UCard>
</template>
