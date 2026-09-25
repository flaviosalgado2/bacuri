export type TemaPreferencia = 'light' | 'dark' | 'system'

const PREFERENCIAS: TemaPreferencia[] = ['light', 'dark', 'system']

export function useTema() {
  const colorMode = useColorMode()

  const preferencia = computed<TemaPreferencia>({
    get: () => (colorMode.preference as TemaPreferencia) || 'system',
    set: (valor) => {
      colorMode.preference = valor
    }
  })

  const valorAtual = computed(() => colorMode.value as 'light' | 'dark')

  const info = computed(() => {
    switch (preferencia.value) {
      case 'light':
        return { icone: 'i-lucide-sun', rotulo: 'Claro' }
      case 'dark':
        return { icone: 'i-lucide-moon', rotulo: 'Escuro' }
      case 'system':
      default:
        return { icone: 'i-lucide-monitor', rotulo: 'Sistema' }
    }
  })

  const icone = computed(() => info.value.icone)
  const rotulo = computed(() => info.value.rotulo)

  function alternar() {
    const indiceAtual = PREFERENCIAS.indexOf(preferencia.value)
    const proximoIndice = (indiceAtual + 1) % PREFERENCIAS.length
    preferencia.value = PREFERENCIAS[proximoIndice]
  }

  return {
    preferencia,
    valorAtual,
    icone,
    rotulo,
    alternar
  }
}
