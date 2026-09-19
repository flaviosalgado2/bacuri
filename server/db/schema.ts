import { pgTable, serial, varchar, text, timestamp, date, integer, decimal, boolean, pgEnum } from 'drizzle-orm/pg-core'

export const perfilEnum = pgEnum('perfil', ['usuario', 'root'])
export const tipoEnum = pgEnum('tipo', ['pagar', 'receber'])
export const statusEnum = pgEnum('status', ['pendente', 'pago'])
export const temaEnum = pgEnum('tema', ['system', 'light', 'dark'])

export const usuarios = pgTable('usuarios', {
  id: serial('id').primaryKey(),
  nome: varchar('nome', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  senhaHash: varchar('senha_hash', { length: 255 }).notNull(),
  perfil: perfilEnum('perfil').notNull().default('usuario'),
  ativo: boolean('ativo').notNull().default(true),
  criadoEm: timestamp('criado_em').notNull().defaultNow()
})

export const contas = pgTable('contas', {
  id: serial('id').primaryKey(),
  usuarioId: integer('usuario_id').notNull().references(() => usuarios.id, { onDelete: 'cascade' }),
  nome: varchar('nome', { length: 255 }).notNull(),
  tipo: tipoEnum('tipo').notNull(),
  valor: decimal('valor', { precision: 15, scale: 2 }).notNull(),
  vencimento: date('vencimento').notNull(),
  descontoAte: date('desconto_ate'),
  observacoes: text('observacoes'),
  status: statusEnum('status').notNull().default('pendente'),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
  atualizadoEm: timestamp('atualizado_em').notNull().defaultNow()
})

export const configuracoes = pgTable('configuracoes', {
  id: serial('id').primaryKey(),
  usuarioId: integer('usuario_id').notNull().references(() => usuarios.id, { onDelete: 'cascade' }).unique(),
  tema: temaEnum('tema').notNull().default('system'),
  outlookAtivado: boolean('outlook_ativado').notNull().default(false),
  outlookClientId: varchar('outlook_client_id', { length: 512 }),
  outlookClientSecret: varchar('outlook_client_secret', { length: 512 }),
  outlookTenantId: varchar('outlook_tenant_id', { length: 255 }),
  outlookRedirectUri: varchar('outlook_redirect_uri', { length: 512 }),
  outlookCalendarioId: varchar('outlook_calendario_id', { length: 512 }),
  outlookContaEmail: varchar('outlook_conta_email', { length: 255 }),
  outlookLembreteDias: integer('outlook_lembrete_dias').notNull().default(1),
  outlookToken: text('outlook_token'),
  outlookRefreshToken: text('outlook_refresh_token'),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
  atualizadoEm: timestamp('atualizado_em').notNull().defaultNow()
})

export type Usuario = typeof usuarios.$inferSelect
export type NovaConta = typeof contas.$inferInsert
export type Conta = typeof contas.$inferSelect
export type Configuracao = typeof configuracoes.$inferSelect
