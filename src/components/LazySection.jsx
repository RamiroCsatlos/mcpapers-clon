import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import useIsMobile from '../hooks/useIsMobile';

/**
 * Hook optimizado para lazy loading con prioridades y precarga inteligente
 * @param {Object} options - Configuraciones avanzadas
 * @returns {Object} - Estado de carga y referencias
 */
export const useLazyLoad = ({
  // Configuración de intersección
  threshold = 0.1,
  rootMargin = '200px',
  
  // Configuraciones avanzadas
  priority = 'normal', // 'high', 'normal', 'low'
  preloadThreshold = '400px', // Distancia para precarga
  enablePreload = true,
  
  // Configuraciones específicas por dispositivo
  mobileRootMargin = '100px',
  
  // Configuraciones de rendimiento
  fallbackHeight = 200,
  animateIn = true,
  
  // Callbacks
  onLoad = () => {},
  onError = () => {}
} = {}) => {
  const isMobile = useIsMobile();
  const [shouldLoad, setShouldLoad] = useState(false);
  const [shouldPreload, setShouldPreload] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Configuración optimizada según dispositivo
  const config = useMemo(() => ({
    threshold,
    rootMargin: isMobile ? mobileRootMargin : rootMargin,
    triggerOnce: true
  }), [threshold, rootMargin, mobileRootMargin, isMobile]);

  // Configuración para precarga
  const preloadConfig = useMemo(() => ({
    threshold: 0,
    rootMargin: preloadThreshold,
    triggerOnce: true
  }), [preloadThreshold]);

  const { ref: loadRef, inView: shouldLoadView } = useInView(config);
  const { ref: preloadRef, inView: shouldPreloadView } = useInView(enablePreload ? preloadConfig : { threshold: 0 });

  // Memoizar callbacks para evitar bucles infinitos
  const memoizedOnLoad = useCallback(onLoad, []);
  const memoizedOnError = useCallback(onError, []);

  // Efectos de carga principal
  useEffect(() => {
    if (shouldLoadView && !shouldLoad) {
      setShouldLoad(true);
      setTimeout(() => {
        setHasLoaded(true);
        memoizedOnLoad();
      }, priority === 'high' ? 0 : priority === 'normal' ? 50 : 100);
    }
  }, [shouldLoadView, shouldLoad, priority, memoizedOnLoad]);

  // Efectos de precarga
  useEffect(() => {
    if (shouldPreloadView && enablePreload && !shouldPreload) {
      setShouldPreload(true);
    }
  }, [shouldPreloadView, enablePreload, shouldPreload]);

  // Manejo de errores
  const handleError = (error) => {
    setHasError(true);
    memoizedOnError(error);
  };

  // Combinamos las refs
  const combinedRef = (el) => {
    loadRef(el);
    if (enablePreload) preloadRef(el);
  };

  return {
    ref: combinedRef,
    shouldLoad,
    shouldPreload,
    hasLoaded,
    hasError,
    isVisible: shouldLoadView,
    config: {
      fallbackHeight: isMobile ? fallbackHeight * 0.7 : fallbackHeight,
      animateIn,
      priority
    },
    handleError
  };
};

/**
 * Componente LazySection mejorado con configuraciones avanzadas
 */
const LazySection = ({
  children,
  priority = 'normal',
  enablePreload = true,
  fallbackHeight = 200,
  loadingComponent,
  errorComponent,
  animateIn = true,
  className = '',
  style = {},
  onLoad = () => {},
  onError = () => {},
  ...lazyOptions
}) => {
  const {
    ref,
    shouldLoad,
    shouldPreload,
    hasLoaded,
    hasError,
    config,
    handleError
  } = useLazyLoad({
    priority,
    enablePreload,
    fallbackHeight,
    onLoad,
    onError,
    ...lazyOptions
  });

  // Componente de loading por defecto
  const DefaultLoader = () => (
    <div 
      className="lazy-section-loader"
      style={{
        minHeight: `${config.fallbackHeight}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'loading-shimmer 1.5s infinite',
        borderRadius: '4px',
        margin: '1rem 0'
      }}
    >
      <div style={{ 
        color: '#666', 
        fontSize: '0.9rem',
        opacity: 0.7
      }}>
        Cargando...
      </div>
    </div>
  );

  // Componente de error por defecto
  const DefaultError = () => (
    <div 
      className="lazy-section-error"
      style={{
        minHeight: `${config.fallbackHeight}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#e74c3c',
        border: '1px solid #fadbd8',
        borderRadius: '4px',
        padding: '2rem',
        margin: '1rem 0',
        backgroundColor: '#fdf2f2'
      }}
    >
      <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
        ⚠️ Error al cargar contenido
      </div>
      <button 
        onClick={() => window.location.reload()}
        style={{
          padding: '0.5rem 1rem',
          background: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Recargar página
      </button>
    </div>
  );

  // CSS de animación inline
  const animationStyle = config.animateIn && hasLoaded ? {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
  } : config.animateIn ? {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
  } : {};

  return (
    <>
      {/* CSS de animación inyectado */}
      <style>{`
        @keyframes loading-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .lazy-section-priority-high { z-index: 100; }
        .lazy-section-priority-normal { z-index: 50; }
        .lazy-section-priority-low { z-index: 10; }
      `}</style>

      <div 
        ref={ref}
        className={`lazy-section lazy-section-priority-${priority} ${className}`}
        style={{ ...style, ...animationStyle }}
        data-priority={priority}
        data-preload={enablePreload}
      >
        {hasError ? (
          errorComponent || <DefaultError />
        ) : shouldLoad ? (
          <React.Suspense 
            fallback={loadingComponent || <DefaultLoader />}
          >
            {children}
          </React.Suspense>
        ) : (
          loadingComponent || <DefaultLoader />
        )}
      </div>
    </>
  );
};

export default LazySection;
