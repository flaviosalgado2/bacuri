import { garantirRoot } from '../../services/autenticacaoService'
import { listarUsuarios, usuarioSemSenha } from '../../services/usuarioService'

export default defineEventHandler(async (event) => {
  await garantirRoot(event)
  const usuarios = await listarUsuarios()
  return usuarios.map(usuarioSemSenha)
})
