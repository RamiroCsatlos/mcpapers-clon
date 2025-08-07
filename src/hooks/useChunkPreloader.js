/**
 * 🎯 FASE 3.2.2 - Hook para precarga inteligente de chunks
 * Optimiza la carga de componentes basado en el comportamiento del usuario
 */

import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { preloader } from '../utils/chunkAnalyzer';

/**
 * Hook para precargar chunks de manera inteligente
 */
export const useChunkPreloader = () => {
  const location = useLocation();

  /**
   * Precarga chunks basado en la ruta actual
   */
  const preloadByRoute = useCallback((currentPath) => {
    // Mapeo de rutas y sus chunks relacionados para precarga
    const routePreloadMap = {
      '/': {
        // En home, precargar páginas más visitadas
        chunks: [
          { import: () => import('../components/Contact'), name: 'contact-page', priority: 'high' },
          { import: () => import('../pages/Productos'), name: 'productos', priority: 'normal' },
          { import: () => import('../pages/Nosotros'), name: 'nosotros', priority: 'normal' }
        ]
      },
      
      '/productos': {
        // En productos, precargar tipos de productos
        chunks: [
          { import: () => import('../pages/BolsasFlat'), name: 'bolsas-flat', priority: 'high' },
          { import: () => import('../pages/BolsasCuadrado'), name: 'bolsas-cuadrado', priority: 'high' },
          { import: () => import('../pages/Laminas'), name: 'laminas', priority: 'normal' }
        ]
      },
      
      '/nosotros': {
        // En nosotros, precargar información relacionada
        chunks: [
          { import: () => import('../pages/Tecnologia'), name: 'tecnologia', priority: 'normal' },
          { import: () => import('../pages/ControlDeCalidad'), name: 'control-calidad', priority: 'normal' },
          { import: () => import('../components/Contact'), name: 'contact-page', priority: 'low' }
        ]
      },
      
      '/contacto': {
        // En contacto, precargar CV relacionado
        chunks: [
          { import: () => import('../components/CV'), name: 'cv-page', priority: 'high' }
        ]
      }
    };

    const preloadConfig = routePreloadMap[currentPath];
    if (preloadConfig) {
      preloadConfig.chunks.forEach(({ import: importFn, name, priority }) => {
        // Pequeño delay para no interferir con la carga actual
        setTimeout(() => {
          preloader.preloadChunk(importFn, name, priority);
        }, 1000);
      });
    }
  }, []);

  /**
   * Precarga chunks en hover de links (prefetch on hover)
   */
  const setupHoverPreload = useCallback(() => {
    const handleLinkHover = (event) => {
      const link = event.target.closest('a[href]');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#')) return;
      
      // Mapeo de rutas a chunks
      const hrefChunkMap = {
        '/contacto': { import: () => import('../components/Contact'), name: 'contact-page' },
        '/cv': { import: () => import('../components/CV'), name: 'cv-page' },
        '/productos': { import: () => import('../pages/Productos'), name: 'productos' },
        '/nosotros': { import: () => import('../pages/Nosotros'), name: 'nosotros' },
        '/bolsas-flat': { import: () => import('../pages/BolsasFlat'), name: 'bolsas-flat' },
        '/bolsas-cuadrado': { import: () => import('../pages/BolsasCuadrado'), name: 'bolsas-cuadrado' },
        '/laminas': { import: () => import('../pages/Laminas'), name: 'laminas' },
        '/tecnologia': { import: () => import('../pages/Tecnologia'), name: 'tecnologia' },
        '/equipamiento': { import: () => import('../pages/Equipamiento'), name: 'equipamiento-page' },
        '/control-calidad': { import: () => import('../pages/ControlDeCalidad'), name: 'control-calidad' }
      };
      
      const chunkConfig = hrefChunkMap[href];
      if (chunkConfig) {
        preloader.preloadChunk(chunkConfig.import, chunkConfig.name, 'low');
      }
    };

    // Agregar event listeners a todos los links
    document.addEventListener('mouseover', handleLinkHover);
    
    return () => {
      document.removeEventListener('mouseover', handleLinkHover);
    };
  }, []);

  /**
   * Precarga chunks críticos en idle time
   */
  const preloadCriticalChunks = useCallback(() => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        // Precargar componentes críticos durante tiempo idle
        const criticalChunks = [
          { import: () => import('../components/Contact'), name: 'contact-page', priority: 'normal' },
          { import: () => import('../pages/Productos'), name: 'productos', priority: 'normal' }
        ];
        
        criticalChunks.forEach(({ import: importFn, name, priority }) => {
          preloader.preloadChunk(importFn, name, priority);
        });
      });
    }
  }, []);

  // Efectos para configurar la precarga
  useEffect(() => {
    // Precargar basado en ruta actual
    preloadByRoute(location.pathname);
    
    // Configurar hover preload
    const cleanupHover = setupHoverPreload();
    
    // Precargar chunks críticos en idle
    preloadCriticalChunks();
    
    return cleanupHover;
  }, [location.pathname, preloadByRoute, setupHoverPreload, preloadCriticalChunks]);

  return {
    // Función para precarga manual
    preload: useCallback((importFunction, chunkName, priority = 'normal') => {
      preloader.preloadChunk(importFunction, chunkName, priority);
    }, []),
    
    // Función para limpiar cache
    clearCache: useCallback(() => {
      preloader.clearCache();
    }, []),
    
    // Función para obtener estadísticas
    getStats: useCallback((chunkName) => {
      return preloader.analyzer?.getChunkStats(chunkName);
    }, [])
  };
};

export default useChunkPreloader;
