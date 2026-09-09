import { eq, asc } from 'drizzle-orm'
import { usuarios, type Usuario } from '../db/schema'

export async function buscarUsuarioPorEmail(email: string): Promise<Usuario | undefined> {
  const banco = usarBanco()
  const [usuario] = await banco.select().from(usuarios).where(eq(usuarios.email, email.toLowerCase().trim()))
  return usuario
}

export async function buscarUsuarioPorId(id: number): Promise<Usuario | undefined> {
  const banco = usarBanco()
  const [usuario] = await banco.select().from(usuarios).where(eq(usuarios.id, id))
  return usuario
}

export async function listarUsuarios(): Promise<Usuario[]> {
  const banco = usarBanco()
  return banco.select().from(usuarios).orderBy(asc(usuarios.nome))
}

export async function criarUsuario(dados: { nome: string; email: string; senha: string; perfil?: 'usuario' | 'root'; ativo?: boolean }): Promise<Usuario> {
  const banco = usarBanco()
  const [usuario] = await banco.insert(usuarios).values({
    nome: dados.nome,
    email: dados.email.toLowerCase().trim(),
    senhaHash: await hashPassword(dados.senha),
    perfil: dados.perfil || 'usuario',
    ativo: dados.ativo ?? true
  }).returning()

  return usuario
}

export async function atualizarUsuario(id: number, dados: Partial<{ nome: string; email: string; perfil: 'usuario' | 'root'; ativo: boolean; senha?: string }>): Promise<Usuario> {
  const banco = usarBanco()

  const valores: Partial<typeof usuarios.$inferInsert> = {
    nome: dados.nome,
    email: dados.email?.toLowerCase().trim(),
    perfil: dados.perfil,
    ativo: dados.ativo
  }

  if (dados.senha) {
    valores.senhaHash = await hashPassword(dados.senha)
  }

  // Remove campos undefined para não sobrescrever com null
  Object.keys(valores).forEach((chave) => {
    if (valores[chave as keyof typeof valores] === undefined) {
      delete valores[chave as keyof typeof valores]
    }
  })

  const [usuario] = await banco.update(usuarios).set(valores).where(eq(usuarios.id, id)).returning()
  return usuario
}

export async function desativarUsuario(id: number): Promise<Usuario> {
  return atualizarUsuario(id, { ativo: false })
}

export function usuarioSemSenha(usuario: Usuario) {
  const { senhaHash, ...seguro } = usuario
  return seguro
}

export async function garantirRoot(event: any) {
  const sessao = await requireUserSession(event)
  if (sessao.user.perfil !== 'root') {
    throw createError({ statusCode: 403, statusMessage: 'Apenas administradores podem executar esta ação' })
  }
  return sessao
}
