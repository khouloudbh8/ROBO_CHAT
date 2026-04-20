import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/nom-de-ton-repo/',  // ← ajoute cette ligne
  server: {
    host: true,
    port: 5173,
  }
})