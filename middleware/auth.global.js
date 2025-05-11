export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.server) return
  
    const { isConnected } = storeToRefs(useMqttStore())

    // ✅ After connection logic, check route permissions
    if (!isConnected.value && to.path !== '/') {
      return navigateTo('/')
    }
  
    if (isConnected.value && to.path === '/') {
      return navigateTo('/dashboard')
    }
  })
  