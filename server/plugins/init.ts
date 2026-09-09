import { eq } from 'drizzle-orm'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { usuarios } from '../db/schema'
import { usarBanco } from '../utils/banco'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  const banco = usarBanco()

  // Aplica migrations automaticamente antes de qualquer query
  await migrate(banco, { migrationsFolder: './server/db/migrations' })
  console.log('Migrations aplicadas com sucesso')

  // Cria usuário root se configurado e ainda não existir
  if (!config.rootEmail || !config.rootPassword) return

  const [existente] = await banco.select().from(usuarios).where(eq(usuarios.email, config.rootEmail.toLowerCase().trim()))

  if (!existente) {
    await criarUsuario({
      nome: 'Administrador',
      email: config.rootEmail,
      senha: config.rootPassword,
      perfil: 'root'
    })
    console.log(`Usuário root criado: ${config.rootEmail}`)
  }
})
