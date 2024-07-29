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
    chunkSizeWarningLimit: 1000,
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
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      },
      external: [/\.eslintrc\.cjs$/]
    }
  },

  base: './' // This makes asset URLs relative
})
