import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('Autenticação', async () => {
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

  it('cadastra um novo usuário', async () => {
    const resposta = await $fetch('/api/autenticacao/cadastro', {
      method: 'POST',
      body: { nome: 'João', email: 'joao@teste.com', senha: 'senha12345' }
    })

    expect(resposta.nome).toBe('João')
    expect(resposta.email).toBe('joao@teste.com')
    expect(resposta.perfil).toBe('usuario')
    expect(resposta).not.toHaveProperty('senhaHash')
  })

  it('não permite e-mail duplicado', async () => {
    await expect($fetch('/api/autenticacao/cadastro', {
      method: 'POST',
      body: { nome: 'João', email: 'joao@teste.com', senha: 'senha12345' }
    })).rejects.toMatchObject({ statusCode: 409 })
  })

  it('faz login com credenciais corretas', async () => {
    const resposta = await $fetch('/api/autenticacao/entrar', {
      method: 'POST',
      body: { email: 'joao@teste.com', senha: 'senha12345' }
    })

    expect(resposta.email).toBe('joao@teste.com')
  })

  it('rejeita login com senha errada', async () => {
    await expect($fetch('/api/autenticacao/entrar', {
      method: 'POST',
      body: { email: 'joao@teste.com', senha: 'errada' }
    })).rejects.toMatchObject({ statusCode: 401 })
  })

  it('rejeita acesso à API protegida sem sessão', async () => {
    await expect($fetch('/api/autenticacao/eu')).rejects.toMatchObject({ statusCode: 401 })
  })
})
