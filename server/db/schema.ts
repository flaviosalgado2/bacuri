import { pgTable, serial, varchar, text, timestamp, integer, decimal, boolean, pgEnum } from 'drizzle-orm/pg-core'

export const perfilEnum = pgEnum('perfil', ['usuario', 'root'])
export const tipoEnum = pgEnum('tipo', ['pagar', 'receber'])
export const statusEnum = pgEnum('status', ['pendente', 'pago'])

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
  vencimento: timestamp('vencimento', { mode: 'date' }).notNull(),
  descontoAte: timestamp('desconto_ate', { mode: 'date' }),
  observacoes: text('observacoes'),
  status: statusEnum('status').notNull().default('pendente'),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
  atualizadoEm: timestamp('atualizado_em').notNull().defaultNow()
})

export type Usuario = typeof usuarios.$inferSelect
export type NovaConta = typeof contas.$inferInsert
export type Conta = typeof contas.$inferSelect
