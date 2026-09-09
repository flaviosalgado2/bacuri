export default defineNuxtRouteMiddleware(async () => {
  const { user, loggedIn, ready, fetch } = useUserSession()
  if (!ready.value) await fetch()
  if (!loggedIn.value) return navigateTo('/entrar')
  if (user.value?.perfil !== 'root') return navigateTo('/')
})
