import { useInView } from 'react-intersection-observer';

/**
 * Custom hook para animaciones con IntersectionObserver
 * @param {Object} options - Opciones de configuración
 * @returns {Object} - Ref y estado de visibilidad
 */
export const useInViewAnimation = (options = {}) => {
  const defaultOptions = {
    threshold: 0.2,
    triggerOnce: false,
    rootMargin: '50px',
    ...options
  };

  const { ref, inView } = useInView(defaultOptions);

  return {
    ref,
    inView,
    className: inView ? 'fade-in-visible' : ''
  };
};

export default useInViewAnimation;
