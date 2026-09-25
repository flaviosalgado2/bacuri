import { eq } from 'drizzle-orm'
import { configuracoes, type Configuracao } from '../db/schema'

export type ConfiguracaoPublica = Omit<Configuracao, 'outlookToken' | 'outlookRefreshToken' | 'outlookClientSecret'>

export async function buscarConfiguracao(usuarioId: number): Promise<Configuracao> {
  const banco = usarBanco()
  const [existente] = await banco.select().from(configuracoes).where(eq(configuracoes.usuarioId, usuarioId))

  if (existente) return existente

  const [criada] = await banco.insert(configuracoes).values({
    usuarioId,
    outlookAtivado: false,
    outlookLembreteDias: 1
  }).returning()

  return criada
}

export async function atualizarConfiguracao(
  usuarioId: number,
  dados: Partial<{
    outlookAtivado: boolean
    outlookClientId: string | null
    outlookClientSecret: string | null
    outlookTenantId: string | null
    outlookRedirectUri: string | null
    outlookCalendarioId: string | null
    outlookContaEmail: string | null
    outlookLembreteDias: number
    outlookToken: string | null
    outlookRefreshToken: string | null
  }>
): Promise<Configuracao> {
  const banco = usarBanco()

  await buscarConfiguracao(usuarioId)

  const valores: Partial<typeof configuracoes.$inferInsert> = {
    outlookAtivado: dados.outlookAtivado,
    outlookClientId: dados.outlookClientId,
    outlookClientSecret: dados.outlookClientSecret,
    outlookTenantId: dados.outlookTenantId,
    outlookRedirectUri: dados.outlookRedirectUri,
    outlookCalendarioId: dados.outlookCalendarioId,
    outlookContaEmail: dados.outlookContaEmail,
    outlookLembreteDias: dados.outlookLembreteDias,
    outlookToken: dados.outlookToken,
    outlookRefreshToken: dados.outlookRefreshToken,
    atualizadoEm: new Date()
  }

  Object.keys(valores).forEach((chave) => {
    if (valores[chave as keyof typeof valores] === undefined) {
      delete valores[chave as keyof typeof valores]
    }
  })

  const [atualizada] = await banco.update(configuracoes).set(valores).where(eq(configuracoes.usuarioId, usuarioId)).returning()
  return atualizada
}

export function configuracaoPublica(configuracao: Configuracao): ConfiguracaoPublica {
  const { outlookToken, outlookRefreshToken, outlookClientSecret, ...segura } = configuracao
  return segura
}
