import type { Tema } from '~/services/configuracaoService'

export default defineNuxtPlugin(async () => {
  if (import.meta.env.SSR) return

  const colorMode = useColorMode()

  function aplicarTema(tema: Tema) {
    if (tema === 'system') {
      colorMode.preference = 'system'
    } else {
      colorMode.preference = tema
    }
  }

  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    colorMode.preference = 'system'
    return
  }

  try {
    const configuracao = await $fetch<{ tema: Tema }>('/api/configuracoes')
    aplicarTema(configuracao.tema)
  } catch {
    colorMode.preference = 'system'
  }
})
