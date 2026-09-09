import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '../db/schema'

let db: ReturnType<typeof drizzle<typeof schema>> | null = null
let pool: Pool | null = null

export function usarBanco() {
  if (db) return db

  const url = useRuntimeConfig().databaseUrl
  if (!url) throw new Error('DATABASE_URL não configurada')

  pool = new Pool({ connectionString: url })
  db = drizzle(pool, { schema })

  return db
}

export async function fecharBanco() {
  if (pool) {
    await pool.end()
    pool = null
    db = null
  }
}
