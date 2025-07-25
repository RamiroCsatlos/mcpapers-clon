import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = false, // Cambiado a false para permitir repetir animaciones
    delay = 0,
    animationType = 'fadeInUp'
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        } else if (!triggerOnce && !entry.isIntersecting) {
          // Pequeño retraso antes de quitar la animación para suavizar la transición
          setTimeout(() => {
            setIsVisible(false);
          }, 100);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated]);

  // Generar clases CSS dinámicamente
  const getAnimationClasses = () => {
    const baseClass = 'scroll-animate';
    const typeClass = `animate-${animationType}`;
    const visibleClass = isVisible ? 'is-visible' : '';
    
    return `${baseClass} ${typeClass} ${visibleClass}`.trim();
  };

  return [elementRef, getAnimationClasses(), isVisible];
};

export default useScrollAnimation;
