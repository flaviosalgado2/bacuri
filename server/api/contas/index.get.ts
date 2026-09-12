import { z } from 'zod'
import { listarContas } from '../../services/contaService'

const query = z.object({
  tipo: z.enum(['pagar', 'receber']).optional(),
  status: z.enum(['pendente', 'pago']).optional(),
  de: z.string().datetime().optional(),
  ate: z.string().datetime().optional()
})

export default defineEventHandler(async (event) => {
  const sessao = await requireUserSession(event)
  const q = await getValidatedQuery(event, query.parse)

  const filtros: any = {
    tipo: q.tipo,
    status: q.status,
    de: q.de ? new Date(q.de) : undefined,
    ate: q.ate ? new Date(q.ate) : undefined
  }

  if (sessao.user.perfil !== 'root') {
    filtros.usuarioId = sessao.user.id
  }

  return listarContas(filtros)
})
