import { z } from 'zod'
import { listarContas } from '../../services/contaService'

const dataSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD')

const query = z.object({
  tipo: z.enum(['pagar', 'receber']).optional(),
  status: z.enum(['pendente', 'pago']).optional(),
  de: dataSchema.optional(),
  ate: dataSchema.optional(),
  pagina: z.coerce.number().int().min(1).default(1),
  limite: z.coerce.number().int().min(1).max(100).default(20)
})

export default defineEventHandler(async (event) => {
  const sessao = await requireUserSession(event)
  const q = await getValidatedQuery(event, query.parse)

  const filtros: any = {
    tipo: q.tipo,
    status: q.status,
    de: q.de,
    ate: q.ate
  }

  if (sessao.user.perfil !== 'root') {
    filtros.usuarioId = sessao.user.id
  }

  return listarContas(filtros, { pagina: q.pagina, limite: q.limite })
})
