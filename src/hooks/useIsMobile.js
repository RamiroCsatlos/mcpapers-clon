import { useState, useEffect } from 'react';

/**
 * Custom hook para detectar si la pantalla es mobile/tablet
 * Optimizado con throttling y manejo de SSR
 * @param {number} breakpoint - Ancho del breakpoint en px (default: 900)
 * @returns {boolean} - Si la pantalla es menor o igual al breakpoint
 */
export const useIsMobile = (breakpoint = 900) => {
  // Inicialización segura para SSR
  const [isMobile, setIsMobile] = useState(() => {
    // Solo acceder a window en el cliente
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    // Verificación de disponibilidad de window
    if (typeof window === 'undefined') return;

    let timeoutId = null;

    const handleResize = () => {
      // Throttling para optimizar performance
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= breakpoint);
      }, 100); // 100ms de throttling
    };

    // Verificación inicial
    setIsMobile(window.innerWidth <= breakpoint);
    
    // Listener optimizado
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
