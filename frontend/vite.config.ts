import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: '@use "@/assets/styles/palette.scss" as *;',
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
      "@assets": "/src/assets"
    },
  },

})
