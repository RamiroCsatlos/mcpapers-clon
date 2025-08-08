/**
 * 🎯 FASE 3.2.3 - Web Vitals & Performance Monitoring
 * Sistema completo de tracking de Core Web Vitals y métricas personalizadas
 */

import { onFCP, onLCP, onCLS, onTTFB, onINP } from 'web-vitals';

/**
 * Configuración de métricas y umbrales
 */
const PERFORMANCE_CONFIG = {
  // Umbrales de Core Web Vitals (en ms)
  thresholds: {
    FCP: { good: 1000, poor: 3000 },      // First Contentful Paint
    LCP: { good: 1800, poor: 4000 },      // Largest Contentful Paint  
    CLS: { good: 0.05, poor: 0.25 },      // Cumulative Layout Shift
    TTFB: { good: 600, poor: 1500 },      // Time to First Byte
    INP: { good: 100, poor: 300 }         // Interaction to Next Paint
  },
  
  // Configuración de reporting
  reporting: {
    enabled: true,
    endpoint: null, // Se puede configurar para enviar a analytics
    console: import.meta.env.DEV,
    localStorage: true,
    maxEntries: 100
  }
};

/**
 * Clase principal para manejo de Web Vitals
 */
class WebVitalsMonitor {
  constructor(config = PERFORMANCE_CONFIG) {
    this.config = config;
    this.metrics = new Map();
    this.listeners = new Set();
    this.startTime = performance.now();
    
    // Inicializar almacenamiento local si está habilitado
    if (this.config.reporting.localStorage) {
      this.initLocalStorage();
    }
    
    // Inicializar tracking automáticamente
    this.initTracking();
  }

  /**
   * Inicializa el almacenamiento local para métricas
   */
  initLocalStorage() {
    const stored = localStorage.getItem('webVitalsMetrics');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Mantener solo métricas recientes (últimas 24h)
        const dayAgo = Date.now() - (24 * 60 * 60 * 1000);
        const recent = parsed.filter(metric => metric.timestamp > dayAgo);
        this.storedMetrics = recent.slice(-this.config.reporting.maxEntries);
      } catch (e) {
        this.storedMetrics = [];
      }
    } else {
      this.storedMetrics = [];
    }
  }

  /**
   * Inicializa el tracking de todas las métricas
   */
  initTracking() {
    // Core Web Vitals (sin FID que fue reemplazado por INP)
    onFCP(this.handleMetric.bind(this, 'FCP'));
    onLCP(this.handleMetric.bind(this, 'LCP'));
    onCLS(this.handleMetric.bind(this, 'CLS'));
    onTTFB(this.handleMetric.bind(this, 'TTFB'));
    onINP(this.handleMetric.bind(this, 'INP'));
    
    // Métricas personalizadas
    this.trackCustomMetrics();
    
    // Performance Observer para métricas adicionales
    if ('PerformanceObserver' in window) {
      this.initPerformanceObserver();
    }
  }

  /**
   * Maneja las métricas recibidas de web-vitals
   */
  handleMetric(name, metric) {
    const metricData = {
      name,
      value: metric.value,
      rating: this.getRating(name, metric.value),
      timestamp: Date.now(),
      id: metric.id,
      navigationType: metric.navigationType,
      entries: metric.entries || []
    };
    
    // Almacenar métrica
    this.metrics.set(name, metricData);
    
    // Notificar a listeners
    this.notifyListeners(metricData);
    
    // Log en desarrollo
    if (this.config.reporting.console) {
      this.logMetric(metricData);
    }
    
    // Almacenar localmente
    if (this.config.reporting.localStorage) {
      this.saveToLocalStorage(metricData);
    }
    
    // Enviar a endpoint si está configurado
    if (this.config.reporting.endpoint) {
      this.sendToEndpoint(metricData);
    }
  }

  /**
   * Determina el rating de una métrica (good/needs-improvement/poor)
   */
  getRating(name, value) {
    const thresholds = this.config.thresholds[name];
    if (!thresholds) return 'unknown';
    
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.poor) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Tracking de métricas personalizadas
   */
  trackCustomMetrics() {
    // Time to Interactive aproximado
    this.trackTimeToInteractive();
    
    // Métricas de memoria
    this.trackMemoryMetrics();
    
    // Métricas de red
    this.trackNetworkMetrics();
    
    // Métricas de chunks
    this.trackChunkMetrics();
  }

  /**
   * Time to Interactive personalizado
   */
  trackTimeToInteractive() {
    let isInteractive = false;
    
    const checkInteractive = () => {
      if (isInteractive) return;
      
      // Criterios simples para TTI
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation && navigation.domInteractive > 0) {
        const tti = navigation.domInteractive;
        
        this.handleMetric('TTI', {
          value: tti,
          id: 'custom-tti-' + Date.now(),
          navigationType: 'navigate'
        });
        
        isInteractive = true;
      }
    };
    
    // Verificar TTI cuando el DOM esté listo
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      setTimeout(checkInteractive, 0);
    } else {
      document.addEventListener('DOMContentLoaded', checkInteractive);
    }
  }

  /**
   * Métricas de memoria
   */
  trackMemoryMetrics() {
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = performance.memory;
        const memoryMetric = {
          used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
          total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
          limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) // MB
        };
        
        this.handleMetric('MEMORY', {
          value: memoryMetric.used,
          id: 'memory-' + Date.now(),
          details: memoryMetric
        });
      };
      
      // Verificar memoria cada 30 segundos
      setInterval(checkMemory, 30000);
      checkMemory(); // Primera verificación
    }
  }

  /**
   * Métricas de red
   */
  trackNetworkMetrics() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      this.handleMetric('NETWORK', {
        value: connection.downlink || 0,
        id: 'network-' + Date.now(),
        details: {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData
        }
      });
      
      // Escuchar cambios de conexión
      connection.addEventListener('change', () => {
        this.trackNetworkMetrics();
      });
    }
  }

  /**
   * Métricas de chunks (integración con chunkAnalyzer)
   */
  trackChunkMetrics() {
    // Verificar si existe el analyzer de chunks
    if (window.chunkAnalyzer) {
      const analyzer = window.chunkAnalyzer;
      
      // Crear métrica de rendimiento de chunks
      setInterval(() => {
        const stats = analyzer.getAllStats();
        if (stats.size > 0) {
          let totalTime = 0;
          let count = 0;
          
          stats.forEach(stat => {
            totalTime += stat.avg;
            count++;
          });
          
          const avgChunkTime = count > 0 ? totalTime / count : 0;
          
          this.handleMetric('CHUNK_LOAD', {
            value: avgChunkTime,
            id: 'chunk-' + Date.now(),
            details: { totalChunks: count, stats: Object.fromEntries(stats) }
          });
        }
      }, 60000); // Cada minuto
    }
  }

  /**
   * Inicializa Performance Observer para métricas adicionales
   */
  initPerformanceObserver() {
    // Observer para Long Tasks
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        const longTasks = list.getEntries();
        longTasks.forEach(task => {
          this.handleMetric('LONG_TASK', {
            value: task.duration,
            id: 'longtask-' + task.startTime,
            details: {
              startTime: task.startTime,
              duration: task.duration,
              name: task.name
            }
          });
        });
      });
      
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.warn('Long Task Observer not supported');
    }
    
    // Observer para Resource Timing
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        const resources = list.getEntries();
        const slowResources = resources.filter(resource => resource.duration > 1000);
        
        slowResources.forEach(resource => {
          this.handleMetric('SLOW_RESOURCE', {
            value: resource.duration,
            id: 'resource-' + Date.now(),
            details: {
              name: resource.name,
              duration: resource.duration,
              transferSize: resource.transferSize,
              type: resource.initiatorType
            }
          });
        });
      });
      
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.warn('Resource Observer not supported');
    }
  }

  /**
   * Log de métrica en consola (desarrollo)
   */
  logMetric(metric) {
    const emoji = {
      good: '✅',
      'needs-improvement': '⚠️',
      poor: '❌',
      unknown: '📊'
    }[metric.rating] || '📊';
    
    console.group(`${emoji} ${metric.name}: ${metric.value}${this.getUnit(metric.name)}`);
    console.log(`Rating: ${metric.rating}`);
    console.log(`Timestamp: ${new Date(metric.timestamp).toLocaleTimeString()}`);
    if (metric.details) {
      console.log('Details:', metric.details);
    }
    console.groupEnd();
  }

  /**
   * Obtiene la unidad de medida para una métrica
   */
  getUnit(metricName) {
    const units = {
      FCP: 'ms', LCP: 'ms', INP: 'ms', TTFB: 'ms', TTI: 'ms',
      CLS: '', MEMORY: 'MB', NETWORK: 'Mbps', CHUNK_LOAD: 'ms',
      LONG_TASK: 'ms', SLOW_RESOURCE: 'ms'
    };
    return units[metricName] || '';
  }

  /**
   * Guarda métrica en localStorage
   */
  saveToLocalStorage(metric) {
    this.storedMetrics.push(metric);
    
    // Mantener solo las últimas N métricas
    if (this.storedMetrics.length > this.config.reporting.maxEntries) {
      this.storedMetrics = this.storedMetrics.slice(-this.config.reporting.maxEntries);
    }
    
    localStorage.setItem('webVitalsMetrics', JSON.stringify(this.storedMetrics));
  }

  /**
   * Envía métrica a endpoint personalizado
   */
  async sendToEndpoint(metric) {
    if (!this.config.reporting.endpoint) return;
    
    try {
      await fetch(this.config.reporting.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...metric,
          url: window.location.href,
          userAgent: navigator.userAgent,
          sessionId: this.getSessionId()
        })
      });
    } catch (error) {
      console.warn('Failed to send metric to endpoint:', error);
    }
  }

  /**
   * Obtiene o crea un session ID
   */
  getSessionId() {
    let sessionId = sessionStorage.getItem('webVitalsSessionId');
    if (!sessionId) {
      sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('webVitalsSessionId', sessionId);
    }
    return sessionId;
  }

  /**
   * Registra un listener para cambios en métricas
   */
  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Notifica a todos los listeners
   */
  notifyListeners(metric) {
    this.listeners.forEach(listener => {
      try {
        listener(metric);
      } catch (error) {
        console.error('Error in metric listener:', error);
      }
    });
  }

  /**
   * Obtiene todas las métricas actuales
   */
  getAllMetrics() {
    return Object.fromEntries(this.metrics);
  }

  /**
   * Obtiene métricas almacenadas localmente
   */
  getStoredMetrics() {
    return this.storedMetrics || [];
  }

  /**
   * Genera un reporte de performance
   */
  generateReport() {
    const metrics = this.getAllMetrics();
    const stored = this.getStoredMetrics();
    
    return {
      current: metrics,
      history: stored,
      summary: this.generateSummary(metrics),
      recommendations: this.generateRecommendations(metrics)
    };
  }

  /**
   * Genera resumen de métricas
   */
  generateSummary(metrics) {
    const coreVitals = ['FCP', 'LCP', 'CLS', 'INP'];
    const summary = {
      coreVitalsScore: 0,
      totalMetrics: Object.keys(metrics).length,
      goodMetrics: 0,
      poorMetrics: 0
    };
    
    coreVitals.forEach(vital => {
      if (metrics[vital]) {
        if (metrics[vital].rating === 'good') {
          summary.coreVitalsScore += 25;
          summary.goodMetrics++;
        } else if (metrics[vital].rating === 'poor') {
          summary.poorMetrics++;
        }
      }
    });
    
    return summary;
  }

  /**
   * Genera recomendaciones basadas en métricas
   */
  generateRecommendations(metrics) {
    const recommendations = [];
    
    if (metrics.LCP?.rating === 'poor') {
      recommendations.push('Consider optimizing images and reducing server response times to improve LCP');
    }
    
    if (metrics.INP?.rating === 'poor') {
      recommendations.push('Reduce JavaScript execution time and optimize interaction responsiveness for better INP');
    }
    
    if (metrics.CLS?.rating === 'poor') {
      recommendations.push('Set explicit dimensions for images and avoid inserting content above existing elements');
    }
    
    if (metrics.MEMORY?.value > 100) {
      recommendations.push('Memory usage is high. Consider implementing memory cleanup strategies');
    }
    
    return recommendations;
  }
}

// Instancia global
export const webVitalsMonitor = new WebVitalsMonitor();

// Exponer globalmente para debugging
if (import.meta.env.DEV) {
  window.webVitalsMonitor = webVitalsMonitor;
}

export default webVitalsMonitor;
