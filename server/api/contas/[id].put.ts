import { z } from 'zod'
import { atualizarConta, verificarAcesso } from '../../services/contaService'

const dataSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD')

const schema = z.object({
  nome: z.string().min(1).max(255).optional(),
  tipo: z.enum(['pagar', 'receber']).optional(),
  valor: z.coerce.number().min(0.01).optional(),
  vencimento: dataSchema.optional(),
  descontoAte: dataSchema.optional().nullable(),
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
