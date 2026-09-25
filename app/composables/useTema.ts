export type TemaPreferencia = 'light' | 'dark' | 'system'

const PREFERENCIAS: TemaPreferencia[] = ['light', 'dark', 'system']

export function useTema() {
  const colorMode = useColorMode()
  const temaSalvo = useState<TemaPreferencia>('tema-preferencia', () => 'system')

  const preferencia = computed<TemaPreferencia>({
    get: () => temaSalvo.value,
    set: (valor) => {
      temaSalvo.value = valor
      colorMode.preference = valor
    }
  })

  // Mantém sincronizado caso o colorMode seja alterado por outro mecanismo.
  watch(() => colorMode.preference, (valor) => {
    if (valor && valor !== temaSalvo.value) {
      temaSalvo.value = valor as TemaPreferencia
    }
  })

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
  const rotulo = computed(() => `Tema: ${info.value.rotulo}`)

  function alternar() {
    const indiceAtual = PREFERENCIAS.indexOf(preferencia.value)
    const proximoIndice = (indiceAtual + 1) % PREFERENCIAS.length
    preferencia.value = PREFERENCIAS[proximoIndice]
  }

  return {
    preferencia,
    icone,
    rotulo,
    alternar
  }
}
