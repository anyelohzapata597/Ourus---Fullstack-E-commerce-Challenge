import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
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
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
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

