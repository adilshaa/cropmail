import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Increase size limit to 1000kb
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
      },
      output: {
        manualChunks: {
          // Group React components into one chunk
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          
          // Group icons into separate chunk
          'vendor-icons': ['react-icons'],
          
          // Group other major dependencies
          'vendor-utils': [
            '@react-oauth/google',
            'react-helmet-async',
            'js-cookie'
          ],

          // Group analytics components
          'vendor-analytics': ['react-circular-progressbar'],
        },
        // Optimize chunk names
        chunkFileNames: (chunkInfo) => {
          const id = chunkInfo.facadeModuleId || chunkInfo.moduleIds[0]
          if (id.includes('node_modules')) {
            return 'vendor/[name].[hash].js'
          }
          return 'modules/[name].[hash].js'
        }
      }
    }
  },
  // Handle static assets
  publicDir: 'public',
  // Add base URL if deploying to subdirectory
  base: '/'
})
