import { z } from 'zod'
import { criarConta } from '../../services/contaService'

const dataSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD')

const schema = z.object({
  nome: z.string().min(1).max(255),
  tipo: z.enum(['pagar', 'receber']),
  valor: z.coerce.number().min(0.01),
  vencimento: dataSchema,
  descontoAte: dataSchema.optional().nullable(),
  observacoes: z.string().max(2000).optional().nullable(),
  status: z.enum(['pendente', 'pago']).default('pendente')
})

export default defineEventHandler(async (event) => {
  const sessao = await requireUserSession(event)
  const body = await readValidatedBody(event, schema.parse)

  return criarConta({
    usuarioId: sessao.user.id,
    nome: body.nome,
    tipo: body.tipo,
    valor: body.valor.toFixed(2),
    vencimento: body.vencimento,
    descontoAte: body.descontoAte || null,
    observacoes: body.observacoes || null,
    status: body.status
  })
})
