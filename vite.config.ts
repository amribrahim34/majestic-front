import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import commonjs from '@rollup/plugin-commonjs'

export default defineConfig({
  plugins: [vue(), commonjs()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    emptyOutDir: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      },
      external: [/\.eslintrc\.cjs$/]
    }
  },

  base: './' // This makes asset URLs relative
})
