export interface UsuarioGerenciado {
  id: number
  nome: string
  email: string
  perfil: 'usuario' | 'root'
  ativo: boolean
  criadoEm: string
}

export interface DadosUsuario {
  nome: string
  email: string
  senha?: string
  perfil: 'usuario' | 'root'
  ativo: boolean
}

export const usuarioService = {
  listar: () => $fetch<UsuarioGerenciado[]>('/api/usuarios'),

  buscar: (id: number) => $fetch<UsuarioGerenciado>(`/api/usuarios/${id}`),

  criar: (dados: DadosUsuario & { senha: string }) =>
    $fetch<UsuarioGerenciado>('/api/usuarios', { method: 'POST', body: dados }),

  atualizar: (id: number, dados: Partial<DadosUsuario>) =>
    $fetch<UsuarioGerenciado>(`/api/usuarios/${id}`, { method: 'PUT', body: dados }),

  desativar: (id: number) => $fetch(`/api/usuarios/${id}`, { method: 'DELETE' })
}
