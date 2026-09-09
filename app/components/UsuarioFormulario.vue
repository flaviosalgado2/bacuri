<script setup lang="ts">
import { z } from 'zod'
import type { DadosUsuario, UsuarioGerenciado } from '~/services/usuarioService'

const props = defineProps<{
  modo: 'criar' | 'editar' | 'visualizar'
  usuario?: UsuarioGerenciado | null
  carregando?: boolean
}>()

const emit = defineEmits<{
  submit: [dados: DadosUsuario & { senha?: string }]
  cancelar: []
}>()

const apenasLeitura = computed(() => props.modo === 'visualizar')

const schema = z.object({
  nome: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(8, 'Mínimo 8 caracteres').optional().or(z.literal('')),
  perfil: z.enum(['usuario', 'root']),
  ativo: z.boolean()
})

type Schema = z.output<typeof schema>

const mostrarSenha = ref(false)

const estado = reactive<Partial<Schema>>({
  nome: '',
  email: '',
  senha: '',
  perfil: 'usuario',
  ativo: true
})

watchEffect(() => {
  const u = props.usuario
  estado.nome = u?.nome ?? ''
  estado.email = u?.email ?? ''
  estado.perfil = u?.perfil ?? 'usuario'
  estado.ativo = u?.ativo ?? true
  estado.senha = ''
})

const rotuloBotao = computed(() => ({
  criar: 'Cadastrar usuário',
  editar: 'Salvar alterações',
  visualizar: 'Voltar'
}[props.modo]))

const tituloCard = computed(() => ({
  criar: 'Cadastrar novo usuário',
  editar: 'Editar usuário',
  visualizar: 'Detalhes do usuário'
}[props.modo]))

function enviar() {
  if (apenasLeitura.value) {
    emit('cancelar')
    return
  }

  const dados: DadosUsuario & { senha?: string } = {
    nome: estado.nome!,
    email: estado.email!,
    perfil: estado.perfil!,
    ativo: estado.ativo!
  }
  if (estado.senha) dados.senha = estado.senha

  emit('submit', dados)
}
</script>

<template>
  <UCard class="max-w-2xl">
    <template #header>
      <h3 class="font-semibold">{{ tituloCard }}</h3>
    </template>

    <UForm :schema="schema" :state="estado" class="space-y-4" @submit="enviar">
      <UFormField label="Nome" name="nome">
        <UInput v-model="estado.nome" placeholder="Nome completo" icon="i-lucide-user" class="w-full" :disabled="apenasLeitura" />
      </UFormField>

      <UFormField label="E-mail" name="email">
        <UInput v-model="estado.email" type="email" placeholder="usuario@email.com" icon="i-lucide-mail" class="w-full" :disabled="apenasLeitura" />
      </UFormField>

      <UFormField v-if="!apenasLeitura" label="Senha" name="senha" :hint="modo === 'editar' ? 'Deixe em branco para manter a senha atual' : undefined">
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
        ]" class="w-full" :disabled="apenasLeitura" />
      </UFormField>

      <UFormField label="Status" name="ativo">
        <USwitch v-model="estado.ativo" label="Usuário ativo" :disabled="apenasLeitura" />
      </UFormField>

      <div class="flex justify-end gap-3 pt-4">
        <UButton v-if="!apenasLeitura" type="button" color="neutral" variant="ghost" @click="$emit('cancelar')">Cancelar</UButton>
        <UButton type="submit" color="primary" :loading="carregando" :icon="apenasLeitura ? 'i-lucide-arrow-left' : undefined">
          {{ rotuloBotao }}
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>
