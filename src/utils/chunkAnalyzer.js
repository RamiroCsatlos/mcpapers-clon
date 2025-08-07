/**
 * 🎯 FASE 3.2.2 - Chunk Analysis & Bundle Optimization
 * Utilidades para análisis y optimización de chunks
 */

class ChunkAnalyzer {
  constructor() {
    this.chunkMetrics = new Map();
    this.loadTimes = new Map();
    this.isProduction = import.meta.env.PROD;
    this.enableAnalytics = !this.isProduction;
  }

  /**
   * Registra métricas de carga de chunks
   */
  trackChunkLoad(chunkName, startTime, endTime) {
    if (!this.enableAnalytics) return;
    
    const loadTime = endTime - startTime;
    const existing = this.loadTimes.get(chunkName) || [];
    existing.push(loadTime);
    this.loadTimes.set(chunkName, existing);
    
    // Log para desarrollo
    console.log(`📊 Chunk "${chunkName}" loaded in ${loadTime}ms`);
  }

  /**
   * Obtiene estadísticas de rendimiento de chunks
   */
  getChunkStats(chunkName) {
    const times = this.loadTimes.get(chunkName) || [];
    if (times.length === 0) return null;
    
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);
    
    return { avg, min, max, count: times.length };
  }

  /**
   * Reporta estadísticas generales
   */
  generateReport() {
    if (!this.enableAnalytics) return;
    
    console.group('📊 Chunk Performance Report');
    
    for (const [chunkName, _] of this.loadTimes) {
      const stats = this.getChunkStats(chunkName);
      console.log(`${chunkName}:`, {
        average: `${stats.avg.toFixed(2)}ms`,
        fastest: `${stats.min}ms`,
        slowest: `${stats.max}ms`,
        loads: stats.count
      });
    }
    
    console.groupEnd();
  }
}

/**
 * Clase para prefetch inteligente de chunks
 */
class ChunkPreloader {
  constructor() {
    this.preloadedChunks = new Set();
    this.preloadQueue = [];
    this.isPreloading = false;
    this.networkInfo = this.getNetworkInfo();
  }

  /**
   * Obtiene información de red del usuario
   */
  getNetworkInfo() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        saveData: connection.saveData
      };
    }
    return { effectiveType: '4g', downlink: 10, saveData: false };
  }

  /**
   * Decide si debe precargar basado en la conexión
   */
  shouldPreload() {
    const { effectiveType, saveData, downlink } = this.networkInfo;
    
    // No precargar si el usuario tiene data saver activado
    if (saveData) return false;
    
    // Solo precargar en conexiones rápidas
    if (effectiveType === 'slow-2g' || effectiveType === '2g') return false;
    if (downlink < 1.5) return false;
    
    return true;
  }

  /**
   * Precarga un chunk de manera inteligente
   */
  async preloadChunk(importFunction, chunkName, priority = 'low') {
    if (!this.shouldPreload()) return;
    if (this.preloadedChunks.has(chunkName)) return;
    
    // Agregar a cola con prioridad
    this.preloadQueue.push({ importFunction, chunkName, priority });
    this.preloadQueue.sort((a, b) => {
      const priorityOrder = { high: 3, normal: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    
    if (!this.isPreloading) {
      this.processQueue();
    }
  }

  /**
   * Procesa la cola de precarga
   */
  async processQueue() {
    if (this.preloadQueue.length === 0 || this.isPreloading) return;
    
    this.isPreloading = true;
    
    while (this.preloadQueue.length > 0) {
      const { importFunction, chunkName } = this.preloadQueue.shift();
      
      if (this.preloadedChunks.has(chunkName)) continue;
      
      try {
        const startTime = performance.now();
        await importFunction();
        const endTime = performance.now();
        
        this.preloadedChunks.add(chunkName);
        analyzer.trackChunkLoad(chunkName, startTime, endTime);
        
        console.log(`✅ Preloaded chunk: ${chunkName}`);
        
        // Pequeña pausa entre precargas para no bloquear
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.warn(`⚠️ Failed to preload chunk ${chunkName}:`, error);
      }
    }
    
    this.isPreloading = false;
  }

  /**
   * Limpia la cache de chunks precargados
   */
  clearCache() {
    this.preloadedChunks.clear();
    this.preloadQueue = [];
    this.isPreloading = false;
  }
}

/**
 * Función helper para lazy loading con métricas
 */
export const createOptimizedLazy = (importFunction, chunkName) => {
  return () => {
    const startTime = performance.now();
    
    return importFunction().then(module => {
      const endTime = performance.now();
      analyzer.trackChunkLoad(chunkName, startTime, endTime);
      return module;
    }).catch(error => {
      console.error(`❌ Failed to load chunk ${chunkName}:`, error);
      throw error;
    });
  };
};

/**
 * Hook para usar el preloader
 */
export const useChunkPreloader = () => {
  return {
    preload: (importFunction, chunkName, priority) => 
      preloader.preloadChunk(importFunction, chunkName, priority),
    clearCache: () => preloader.clearCache(),
    getStats: (chunkName) => analyzer.getChunkStats(chunkName)
  };
};

// Instancias globales
export const analyzer = new ChunkAnalyzer();
export const preloader = new ChunkPreloader();

// Reporte automático en desarrollo
if (import.meta.env.DEV) {
  // Generar reporte cada 30 segundos
  setInterval(() => analyzer.generateReport(), 30000);
  
  // Reporte al descargar la página
  window.addEventListener('beforeunload', () => analyzer.generateReport());
}

export default {
  analyzer,
  preloader,
  createOptimizedLazy,
  useChunkPreloader
};
