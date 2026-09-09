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

describe('Contas', async () => {
  await setup({
    server: true,
    nuxtConfig: {
      runtimeConfig: {
        databaseUrl: 'postgresql://nuxt_dev:nuxt_dev@localhost:5432/nuxt_test',
        rootEmail: '',
        rootPassword: ''
      }
    }
  })

  it('cria e lista contas do usuário', async () => {
    await $fetch('/api/autenticacao/cadastro', {
      method: 'POST',
      body: { nome: 'Maria', email: 'maria@teste.com', senha: 'senha12345' }
    })
    const cookie = await criarSessao('maria@teste.com', 'senha12345')

    const conta = await $fetch('/api/contas', {
      method: 'POST',
      body: { nome: 'Aluguel', tipo: 'pagar', valor: 1500, vencimento: '2026-09-10', status: 'pendente' },
      headers: { cookie }
    })

    expect(conta.nome).toBe('Aluguel')
    expect(conta.tipo).toBe('pagar')
    expect(conta.status).toBe('pendente')

    const lista = await $fetch('/api/contas', { headers: { cookie } })
    expect(lista).toHaveLength(1)
    expect(lista[0].nome).toBe('Aluguel')
  })

  it('atualiza status da conta', async () => {
    const cookie = await criarSessao('maria@teste.com', 'senha12345')
    const conta = await $fetch('/api/contas', {
      method: 'POST',
      headers: { cookie },
      body: { nome: 'Luz', tipo: 'pagar', valor: 200, vencimento: '2026-09-15', status: 'pendente' }
    })

    const atualizada = await $fetch(`/api/contas/${conta.id}/status`, {
      method: 'PATCH',
      body: { status: 'pago' },
      headers: { cookie }
    })

    expect(atualizada.status).toBe('pago')
  })

  it('exclui conta', async () => {
    const cookie = await criarSessao('maria@teste.com', 'senha12345')
    const conta = await $fetch('/api/contas', {
      method: 'POST',
      headers: { cookie },
      body: { nome: 'Internet', tipo: 'pagar', valor: 150, vencimento: '2026-09-20', status: 'pendente' }
    })

    await $fetch(`/api/contas/${conta.id}`, { method: 'DELETE', headers: { cookie } })
    const lista = await $fetch('/api/contas', { headers: { cookie } })
    expect(lista.some((c: any) => c.id === conta.id)).toBe(false)
  })
})
