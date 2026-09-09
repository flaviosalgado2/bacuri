import { z } from 'zod'

const schema = z.object({
  nome: z.string().min(1).max(255).optional(),
  tipo: z.enum(['pagar', 'receber']).optional(),
  valor: z.coerce.number().min(0.01).optional(),
  vencimento: z.coerce.date().optional(),
  descontoAte: z.coerce.date().optional().nullable(),
  observacoes: z.string().max(2000).optional().nullable(),
  status: z.enum(['pendente', 'pago']).optional()
})

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  await verificarAcesso(event, id)

  const body = await readValidatedBody(event, schema.parse)
  return atualizarConta(id, {
    ...body,
    valor: body.valor !== undefined ? body.valor.toFixed(2) : undefined
  })
})
