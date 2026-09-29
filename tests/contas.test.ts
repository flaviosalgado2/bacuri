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
    expect(lista.contas).toHaveLength(1)
    expect(lista.contas[0].nome).toBe('Aluguel')
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
    expect(lista.contas.some((c: any) => c.id === conta.id)).toBe(false)
  })

  it('busca em todos os campos', async () => {
    const cookie = await criarSessao('maria@teste.com', 'senha12345')

    await $fetch('/api/contas', {
      method: 'POST',
      headers: { cookie },
      body: { nome: 'BuscaUnica123', tipo: 'pagar', valor: 350, vencimento: '2026-09-25', status: 'pendente' }
    })

    const porNome = await $fetch('/api/contas', { headers: { cookie }, query: { tipo: 'pagar', busca: 'Unica123' } })
    expect(porNome.contas.some((c: any) => c.nome === 'BuscaUnica123')).toBe(true)

    const porValor = await $fetch('/api/contas', { headers: { cookie }, query: { tipo: 'pagar', busca: '350' } })
    expect(porValor.contas.some((c: any) => c.nome === 'BuscaUnica123')).toBe(true)
  })

  it('ordena por qualquer campo', async () => {
    const cookie = await criarSessao('maria@teste.com', 'senha12345')

    await $fetch('/api/contas', {
      method: 'POST',
      headers: { cookie },
      body: { nome: 'Z Ordenacao', tipo: 'pagar', valor: 100, vencimento: '2026-09-10', status: 'pendente' }
    })
    await $fetch('/api/contas', {
      method: 'POST',
      headers: { cookie },
      body: { nome: 'A Ordenacao', tipo: 'pagar', valor: 200, vencimento: '2026-09-11', status: 'pendente' }
    })

    const ordenada = await $fetch('/api/contas', { headers: { cookie }, query: { tipo: 'pagar', ordenarPor: 'nome', ordem: 'asc' } })
    const nomes = ordenada.contas.filter((c: any) => c.nome.includes('Ordenacao')).map((c: any) => c.nome)
    expect(nomes[0]).toBe('A Ordenacao')
    expect(nomes[1]).toBe('Z Ordenacao')

    const decrescente = await $fetch('/api/contas', { headers: { cookie }, query: { tipo: 'pagar', ordenarPor: 'nome', ordem: 'desc' } })
    const nomesDesc = decrescente.contas.filter((c: any) => c.nome.includes('Ordenacao')).map((c: any) => c.nome)
    expect(nomesDesc[0]).toBe('Z Ordenacao')
    expect(nomesDesc[1]).toBe('A Ordenacao')
  })
})
