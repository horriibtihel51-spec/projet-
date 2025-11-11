import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Permet l'accès depuis d'autres appareils
    open: true  // Ouvre automatiquement le navigateur
  }
})