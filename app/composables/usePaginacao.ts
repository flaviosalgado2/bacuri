export function paginasVisiveis(totalPaginas: number, paginaAtual: number, vizinhos = 2): (number | string)[] {
  if (totalPaginas <= 1) return []

  const paginas: (number | string)[] = []
  const inicio = Math.max(1, paginaAtual - vizinhos)
  const fim = Math.min(totalPaginas, paginaAtual + vizinhos)

  if (inicio > 1) {
    paginas.push(1)
    if (inicio > 2) paginas.push('...')
  }

  for (let i = inicio; i <= fim; i++) {
    paginas.push(i)
  }

  if (fim < totalPaginas) {
    if (fim < totalPaginas - 1) paginas.push('...')
    paginas.push(totalPaginas)
  }

  return paginas
}
