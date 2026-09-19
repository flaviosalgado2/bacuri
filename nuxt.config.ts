// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@vite-pwa/nuxt'
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

  ui: { colorMode: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      meta: [
        { name: 'theme-color', content: '#FF9800' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Bacuri' }
      ],
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/logo-bacuri.svg', sizes: 'any', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon-180x180.png', sizes: '180x180' }
      ]
    }
  },

  pwa: {
    registerType: 'autoUpdate',
    injectRegister: 'auto',
    pwaAssets: {
      config: true,
      overrideManifestIcons: true
    },
    manifest: {
      name: 'Bacuri',
      short_name: 'Bacuri',
      description: 'Gestão simplificada de contas a pagar e receber',
      theme_color: '#FF9800',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      lang: 'pt-BR',
      dir: 'ltr',
      categories: ['finance', 'business', 'productivity']
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff,woff2,ttf}'],
      runtimeCaching: [
        {
          urlPattern: /^\/api\/.*/i,
          handler: 'NetworkOnly'
        },
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      // Desabilitado em dev para evitar erros no Docker/HMR.
      // Teste o PWA com: npm run build && node .output/server/index.mjs
      enabled: false
    }
  }
})
