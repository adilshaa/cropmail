import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',  // This ensures assets are loaded relative to index.html
  server: {
    headers: {
      'Content-Type': 'text/css',
    },
    middleware: ({ res }) => {
      res.setHeader('Content-Type', 'text/css');
    },
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
})

