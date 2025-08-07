import { useEffect } from 'react';

/**
 * Hook para precargar imágenes críticas
 * Útil para imágenes above-the-fold y recursos importantes
 */
const useImagePreloader = (imageSources = [], priority = 'normal') => {
  useEffect(() => {
    if (!imageSources.length) return;

    const preloadImages = async () => {
      const promises = imageSources.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = () => reject(new Error(`Failed to preload: ${src}`));
          img.src = src;
        });
      });

      try {
        await Promise.all(promises);
        console.log(`✅ Preloaded ${imageSources.length} images with priority: ${priority}`);
      } catch (error) {
        console.warn('⚠️ Some images failed to preload:', error.message);
      }
    };

    // Retrasar la precarga según la prioridad
    const delay = {
      high: 0,
      normal: 100,
      low: 500
    }[priority] || 100;

    const timeoutId = setTimeout(preloadImages, delay);

    return () => clearTimeout(timeoutId);
  }, [imageSources, priority]);
};

/**
 * Componente para precargar imágenes críticas
 * Se usa típicamente en App.jsx para precargar recursos importantes
 */
const ImagePreloader = ({ 
  images = [], 
  priority = 'normal',
  onComplete = () => {},
  onError = () => {} 
}) => {
  useEffect(() => {
    if (!images.length) return;

    const preloadWithCallback = async () => {
      try {
        const promises = images.map((src) => {
          const img = new Image();
          return new Promise((resolve, reject) => {
            img.onload = () => resolve(src);
            img.onerror = () => reject(new Error(`Failed to preload: ${src}`));
            img.src = src;
          });
        });

        await Promise.all(promises);
        onComplete();
      } catch (error) {
        onError(error);
      }
    };

    preloadWithCallback();
  }, [images, onComplete, onError]);

  return null; // Este componente no renderiza nada
};

export default ImagePreloader;
export { useImagePreloader };
