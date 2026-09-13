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

describe('Configurações', async () => {
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

  it('retorna configuração padrão ao buscar sem configuração prévia', async () => {
    await $fetch('/api/autenticacao/cadastro', {
      method: 'POST',
      body: { nome: 'João', email: 'joao_cfg_1@teste.com', senha: 'senha12345' }
    })
    const cookie = await criarSessao('joao_cfg_1@teste.com', 'senha12345')

    const configuracao = await $fetch('/api/configuracoes', { headers: { cookie } })

    expect(configuracao.outlookAtivado).toBe(false)
    expect(configuracao.outlookLembreteDias).toBe(1)
    expect(configuracao.outlookContaEmail).toBeNull()
    expect(configuracao).not.toHaveProperty('outlookToken')
    expect(configuracao).not.toHaveProperty('outlookRefreshToken')
  })

  it('atualiza configurações do usuário', async () => {
    await $fetch('/api/autenticacao/cadastro', {
      method: 'POST',
      body: { nome: 'Maria', email: 'maria_cfg_2@teste.com', senha: 'senha12345' }
    })
    const cookie = await criarSessao('maria_cfg_2@teste.com', 'senha12345')

    const atualizada = await $fetch('/api/configuracoes', {
      method: 'PUT',
      headers: { cookie },
      body: {
        outlookAtivado: true,
        outlookClientId: 'client-id-123',
        outlookClientSecret: 'client-secret-123',
        outlookTenantId: 'common',
        outlookRedirectUri: 'http://localhost:3000/api/configuracoes/outlook/callback',
        outlookLembreteDias: 3,
        outlookContaEmail: 'maria@outlook.com',
        outlookCalendarioId: 'calendario-123'
      }
    })

    expect(atualizada.outlookAtivado).toBe(true)
    expect(atualizada.outlookClientId).toBe('client-id-123')
    expect(atualizada.outlookTenantId).toBe('common')
    expect(atualizada.outlookRedirectUri).toBe('http://localhost:3000/api/configuracoes/outlook/callback')
    expect(atualizada.outlookLembreteDias).toBe(3)
    expect(atualizada.outlookContaEmail).toBe('maria@outlook.com')
    expect(atualizada.outlookCalendarioId).toBe('calendario-123')
    expect(atualizada).not.toHaveProperty('outlookClientSecret')
  })

  it('retorna erro ao atualizar com dados inválidos', async () => {
    await $fetch('/api/autenticacao/cadastro', {
      method: 'POST',
      body: { nome: 'Pedro', email: 'pedro_cfg_3@teste.com', senha: 'senha12345' }
    })
    const cookie = await criarSessao('pedro_cfg_3@teste.com', 'senha12345')

    await expect($fetch('/api/configuracoes', {
      method: 'PUT',
      headers: { cookie },
      body: { outlookLembreteDias: 99 }
    })).rejects.toThrow()
  })

  it('desconecta a conta do Outlook', async () => {
    await $fetch('/api/autenticacao/cadastro', {
      method: 'POST',
      body: { nome: 'Ana', email: 'ana_cfg_4@teste.com', senha: 'senha12345' }
    })
    const cookie = await criarSessao('ana_cfg_4@teste.com', 'senha12345')

    const configuracao = await $fetch('/api/configuracoes/outlook/desconectar', {
      method: 'POST',
      headers: { cookie }
    })

    expect(configuracao.outlookAtivado).toBe(false)
    expect(configuracao.outlookContaEmail).toBeNull()
  })

  it('retorna erro ao testar conexão sem conta conectada', async () => {
    await $fetch('/api/autenticacao/cadastro', {
      method: 'POST',
      body: { nome: 'Carlos', email: 'carlos_cfg_5@teste.com', senha: 'senha12345' }
    })
    const cookie = await criarSessao('carlos_cfg_5@teste.com', 'senha12345')

    await expect($fetch('/api/configuracoes/outlook/testar', { headers: { cookie } }))
      .rejects.toMatchObject({ statusCode: 401 })
  })
})
