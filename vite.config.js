import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Add this to handle %PUBLIC_URL% like CRA
  define: {
    'process.env': process.env
  },
  // Update public directory path if needed
  publicDir: 'public'
})
