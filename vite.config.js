/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/mcpapers-clon/',
  
  // 🎯 FASE 3.2.2 - Bundle Optimization & Code Splitting
  build: {
    // Configuración de chunks manuales para optimización
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - Dependencias externas
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          
          // Core components - Componentes esenciales
          'core-components': [
            './src/components/Header.jsx',
            './src/components/Footer.jsx',
            './src/components/AnimatedWaveBanner.jsx',
            './src/components/About.jsx'
          ],
          
          // UI components - Componentes de interfaz
          'ui-components': [
            './src/components/LoadingSpinner.jsx',
            './src/components/LazySection.jsx',
            './src/components/ImagePreloader.jsx'
          ],
          
          // Product pages - Páginas de productos
          'product-pages': [
            './src/pages/BolsasFlat.jsx',
            './src/pages/BolsasCuadrado.jsx',
            './src/pages/Laminas.jsx',
            './src/pages/Productos.jsx'
          ],
          
          // Info pages - Páginas informativas
          'info-pages': [
            './src/pages/Nosotros.jsx',
            './src/pages/Tecnologia.jsx',
            './src/pages/Tecnica.jsx',
            './src/pages/ControlDeCalidad.jsx'
          ],
          
          // Media components - Componentes multimedia
          'media-components': [
            './src/components/Slider.jsx',
            './src/components/GaleriaInstagram.jsx'
          ]
        },
        
        // Naming strategy para chunks
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId 
            ? chunkInfo.facadeModuleId.split('/').pop().replace(/\.\w+$/, '') 
            : 'chunk';
          return `assets/[name]-[hash].js`;
        }
      }
    },
    
    // Configuración de minificación
    minify: 'esbuild',
    target: 'es2020',
    
    // Source maps para desarrollo
    sourcemap: true,
    
    // Optimizaciones adicionales
    reportCompressedSize: true,
    chunkSizeWarningLimit: 600
  },
  
  // Optimizaciones para desarrollo
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.{js,jsx}',
        '**/*.spec.{js,jsx}',
        'vite.config.js',
        'eslint.config.js'
      ]
    }
  }
})
