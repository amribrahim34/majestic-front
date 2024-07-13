import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
