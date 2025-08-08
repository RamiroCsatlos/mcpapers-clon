/**
 * 🎯 FASE 3.2.3 - Hook para métricas de performance
 * Hook personalizado para integrar Web Vitals con componentes React
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { webVitalsMonitor } from '../utils/webVitals';

/**
 * Hook principal para métricas de performance
 */
export const usePerformanceMetrics = (options = {}) => {
  const [metrics, setMetrics] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const listenerRef = useRef(null);

  const {
    autoUpdate = true,
    includeHistory = false,
    generateSummary = true
  } = options;

  // Actualizar métricas cuando cambien
  useEffect(() => {
    if (!autoUpdate) return;

    // Listener para cambios en métricas
    const handleMetricUpdate = (newMetric) => {
      setMetrics(prev => ({
        ...prev,
        [newMetric.name]: newMetric
      }));
    };

    // Registrar listener
    listenerRef.current = webVitalsMonitor.addListener(handleMetricUpdate);

    // Obtener métricas iniciales
    const initialMetrics = webVitalsMonitor.getAllMetrics();
    setMetrics(initialMetrics);
    setIsLoading(false);

    // Limpiar listener al desmontar
    return () => {
      if (listenerRef.current) {
        listenerRef.current();
      }
    };
  }, [autoUpdate]);

  // Generar resumen cuando cambien las métricas
  useEffect(() => {
    if (generateSummary && Object.keys(metrics).length > 0) {
      const report = webVitalsMonitor.generateReport();
      setSummary(report.summary);
    }
  }, [metrics, generateSummary]);

  // Función para obtener métricas manualmente
  const refreshMetrics = useCallback(() => {
    const currentMetrics = webVitalsMonitor.getAllMetrics();
    setMetrics(currentMetrics);
    
    if (generateSummary) {
      const report = webVitalsMonitor.generateReport();
      setSummary(report.summary);
    }
  }, [generateSummary]);

  // Función para obtener reporte completo
  const getFullReport = useCallback(() => {
    return webVitalsMonitor.generateReport();
  }, []);

  // Función para obtener métricas históricas
  const getHistoricalMetrics = useCallback(() => {
    return webVitalsMonitor.getStoredMetrics();
  }, []);

  // Función para limpiar métricas almacenadas
  const clearStoredMetrics = useCallback(() => {
    localStorage.removeItem('webVitalsMetrics');
    if (includeHistory) {
      refreshMetrics();
    }
  }, [includeHistory, refreshMetrics]);

  return useMemo(() => ({
    metrics,
    summary,
    isLoading,
    refreshMetrics,
    getFullReport,
    getHistoricalMetrics,
    clearStoredMetrics
  }), [metrics, summary, isLoading, refreshMetrics, getFullReport, getHistoricalMetrics, clearStoredMetrics]);
};

/**
 * Hook específico para Core Web Vitals
 */
export const useCoreWebVitals = () => {
  const { metrics, summary, isLoading } = usePerformanceMetrics({
    generateSummary: true
  });

  // Extraer solo Core Web Vitals
  const coreVitals = useMemo(() => ({
    FCP: metrics.FCP || null,
    LCP: metrics.LCP || null,
    INP: metrics.INP || null,
    CLS: metrics.CLS || null,
    TTFB: metrics.TTFB || null
  }), [metrics.FCP, metrics.LCP, metrics.INP, metrics.CLS, metrics.TTFB]);

  // Calcular score general
  const score = summary?.coreVitalsScore || 0;
  
  // Determinar estado general
  const status = score >= 75 ? 'good' : score >= 50 ? 'needs-improvement' : 'poor';

  return useMemo(() => ({
    vitals: coreVitals,
    score,
    status,
    isLoading,
    hasAllVitals: Object.values(coreVitals).every(vital => vital !== null)
  }), [coreVitals, score, status, isLoading]);
};

/**
 * Hook para métricas de memoria
 */
export const useMemoryMetrics = () => {
  const [memoryInfo, setMemoryInfo] = useState(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Verificar soporte de Memory API
    if ('memory' in performance) {
      setIsSupported(true);
      
      const updateMemory = () => {
        const memory = performance.memory;
        setMemoryInfo({
          used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
          total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
          limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
          usagePercentage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)
        });
      };

      // Actualizar inmediatamente
      updateMemory();

      // Actualizar cada 10 segundos
      const interval = setInterval(updateMemory, 10000);

      return () => clearInterval(interval);
    } else {
      setIsSupported(false);
    }
  }, []);

  return useMemo(() => ({
    memoryInfo,
    isSupported,
    isHighUsage: memoryInfo ? memoryInfo.usagePercentage > 80 : false
  }), [memoryInfo, isSupported]);
};

/**
 * Hook para métricas de red
 */
export const useNetworkMetrics = () => {
  const [networkInfo, setNetworkInfo] = useState(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('connection' in navigator) {
      setIsSupported(true);
      
      const connection = navigator.connection;
      
      const updateNetwork = () => {
        setNetworkInfo({
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData,
          type: connection.type
        });
      };

      // Actualizar inmediatamente
      updateNetwork();

      // Escuchar cambios de conexión
      connection.addEventListener('change', updateNetwork);

      return () => {
        connection.removeEventListener('change', updateNetwork);
      };
    } else {
      setIsSupported(false);
    }
  }, []);

  // Clasificar calidad de conexión
  const connectionQuality = networkInfo ? (() => {
    if (networkInfo.effectiveType === '4g' && networkInfo.downlink > 10) return 'excellent';
    if (networkInfo.effectiveType === '4g') return 'good';
    if (networkInfo.effectiveType === '3g') return 'fair';
    return 'poor';
  })() : 'unknown';

  return useMemo(() => ({
    networkInfo,
    connectionQuality,
    isSupported,
    isSlow: networkInfo ? (networkInfo.effectiveType === '2g' || networkInfo.effectiveType === 'slow-2g') : false,
    saveData: networkInfo?.saveData || false
  }), [networkInfo, connectionQuality, isSupported]);
};

/**
 * Hook para alertas de performance
 */
export const usePerformanceAlerts = (thresholds = {}) => {
  const [alerts, setAlerts] = useState([]);
  const { metrics } = usePerformanceMetrics();
  const { memoryInfo } = useMemoryMetrics();

  // Umbrales por defecto
  const defaultThresholds = useMemo(() => ({
    LCP: 4000,
    INP: 300,
    CLS: 0.25,
    memoryUsage: 80,
    ...thresholds
  }), [thresholds]);

  useEffect(() => {
    const newAlerts = [];

    // Verificar LCP
    if (metrics.LCP && metrics.LCP.value > defaultThresholds.LCP) {
      newAlerts.push({
        type: 'warning',
        metric: 'LCP',
        message: `Largest Contentful Paint is slow (${metrics.LCP.value}ms)`,
        recommendation: 'Optimize images and reduce server response times'
      });
    }

    // Verificar INP
    if (metrics.INP && metrics.INP.value > defaultThresholds.INP) {
      newAlerts.push({
        type: 'error',
        metric: 'INP',
        message: `Interaction to Next Paint is poor (${metrics.INP.value}ms)`,
        recommendation: 'Reduce JavaScript execution time and optimize interactions'
      });
    }

    // Verificar CLS
    if (metrics.CLS && metrics.CLS.value > defaultThresholds.CLS) {
      newAlerts.push({
        type: 'warning',
        metric: 'CLS',
        message: `Cumulative Layout Shift is high (${metrics.CLS.value})`,
        recommendation: 'Set explicit dimensions for images'
      });
    }

    // Verificar memoria
    if (memoryInfo && memoryInfo.usagePercentage > defaultThresholds.memoryUsage) {
      newAlerts.push({
        type: 'warning',
        metric: 'MEMORY',
        message: `Memory usage is high (${memoryInfo.usagePercentage}%)`,
        recommendation: 'Implement memory cleanup strategies'
      });
    }

    setAlerts(newAlerts);
  }, [
    metrics.LCP?.value, 
    metrics.INP?.value, 
    metrics.CLS?.value, 
    memoryInfo?.usagePercentage, 
    defaultThresholds
  ]);

  return useMemo(() => ({
    alerts,
    hasAlerts: alerts.length > 0,
    criticalAlerts: alerts.filter(alert => alert.type === 'error').length
  }), [alerts]);
};

/**
 * Hook para tracking de performance de componentes específicos
 */
export const useComponentPerformance = (componentName) => {
  const [renderTimes, setRenderTimes] = useState([]);
  const renderStartTime = useRef(null);

  // Marcar inicio de render
  const startRender = useCallback(() => {
    renderStartTime.current = performance.now();
  }, []);

  // Marcar fin de render
  const endRender = useCallback(() => {
    if (renderStartTime.current) {
      const renderTime = performance.now() - renderStartTime.current;
      
      setRenderTimes(prev => {
        const newTimes = [...prev, {
          time: renderTime,
          timestamp: Date.now(),
          component: componentName
        }];
        
        // Mantener solo los últimos 50 renders
        return newTimes.slice(-50);
      });
      
      renderStartTime.current = null;
      
      // Log en desarrollo si el render es lento
      if (import.meta.env.DEV && renderTime > 50) {
        console.warn(`🐌 Slow render in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    }
  }, [componentName]);

  // Calcular estadísticas
  const stats = renderTimes.length > 0 ? {
    average: renderTimes.reduce((sum, r) => sum + r.time, 0) / renderTimes.length,
    max: Math.max(...renderTimes.map(r => r.time)),
    min: Math.min(...renderTimes.map(r => r.time)),
    count: renderTimes.length
  } : null;

  return {
    startRender,
    endRender,
    renderTimes,
    stats,
    isSlow: stats ? stats.average > 30 : false
  };
};

export default {
  usePerformanceMetrics,
  useCoreWebVitals,
  useMemoryMetrics,
  useNetworkMetrics,
  usePerformanceAlerts,
  useComponentPerformance
};
