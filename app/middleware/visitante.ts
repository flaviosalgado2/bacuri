export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn, ready } = useUserSession()
  if (!ready.value) await useUserSession().fetch()
  if (loggedIn.value) return navigateTo('/')
})
