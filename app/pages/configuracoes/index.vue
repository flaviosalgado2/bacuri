<script setup lang="ts">
definePageMeta({ layout: 'padrao', middleware: 'logado', titulo: 'Configurações', subtitulo: 'Personalize integrações e preferências' })
useHead({ title: 'Configurações - Bacuri' })

const { buscar, atualizar, obterUrlAuth, desconectar, listarCalendarios, testarConexao } = useConfiguracoes()

const { data: configuracao, pending, refresh } = await useLazyAsyncData('configuracoes', () => buscar(), {
  default: () => ({
    id: 0,
    usuarioId: 0,
    tema: 'system' as const,
    outlookAtivado: false,
    outlookClientId: null,
    outlookTenantId: null,
    outlookRedirectUri: null,
    outlookCalendarioId: null,
    outlookContaEmail: null,
    outlookLembreteDias: 1,
    criadoEm: '',
    atualizadoEm: ''
  })
})

const formulario = reactive({
  tema: 'system' as const,
  outlookAtivado: false,
  outlookClientId: '',
  outlookClientSecret: '',
  outlookTenantId: '',
  outlookRedirectUri: '',
  outlookCalendarioId: '',
  outlookContaEmail: '',
  outlookLembreteDias: 1
})

const calendarios = ref<{ id: string; nome: string; padrao: boolean }[]>([])
const carregandoCalendarios = ref(false)
const carregandoAuth = ref(false)
const carregandoDesconectar = ref(false)
const carregandoTeste = ref(false)
const salvando = ref(false)

watch(() => configuracao.value, (nova) => {
  if (!nova) return
  formulario.tema = nova.tema
  formulario.outlookAtivado = nova.outlookAtivado
  formulario.outlookClientId = nova.outlookClientId || ''
  formulario.outlookTenantId = nova.outlookTenantId || ''
  formulario.outlookRedirectUri = nova.outlookRedirectUri || ''
  formulario.outlookCalendarioId = nova.outlookCalendarioId || ''
  formulario.outlookContaEmail = nova.outlookContaEmail || ''
  formulario.outlookLembreteDias = nova.outlookLembreteDias
}, { immediate: true })

const conectado = computed(() => !!configuracao.value?.outlookContaEmail)
const credenciaisPreenchidas = computed(() =>
  !!formulario.outlookClientId && !!formulario.outlookClientSecret
)

async function carregarCalendarios() {
  carregandoCalendarios.value = true
  try {
    calendarios.value = await listarCalendarios() || []
  } catch {
    calendarios.value = []
  } finally {
    carregandoCalendarios.value = false
  }
}

watch(conectado, (ativo) => {
  if (ativo) carregarCalendarios()
  else calendarios.value = []
}, { immediate: true })

async function conectarOutlook() {
  carregandoAuth.value = true
  try {
    const { url } = await obterUrlAuth()
    window.location.href = url
  } finally {
    carregandoAuth.value = false
  }
}

async function desconectarOutlook() {
  if (!confirm('Deseja desconectar a conta do Outlook?')) return
  carregandoDesconectar.value = true
  try {
    await desconectar()
    await refresh()
  } finally {
    carregandoDesconectar.value = false
  }
}

async function testar() {
  carregandoTeste.value = true
  try {
    await testarConexao()
  } finally {
    carregandoTeste.value = false
  }
}

const colorMode = useColorMode()

async function salvar() {
  salvando.value = true
  try {
    await atualizar({
      tema: formulario.tema,
      outlookAtivado: formulario.outlookAtivado,
      outlookClientId: formulario.outlookClientId || null,
      outlookClientSecret: formulario.outlookClientSecret || null,
      outlookTenantId: formulario.outlookTenantId || null,
      outlookRedirectUri: formulario.outlookRedirectUri || null,
      outlookCalendarioId: formulario.outlookCalendarioId || null,
      outlookContaEmail: formulario.outlookContaEmail || null,
      outlookLembreteDias: Number(formulario.outlookLembreteDias)
    })

    if (formulario.tema === 'system') {
      colorMode.preference = 'system'
    } else {
      colorMode.preference = formulario.tema
    }

    await refresh()
  } finally {
    salvando.value = false
  }
}

const abaAtiva = ref('geral')

const abas = [
  { label: 'Geral', value: 'geral', icon: 'i-lucide-sliders-horizontal' },
  { label: 'Outlook Calendar', value: 'outlook', icon: 'i-lucide-calendar-days' }
]
</script>

<template>
  <div>
    <div v-if="pending" class="flex justify-center py-12">
      <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-(--ui-primary)" />
    </div>

    <template v-else>
      <UCard>
        <template #header>
          <h3 class="font-semibold">Configurações do sistema</h3>
        </template>

        <div class="w-full">
          <div class="flex border-b border-(--ui-border) mb-4">
            <button
              v-for="aba in abas"
              :key="aba.value"
              type="button"
              class="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px"
              :class="abaAtiva === aba.value ? 'border-(--ui-primary) text-(--ui-primary)' : 'border-transparent text-(--ui-text-muted) hover:text-(--ui-text)'"
              @click="abaAtiva = aba.value"
            >
              <UIcon :name="aba.icon" class="w-4 h-4" />
              {{ aba.label }}
            </button>
          </div>

          <div v-if="abaAtiva === 'geral'" :key="'geral'" class="py-4 space-y-6">
            <div>
              <UFormField label="Tema" name="tema">
                <URadioGroup
                  v-model="formulario.tema"
                  :items="[
                    { label: 'Sistema', value: 'system', description: 'Usa o modo do sistema operacional' },
                    { label: 'Claro', value: 'light', description: 'Tema claro fixo' },
                    { label: 'Escuro', value: 'dark', description: 'Tema escuro fixo' }
                  ]"
                />
              </UFormField>
            </div>

            <UButton color="primary" icon="i-lucide-save" :loading="salvando" @click="salvar">
              Salvar preferências
            </UButton>
          </div>

          <div v-else-if="abaAtiva === 'outlook'" :key="'outlook'" class="space-y-6 py-4">
            <p class="text-sm text-(--ui-text-muted)">
              Configure a integração com o calendário do Outlook para receber lembretes dos vencimentos das suas contas.
            </p>

            <div class="flex items-center justify-between p-4 rounded-lg bg-(--ui-bg-elevated)/50">
              <div>
                <p class="font-medium">Status da integração</p>
                <p class="text-sm text-(--ui-text-muted)">
                  {{ conectado ? `Conectado como ${configuracao?.outlookContaEmail}` : 'Nenhuma conta do Outlook conectada' }}
                </p>
              </div>
              <UBadge :color="conectado ? 'success' : 'neutral'" variant="subtle">
                {{ conectado ? 'Conectado' : 'Desconectado' }}
              </UBadge>
            </div>

            <UFormField label="Ativar integração">
              <USwitch v-model="formulario.outlookAtivado" />
            </UFormField>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="Client ID" required>
                <UInput v-model="formulario.outlookClientId" placeholder="Application (client) ID" />
              </UFormField>

              <UFormField label="Client Secret" required>
                <UInput v-model="formulario.outlookClientSecret" type="password" placeholder="Client secret value" />
              </UFormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="Tenant ID">
                <UInput v-model="formulario.outlookTenantId" placeholder="common ou ID do diretório" />
                <p class="text-xs text-(--ui-text-muted) mt-1">Deixe em branco para usar <code>common</code>.</p>
              </UFormField>

              <UFormField label="Redirect URI">
                <UInput v-model="formulario.outlookRedirectUri" placeholder="http://localhost:3000/api/configuracoes/outlook/callback" />
              </UFormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="Lembrete (dias antes)">
                <UInput v-model="formulario.outlookLembreteDias" type="number" min="0" max="30" />
              </UFormField>

              <UFormField label="Calendário">
                <div class="flex gap-2">
                  <USelect
                    v-model="formulario.outlookCalendarioId"
                    :items="[
                      { label: 'Calendário padrão', value: '' },
                      ...calendarios.map(c => ({ label: c.nome + (c.padrao ? ' (padrão)' : ''), value: c.id }))
                    ]"
                    class="flex-1"
                  />
                  <UButton
                    color="neutral"
                    variant="ghost"
                    icon="i-lucide-refresh-ccw"
                    :loading="carregandoCalendarios"
                    @click="carregarCalendarios"
                  />
                </div>
              </UFormField>
            </div>

            <UFormField label="E-mail da conta Outlook">
              <UInput v-model="formulario.outlookContaEmail" type="email" placeholder="seu-email@outlook.com" />
            </UFormField>

            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <UButton
                v-if="!conectado"
                color="primary"
                icon="i-lucide-plug"
                :loading="carregandoAuth"
                :disabled="!credenciaisPreenchidas"
                @click="conectarOutlook"
              >
                Conectar com Outlook
              </UButton>
              <UButton
                v-else
                color="error"
                variant="soft"
                icon="i-lucide-unplug"
                :loading="carregandoDesconectar"
                @click="desconectarOutlook"
              >
                Desconectar Outlook
              </UButton>

              <UButton
                color="secondary"
                variant="soft"
                icon="i-lucide-activity"
                :loading="carregandoTeste"
                :disabled="!conectado"
                @click="testar"
              >
                Testar conexão
              </UButton>

              <UButton color="primary" icon="i-lucide-save" :loading="salvando" class="sm:ml-auto" @click="salvar">
                Salvar configurações
              </UButton>
            </div>
          </div>
        </div>
      </UCard>
    </template>
  </div>
</template>
