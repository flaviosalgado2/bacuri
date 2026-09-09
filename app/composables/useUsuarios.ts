interface UsuarioGerenciado {
  id: number
  nome: string
  email: string
  perfil: 'usuario' | 'root'
  ativo: boolean
  criadoEm: string
}

interface DadosUsuario {
  nome: string
  email: string
  senha?: string
  perfil: 'usuario' | 'root'
  ativo: boolean
}

export function useUsuarios() {
  const toast = useToast()

  const tratarErro = (err: any, padrao: string) => {
    toast.add({
      title: 'Erro',
      description: err?.data?.statusMessage || padrao,
      color: 'error'
    })
    throw err
  }

  const sucesso = (titulo: string, descricao?: string) => toast.add({ title: titulo, description: descricao, color: 'success' })

  async function listar() {
    try {
      return await $fetch<UsuarioGerenciado[]>('/api/usuarios')
    } catch (err) { tratarErro(err, 'Erro ao carregar usuários') }
  }

  async function buscar(id: number) {
    try {
      return await $fetch<UsuarioGerenciado>(`/api/usuarios/${id}`)
    } catch (err) { tratarErro(err, 'Erro ao carregar usuário') }
  }

  async function criar(dados: DadosUsuario & { senha: string }) {
    try {
      const usuario = await $fetch<UsuarioGerenciado>('/api/usuarios', { method: 'POST', body: dados })
      sucesso('Usuário criado', `"${usuario.nome}" foi cadastrado com sucesso.`)
      return usuario
    } catch (err) { tratarErro(err, 'Erro ao criar usuário') }
  }

  async function atualizar(id: number, dados: Partial<DadosUsuario>) {
    try {
      const usuario = await $fetch<UsuarioGerenciado>(`/api/usuarios/${id}`, { method: 'PUT', body: dados })
      sucesso('Usuário atualizado', `"${usuario.nome}" foi atualizado com sucesso.`)
      return usuario
    } catch (err) { tratarErro(err, 'Erro ao atualizar usuário') }
  }

  async function desativar(id: number) {
    try {
      await $fetch(`/api/usuarios/${id}`, { method: 'DELETE' })
      sucesso('Usuário desativado', 'O usuário foi desativado com sucesso.')
    } catch (err) { tratarErro(err, 'Erro ao desativar usuário') }
  }

  return { listar, buscar, criar, atualizar, desativar }
}
