import { and, eq, gte, lte, desc, count, sql } from 'drizzle-orm'
import { unionAll } from 'drizzle-orm/pg-core'
import {
  contasPagar,
  contasReceber,
  type ContaPagar,
  type ContaReceber,
  type NovaContaPagar,
  type NovaContaReceber
} from '../db/schema'

export type TipoConta = 'pagar' | 'receber'

export type Conta = (ContaPagar | ContaReceber) & { tipo: TipoConta }
export type NovaConta = (Omit<NovaContaPagar, 'tipo'> | Omit<NovaContaReceber, 'tipo'>) & { tipo: TipoConta }

export type FiltrosContaService = {
  usuarioId?: number
  tipo?: TipoConta
  status?: 'pendente' | 'pago'
  de?: string
  ate?: string
}

export type Paginacao = {
  pagina: number
  limite: number
}

function tabela(tipo: TipoConta) {
  return tipo === 'pagar' ? contasPagar : contasReceber
}

function camposSelecao(tipo: TipoConta) {
  const t = tabela(tipo)
  return {
    id: t.id,
    usuarioId: t.usuarioId,
    nome: t.nome,
    valor: t.valor,
    vencimento: t.vencimento,
    descontoAte: t.descontoAte,
    observacoes: t.observacoes,
    status: t.status,
    criadoEm: t.criadoEm,
    atualizadoEm: t.atualizadoEm,
    tipo: sql<TipoConta>`${sql.raw(tipo === 'pagar' ? "'pagar'" : "'receber'")}`.as('tipo')
  }
}

function montarFiltrosTabela(tipo: TipoConta, filtros: FiltrosContaService) {
  const t = tabela(tipo)
  const condicoes: any[] = []

  if (filtros.usuarioId) condicoes.push(eq(t.usuarioId, filtros.usuarioId))
  if (filtros.status) condicoes.push(eq(t.status, filtros.status))
  if (filtros.de) condicoes.push(gte(t.vencimento, filtros.de))
  if (filtros.ate) condicoes.push(lte(t.vencimento, filtros.ate))

  return condicoes.length ? and(...condicoes) : undefined
}

function comTipo<T extends ContaPagar | ContaReceber>(conta: T | undefined, tipo: TipoConta): Conta | undefined {
  if (!conta) return undefined
  return { ...conta, tipo }
}

export async function listarContas(
  filtros: FiltrosContaService = {},
  paginacao?: Paginacao
): Promise<{ contas: Conta[]; total: number; temMais: boolean }> {
  const banco = usarBanco()

  if (filtros.tipo) {
    const tipo = filtros.tipo
    const t = tabela(tipo)
    const where = montarFiltrosTabela(tipo, filtros)

    const [{ value: total }] = await banco.select({ value: count() }).from(t).where(where)

    let query = banco.select().from(t).where(where).orderBy(desc(t.vencimento))

    if (paginacao) {
      const offset = (paginacao.pagina - 1) * paginacao.limite
      query = query.limit(paginacao.limite + 1).offset(offset)
    }

    const resultado = await query
    const temMais = paginacao ? resultado.length > paginacao.limite : false

    return {
      contas: (paginacao ? resultado.slice(0, paginacao.limite) : resultado).map((c) => ({ ...c, tipo })),
      total,
      temMais
    }
  }

  const wherePagar = montarFiltrosTabela('pagar', filtros)
  const whereReceber = montarFiltrosTabela('receber', filtros)

  const [{ value: totalPagar }] = await banco.select({ value: count() }).from(contasPagar).where(wherePagar)
  const [{ value: totalReceber }] = await banco.select({ value: count() }).from(contasReceber).where(whereReceber)
  const total = totalPagar + totalReceber

  let query = unionAll(
    banco.select(camposSelecao('pagar')).from(contasPagar).where(wherePagar),
    banco.select(camposSelecao('receber')).from(contasReceber).where(whereReceber)
  ).orderBy(desc(sql`vencimento`))

  if (paginacao) {
    const offset = (paginacao.pagina - 1) * paginacao.limite
    query = query.limit(paginacao.limite + 1).offset(offset)
  }

  const resultado = await query
  const temMais = paginacao ? resultado.length > paginacao.limite : false

  return {
    contas: paginacao ? resultado.slice(0, paginacao.limite) : resultado,
    total,
    temMais
  }
}

export async function buscarConta(id: number): Promise<Conta | undefined> {
  const banco = usarBanco()

  const [[pagar], [receber]] = await Promise.all([
    banco.select().from(contasPagar).where(eq(contasPagar.id, id)),
    banco.select().from(contasReceber).where(eq(contasReceber.id, id))
  ])

  return comTipo(pagar, 'pagar') ?? comTipo(receber, 'receber')
}

export async function criarConta(
  dados: Omit<NovaContaPagar, 'id' | 'criadoEm' | 'atualizadoEm'> & { tipo: TipoConta }
): Promise<Conta> {
  const banco = usarBanco()
  const agora = new Date()
  const { tipo, ...resto } = dados
  const t = tabela(tipo)

  const [conta] = await banco.insert(t).values({ ...resto, criadoEm: agora, atualizadoEm: agora } as any).returning()
  return { ...conta, tipo }
}

export async function atualizarConta(
  id: number,
  dados: Partial<Omit<Conta, 'id' | 'usuarioId' | 'criadoEm' | 'tipo'>>
): Promise<Conta> {
  const banco = usarBanco()
  const conta = await buscarConta(id)

  if (!conta) throw createError({ statusCode: 404, statusMessage: 'Conta não encontrada' })

  const t = tabela(conta.tipo)
  const { tipo: _, ...resto } = dados as any

  const [atualizada] = await banco
    .update(t)
    .set({ ...resto, atualizadoEm: new Date() } as any)
    .where(eq(t.id, id))
    .returning()

  return { ...atualizada, tipo: conta.tipo }
}

export async function excluirConta(id: number): Promise<void> {
  const banco = usarBanco()
  const conta = await buscarConta(id)

  if (!conta) throw createError({ statusCode: 404, statusMessage: 'Conta não encontrada' })

  const t = tabela(conta.tipo)
  await banco.delete(t).where(eq(t.id, id))
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
