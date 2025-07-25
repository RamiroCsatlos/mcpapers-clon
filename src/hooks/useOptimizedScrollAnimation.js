import { useState, useRef, useEffect } from 'react';

const useOptimizedScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
    delay = 0,
    animationType = 'fadeInUp',
    loadDelay = 100 // Delay adicional para carga
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
          // Primero marcamos como visible para cargar el contenido
          setTimeout(() => {
            setIsVisible(true);
            setIsLoaded(true);
          }, loadDelay);
          
          // Luego aplicamos la animación
          setTimeout(() => {
            setHasAnimated(true);
          }, delay + loadDelay);
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
          setHasAnimated(false);
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
  }, [threshold, rootMargin, triggerOnce, delay, loadDelay, hasAnimated]);

  // Generar clases CSS dinámicamente
  const getAnimationClasses = () => {
    const baseClass = 'scroll-animate';
    const typeClass = `animate-${animationType}`;
    const visibleClass = hasAnimated ? 'is-visible' : '';
    
    return `${baseClass} ${typeClass} ${visibleClass}`.trim();
  };

  return [elementRef, getAnimationClasses(), isVisible, isLoaded, hasAnimated];
};

export default useOptimizedScrollAnimation;
