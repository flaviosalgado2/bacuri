export default defineNuxtPlugin(() => {
  if (import.meta.env.SSR) return

  // O Nuxt UI só define colorMode.preference após a hidratação, então
  // lemos o valor salvo diretamente do localStorage para evitar que o botão
  // de tema inicie sempre como "Sistema" ao recarregar a página.
  const tema = useState<TemaPreferencia>('tema-preferencia', () => 'system')

  try {
    const salvo = localStorage.getItem('nuxt-color-mode')
    if (salvo === 'light' || salvo === 'dark' || salvo === 'system') {
      tema.value = salvo
    }
  } catch {
    // ignore
  }
})
