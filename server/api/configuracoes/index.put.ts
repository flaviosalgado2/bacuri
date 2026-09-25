import { z } from 'zod'
import { atualizarConfiguracao, configuracaoPublica } from '../../services/configuracaoService'

const schema = z.object({
  outlookAtivado: z.boolean().optional(),
  outlookClientId: z.string().max(512).optional().nullable(),
  outlookClientSecret: z.string().max(512).optional().nullable(),
  outlookTenantId: z.string().max(255).optional().nullable(),
  outlookRedirectUri: z.string().max(512).optional().nullable(),
  outlookCalendarioId: z.string().max(512).optional().nullable(),
  outlookContaEmail: z.string().email().max(255).optional().nullable(),
  outlookLembreteDias: z.number().int().min(0).max(30).optional()
})

export default defineEventHandler(async (event) => {
  const sessao = await requireUserSession(event)
  const body = await readValidatedBody(event, schema.parse)

  const atualizada = await atualizarConfiguracao(sessao.user.id, body)
  return configuracaoPublica(atualizada)
})
