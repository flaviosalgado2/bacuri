import { Pool } from 'pg'

export const urlTeste = 'postgresql://nuxt_dev:nuxt_dev@localhost:5432/nuxt_test'

export async function limparBanco() {
  const pool = new Pool({ connectionString: urlTeste })
  await pool.query(`
    DROP TABLE IF EXISTS contas CASCADE;
    DROP TABLE IF EXISTS usuarios CASCADE;
    DROP TYPE IF EXISTS perfil CASCADE;
    DROP TYPE IF EXISTS status CASCADE;
    DROP TYPE IF EXISTS tipo CASCADE;
    DROP TABLE IF EXISTS drizzle.__drizzle_migrations CASCADE;
    DROP SCHEMA IF EXISTS drizzle CASCADE;
  `)
  await pool.end()
}

export async function migrar() {
  const { execSync } = await import('child_process')
  execSync('npx drizzle-kit migrate', {
    env: { ...process.env, DATABASE_URL: urlTeste },
    cwd: process.cwd(),
    stdio: 'pipe'
  })
}

export async function resetarBanco() {
  await limparBanco()
  await migrar()
}
