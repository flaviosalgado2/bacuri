export type Tema = 'system' | 'light' | 'dark'

export interface Configuracao {
  id: number
  usuarioId: number
  tema: Tema
  outlookAtivado: boolean
  outlookClientId: string | null
  outlookTenantId: string | null
  outlookRedirectUri: string | null
  outlookCalendarioId: string | null
  outlookContaEmail: string | null
  outlookLembreteDias: number
  criadoEm: string
  atualizadoEm: string
}

export interface DadosConfiguracao {
  tema?: Tema
  outlookAtivado?: boolean
  outlookClientId?: string | null
  outlookClientSecret?: string | null
  outlookTenantId?: string | null
  outlookRedirectUri?: string | null
  outlookCalendarioId?: string | null
  outlookContaEmail?: string | null
  outlookLembreteDias?: number
}

export interface TesteConexaoResultado {
  ok: boolean
  conta: string
  nome: string
}

export const configuracaoService = {
  buscar: () => $fetch<Configuracao>('/api/configuracoes'),

  atualizar: (dados: DadosConfiguracao) =>
    $fetch<Configuracao>('/api/configuracoes', { method: 'PUT', body: dados }),

  obterUrlAuth: () =>
    $fetch<{ url: string }>('/api/configuracoes/outlook/auth-url'),

  desconectar: () =>
    $fetch<Configuracao>('/api/configuracoes/outlook/desconectar', { method: 'POST' }),

  listarCalendarios: () =>
    $fetch<{ id: string; nome: string; padrao: boolean }[]>('/api/configuracoes/outlook/calendarios'),

  testarConexao: () =>
    $fetch<TesteConexaoResultado>('/api/configuracoes/outlook/testar')
}
