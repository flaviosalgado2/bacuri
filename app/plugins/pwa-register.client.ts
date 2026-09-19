export default defineNuxtPlugin(() => {
  if (import.meta.env.SSR) return
  if (!('serviceWorker' in navigator)) return

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then(registration => {
        console.log('[PWA] Service Worker registrado:', registration.scope)
      })
      .catch(error => {
        console.error('[PWA] Falha ao registrar Service Worker:', error)
      })
  })
})
