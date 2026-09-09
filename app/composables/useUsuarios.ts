import { usuarioService } from '~/services/usuarioService'
import type { DadosUsuario, UsuarioGerenciado } from '~/services/usuarioService'

export type { DadosUsuario, UsuarioGerenciado }

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

  const sucesso = (titulo: string, descricao?: string) =>
    toast.add({ title: titulo, description: descricao, color: 'success' })

  const executar = async <T>(acao: () => Promise<T>, mensagens: { sucesso: string; descricao?: string; erro: string }) => {
    try {
      const resultado = await acao()
      sucesso(mensagens.sucesso, mensagens.descricao)
      return resultado
    } catch (err) {
      tratarErro(err, mensagens.erro)
    }
  }

  return {
    listar: () => executar(
      () => usuarioService.listar(),
      { sucesso: 'Usuários carregados', erro: 'Erro ao carregar usuários' }
    ),

    buscar: (id: number) => executar(
      () => usuarioService.buscar(id),
      { sucesso: 'Usuário carregado', erro: 'Erro ao carregar usuário' }
    ),

    criar: (dados: DadosUsuario & { senha: string }) => executar(
      () => usuarioService.criar(dados),
      { sucesso: 'Usuário criado', descricao: `"${dados.nome}" foi cadastrado com sucesso.`, erro: 'Erro ao criar usuário' }
    ),

    atualizar: (id: number, dados: Partial<DadosUsuario>) => executar(
      () => usuarioService.atualizar(id, dados),
      { sucesso: 'Usuário atualizado', erro: 'Erro ao atualizar usuário' }
    ),

    desativar: (id: number) => executar(
      () => usuarioService.desativar(id),
      { sucesso: 'Usuário desativado', descricao: 'O usuário foi desativado com sucesso.', erro: 'Erro ao desativar usuário' }
    )
  }
}
