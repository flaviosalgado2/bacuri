import type { Credenciais, DadosCadastro } from '~/composables/useAutenticacao'

export const autenticacaoService = {
  entrar: (credenciais: Credenciais) =>
    $fetch('/api/autenticacao/entrar', { method: 'POST', body: credenciais }),

  cadastrar: (dados: DadosCadastro) =>
    $fetch('/api/autenticacao/cadastro', { method: 'POST', body: dados }),

  sair: () =>
    $fetch('/api/autenticacao/sair', { method: 'POST' })
}
