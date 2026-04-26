import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/Ourus---Fullstack-E-commerce-Challenge/',
  plugins: [react(), tailwindcss()],
  
  // Resolver path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@types': path.resolve(__dirname, './src/types'),
      '@mockdata': path.resolve(__dirname, './src/mockdata'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
    },
  },
  
  // Optimizaciones de build
  build: {
    // Minificación
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remover console logs en producción
        drop_debugger: true,
      },
      format: {
        comments: false, // Remover comentarios
      },
    },
    
    // Tamaño de chunks
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Separar vendor code
        manualChunks: (id) => {
          if (id.includes('node_modules/react')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/zustand')) {
            return 'zustand-vendor';
          }
        },
      },
    },
    
    // CSS
    cssCodeSplit: true,
    cssTarget: 'chrome61', // Para mejor compatibilidad
    
    // Source maps solo en desarrollo
    sourcemap: false,
    
    // Reportar tamaño final
    reportCompressedSize: true,
  },
  
  // Optimizaciones de servidor
  server: {
    compression: 'gzip', // Habilitar compresión gzip
    middlewareMode: false,
    headers: {
      'Cache-Control': 'max-age=3600, must-revalidate',
    },
  },
  
  // Preview (after build)
  preview: {
    compression: 'gzip',
  },
})
