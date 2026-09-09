import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

async function criarSessao(email: string, senha: string) {
  let cookie = ''
  await $fetch('/api/autenticacao/entrar', {
    method: 'POST',
    body: { email, senha },
    onResponse({ response }) {
      cookie = response.headers.get('set-cookie') || ''
    }
  })
  return cookie
}

describe('Controle de acesso', async () => {
  await setup({
    server: true,
    nuxtConfig: {
      runtimeConfig: {
        databaseUrl: 'postgresql://nuxt_dev:nuxt_dev@localhost:5432/nuxt_test',
        rootEmail: 'root@teste.com',
        rootPassword: 'root123456'
      }
    }
  })

  it('usuário comum não acessa conta de outro usuário', async () => {
    await $fetch('/api/autenticacao/cadastro', {
      method: 'POST',
      body: { nome: 'Ana', email: 'ana@teste.com', senha: 'senha12345' }
    })
    const cookieAna = await criarSessao('ana@teste.com', 'senha12345')

    const conta = await $fetch('/api/contas', {
      method: 'POST',
      headers: { cookie: cookieAna },
      body: { nome: 'Conta Ana', tipo: 'pagar', valor: 100, vencimento: '2026-09-10', status: 'pendente' }
    })

    await $fetch('/api/autenticacao/cadastro', {
      method: 'POST',
      body: { nome: 'Bruno', email: 'bruno@teste.com', senha: 'senha12345' }
    })
    const cookieBruno = await criarSessao('bruno@teste.com', 'senha12345')

    await expect($fetch(`/api/contas/${conta.id}`, { headers: { cookie: cookieBruno } }))
      .rejects.toMatchObject({ statusCode: 403 })
  })

  it('root acessa todas as contas', async () => {
    const cookieRoot = await criarSessao('root@teste.com', 'root123456')
    const lista = await $fetch('/api/contas', { headers: { cookie: cookieRoot } })
    expect(lista.length).toBeGreaterThan(0)
  })
})
