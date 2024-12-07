import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Enables polling, necessary in some Docker environments
    },
    host: true,         // Allows access from the host machine
    port: 5173,         // Ensure Vite is using the correct port
  }
})
