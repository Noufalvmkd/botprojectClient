// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,   //  fixed port
    strictPort: true //  if 5174 is busy, it will throw error instead of changing
  }
})
