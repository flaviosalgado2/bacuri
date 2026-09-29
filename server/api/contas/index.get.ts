import { z } from 'zod'
import { listarContas, CAMPOS_ORDENACAO, CAMPOS_DATA } from '../../services/contaService'

const dataSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD')

const query = z.object({
  tipo: z.enum(['pagar', 'receber']).optional(),
  status: z.enum(['pendente', 'pago']).optional(),
  de: dataSchema.optional(),
  ate: dataSchema.optional(),
  dataPor: z.enum(CAMPOS_DATA).optional(),
  busca: z.string().trim().optional(),
  ordenarPor: z.enum(CAMPOS_ORDENACAO).optional(),
  ordem: z.enum(['asc', 'desc']).optional(),
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
    ate: q.ate,
    dataPor: q.dataPor,
    busca: q.busca,
    ordenarPor: q.ordenarPor,
    ordem: q.ordem
  }

  if (sessao.user.perfil !== 'root') {
    filtros.usuarioId = sessao.user.id
  }

  return listarContas(filtros, { pagina: q.pagina, limite: q.limite })
})
