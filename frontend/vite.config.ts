import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/styles/palette.scss";',
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
