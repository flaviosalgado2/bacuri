// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils'
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    rootEmail: process.env.ROOT_EMAIL,
    rootPassword: process.env.ROOT_PASSWORD,
    public: {
      // Ambiente exibido no selo vermelho do header (Cabecalho.vue).
      // Este valor é APENAS o fallback de build. Em runtime o Nuxt o
      // sobrescreve automaticamente pela env NUXT_PUBLIC_APP_ENV definida
      // no docker-compose (local/dev/prod). Não mexa aqui para trocar ambiente.
      appEnv: 'local'
    }
  },

  ui: { colorMode: true }
})
