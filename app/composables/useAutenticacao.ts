export interface Usuario {
  id: number
  nome: string
  email: string
  perfil: 'usuario' | 'root'
  ativo: boolean
  criadoEm: string
}

export interface Credenciais {
  email: string
  senha: string
}

export interface DadosCadastro extends Credenciais {
  nome: string
}

export function useAutenticacao() {
  const { user, loggedIn, ready, fetch: atualizarSessao } = useUserSession()
  const toast = useToast()
  const router = useRouter()

  const erro = (titulo: string, err: any) => {
    toast.add({
      title: titulo,
      description: err?.data?.statusMessage || 'Tente novamente',
      color: 'error'
    })
  }

  async function entrar(credenciais: Credenciais) {
    try {
      await $fetch('/api/autenticacao/entrar', { method: 'POST', body: credenciais })
      await atualizarSessao()
      toast.add({ title: 'Bem-vindo!', color: 'success' })
      router.push('/')
    } catch (err) {
      erro('Erro no login', err)
      throw err
    }
  }

  async function cadastrar(dados: DadosCadastro) {
    try {
      await $fetch('/api/autenticacao/cadastro', { method: 'POST', body: dados })
      await atualizarSessao()
      toast.add({ title: 'Conta criada', color: 'success' })
      router.push('/')
    } catch (err) {
      erro('Erro no cadastro', err)
      throw err
    }
  }

  async function sair() {
    try {
      await $fetch('/api/autenticacao/sair', { method: 'POST' })
      await atualizarSessao()
      router.push('/entrar')
    } catch (err) {
      erro('Erro ao sair', err)
    }
  }

  return {
    usuario: computed(() => user.value as Usuario | null),
    logado: loggedIn,
    pronto: ready,
    entrar,
    cadastrar,
    sair
  }
}
