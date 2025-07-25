import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const LazySection = ({ children, threshold = 0.1, rootMargin = '100px' }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    rootMargin, // Cargar 100px antes de que el elemento sea visible
    triggerOnce: true, // Solo cargar una vez
  });

  useEffect(() => {
    if (inView) {
      setShouldLoad(true);
    }
  }, [inView]);

  return (
    <div ref={ref}>
      {shouldLoad ? children : <div style={{ minHeight: '200px' }}></div>}
    </div>
  );
};

export default LazySection;
