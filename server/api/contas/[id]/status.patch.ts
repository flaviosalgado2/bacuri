import { z } from 'zod'

const schema = z.object({ status: z.enum(['pendente', 'pago']) })

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  await verificarAcesso(event, id)

  const body = await readValidatedBody(event, schema.parse)
  return alternarStatus(id, body.status)
})
