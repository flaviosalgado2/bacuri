import { and, eq, gte, lte, asc } from 'drizzle-orm'
import { contas, type Conta, type NovaConta } from '../db/schema'

export type FiltrosContaService = {
  usuarioId?: number
  tipo?: 'pagar' | 'receber'
  status?: 'pendente' | 'pago'
  de?: Date
  ate?: Date
}

function montarFiltros(filtros: FiltrosContaService) {
  const condicoes: any[] = []

  if (filtros.usuarioId) condicoes.push(eq(contas.usuarioId, filtros.usuarioId))
  if (filtros.tipo) condicoes.push(eq(contas.tipo, filtros.tipo))
  if (filtros.status) condicoes.push(eq(contas.status, filtros.status))
  if (filtros.de) condicoes.push(gte(contas.vencimento, filtros.de))
  if (filtros.ate) condicoes.push(lte(contas.vencimento, filtros.ate))

  return condicoes.length ? and(...condicoes) : undefined
}

export async function listarContas(filtros: FiltrosContaService = {}): Promise<Conta[]> {
  const banco = usarBanco()
  return banco.select().from(contas).where(montarFiltros(filtros)).orderBy(asc(contas.vencimento))
}

export async function buscarConta(id: number): Promise<Conta | undefined> {
  const banco = usarBanco()
  const [conta] = await banco.select().from(contas).where(eq(contas.id, id))
  return conta
}

export async function criarConta(dados: Omit<NovaConta, 'id' | 'criadoEm' | 'atualizadoEm'>): Promise<Conta> {
  const banco = usarBanco()
  const agora = new Date()
  const [conta] = await banco.insert(contas).values({ ...dados, criadoEm: agora, atualizadoEm: agora }).returning()
  return conta
}

export async function atualizarConta(id: number, dados: Partial<Omit<NovaConta, 'id' | 'usuarioId' | 'criadoEm'>>): Promise<Conta> {
  const banco = usarBanco()
  const [conta] = await banco.update(contas).set({ ...dados, atualizadoEm: new Date() }).where(eq(contas.id, id)).returning()
  return conta
}

export async function excluirConta(id: number): Promise<void> {
  const banco = usarBanco()
  await banco.delete(contas).where(eq(contas.id, id))
}

export async function alternarStatus(id: number, status: 'pendente' | 'pago'): Promise<Conta> {
  return atualizarConta(id, { status })
}

export async function verificarAcesso(event: any, id: number) {
  const sessao = await requireUserSession(event)
  const conta = await buscarConta(id)

  if (!conta) throw createError({ statusCode: 404, statusMessage: 'Conta não encontrada' })
  if (conta.usuarioId !== sessao.user.id && sessao.user.perfil !== 'root') {
    throw createError({ statusCode: 403, statusMessage: 'Acesso negado' })
  }

  return conta
}
