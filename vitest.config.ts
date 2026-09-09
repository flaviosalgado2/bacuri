import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  root: '.',
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.test.ts'],
    globalSetup: ['./tests/utils/setup.ts']
  }
})

