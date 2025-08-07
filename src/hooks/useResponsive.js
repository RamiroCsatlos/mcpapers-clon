import { useState, useEffect } from 'react';

/**
 * Custom hook para detectar breakpoints responsive
 * @param {number} breakpoint - Ancho del breakpoint en px
 * @returns {boolean} - Si la pantalla es menor al breakpoint
 */
export const useResponsive = (breakpoint = 900) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return { isMobile, isDesktop: !isMobile };
};

export default useResponsive;
