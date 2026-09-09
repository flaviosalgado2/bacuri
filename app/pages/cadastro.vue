<script setup lang="ts">
import { z } from 'zod'

definePageMeta({ layout: 'autenticacao', middleware: 'visitante' })
useHead({ title: 'Cadastro - Bacuri' })

const schema = z.object({
  nome: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(8, 'Mínimo 8 caracteres'),
  confirmar: z.string().min(1, 'Confirme a senha')
}).refine(d => d.senha === d.confirmar, { message: 'Senhas não conferem', path: ['confirmar'] })

type Schema = z.output<typeof schema>

const { cadastrar } = useAutenticacao()
const estado = reactive<Partial<Schema>>({ nome: '', email: '', senha: '', confirmar: '' })
const mostrarSenha = ref(false)
const carregando = ref(false)

async function enviar() {
  carregando.value = true
  try { await cadastrar({ nome: estado.nome!, email: estado.email!, senha: estado.senha! }) }
  finally { carregando.value = false }
}
</script>

<template>
  <UCard class="shadow-lg">
    <template #header>
      <div class="text-center">
        <h2 class="text-2xl font-bold">Criar conta</h2>
        <p class="text-(--ui-text-muted)">Preencha seus dados</p>
      </div>
    </template>

    <UForm :schema="schema" :state="estado" class="space-y-4" @submit="enviar">
      <UFormField label="Nome" name="nome">
        <UInput v-model="estado.nome" placeholder="Seu nome" icon="i-lucide-user" class="w-full" />
      </UFormField>

      <UFormField label="E-mail" name="email">
        <UInput v-model="estado.email" type="email" placeholder="seu@email.com" icon="i-lucide-mail" class="w-full" />
      </UFormField>

      <UFormField label="Senha" name="senha">
        <UInput v-model="estado.senha" :type="mostrarSenha ? 'text' : 'password'" placeholder="Mínimo 8 caracteres" icon="i-lucide-lock" class="w-full">
          <template #trailing>
            <UButton color="neutral" variant="link" size="sm" :icon="mostrarSenha ? 'i-lucide-eye-off' : 'i-lucide-eye'" @click="mostrarSenha = !mostrarSenha" />
          </template>
        </UInput>
      </UFormField>

      <UFormField label="Confirmar senha" name="confirmar">
        <UInput v-model="estado.confirmar" :type="mostrarSenha ? 'text' : 'password'" placeholder="Repita a senha" icon="i-lucide-lock" class="w-full" />
      </UFormField>

      <UButton type="submit" color="primary" block size="lg" :loading="carregando">Cadastrar</UButton>
    </UForm>

    <template #footer>
      <p class="text-center text-sm text-(--ui-text-muted)">
        Já tem conta?
        <ULink to="/entrar" class="text-(--ui-primary) font-medium">Faça login</ULink>
      </p>
    </template>
  </UCard>
</template>
