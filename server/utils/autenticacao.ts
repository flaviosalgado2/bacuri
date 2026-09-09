import { eq } from 'drizzle-orm'
import { usuarios, type Usuario } from '../db/schema'

export async function buscarUsuarioPorEmail(email: string): Promise<Usuario | undefined> {
  const banco = usarBanco()
  const [usuario] = await banco.select().from(usuarios).where(eq(usuarios.email, email.toLowerCase().trim()))
  return usuario
}

export async function criarUsuario(dados: { nome: string; email: string; senha: string; perfil?: 'usuario' | 'root' }): Promise<Usuario> {
  const banco = usarBanco()
  const [usuario] = await banco.insert(usuarios).values({
    nome: dados.nome,
    email: dados.email.toLowerCase().trim(),
    senhaHash: await hashPassword(dados.senha),
    perfil: dados.perfil || 'usuario'
  }).returning()

  return usuario
}

export function usuarioSemSenha(usuario: Usuario) {
  const { senhaHash, ...seguro } = usuario
  return seguro
}
