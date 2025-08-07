import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useIsMobile from '../hooks/useIsMobile';

/**
 * Componente de imagen optimizada con lazy loading avanzado
 * Incluye soporte para WebP/AVIF, placeholder, progressive loading
 */
const LazyImage = ({
  // Props básicas de imagen
  src,
  alt,
  className = '',
  style = {},
  
  // Props de lazy loading
  threshold = 0.1,
  rootMargin = '200px',
  
  // Props de optimización
  webpSrc = null, // Versión WebP si está disponible
  avifSrc = null, // Versión AVIF si está disponible
  placeholder = null, // Imagen placeholder de baja calidad
  blurHash = null, // BlurHash string para placeholder
  
  // Props de responsive
  srcSet = '',
  sizes = '',
  
  // Props de loading
  progressive = false, // Carga progresiva (placeholder -> baja calidad -> alta calidad)
  showLoader = true,
  loaderComponent = null,
  
  // Props de error
  fallbackSrc = null,
  onLoad = () => {},
  onError = () => {},
  
  // Props adicionales
  eager = false, // Cargar inmediatamente (para imágenes above-the-fold)
  priority = 'normal', // 'high', 'normal', 'low'
  
  ...props
}) => {
  const isMobile = useIsMobile();
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);

  // Configuración del intersection observer
  const { ref, inView } = useInView({
    threshold,
    rootMargin: isMobile ? '100px' : rootMargin,
    triggerOnce: true,
    skip: eager // Si es eager, no usar intersection observer
  });

  // Determinar la mejor fuente de imagen
  const getBestImageSrc = () => {
    // Verificar soporte de formatos modernos
    if (avifSrc && supportsFormat('image/avif')) {
      return avifSrc;
    }
    if (webpSrc && supportsFormat('image/webp')) {
      return webpSrc;
    }
    return src;
  };

  // Función para verificar soporte de formato
  const supportsFormat = (mimeType) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL(mimeType).indexOf('data:' + mimeType) === 0;
  };

  // Efecto para cargar la imagen
  useEffect(() => {
    if ((inView || eager) && !isLoaded && !isLoading) {
      setIsLoading(true);
      loadImage();
    }
  }, [inView, eager, isLoaded, isLoading]);

  const loadImage = async () => {
    try {
      const imageSrc = getBestImageSrc();
      
      if (progressive && placeholder) {
        // Carga progresiva: placeholder ya está mostrado
        await loadImageSrc(imageSrc);
      } else {
        // Carga normal
        await loadImageSrc(imageSrc);
      }
      
      setCurrentSrc(imageSrc);
      setIsLoaded(true);
      setIsLoading(false);
      onLoad();
    } catch (error) {
      handleImageError(error);
    }
  };

  const loadImageSrc = (imageSrc) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${imageSrc}`));
      
      // Configurar srcset si está disponible
      if (srcSet) img.srcset = srcSet;
      if (sizes) img.sizes = sizes;
      
      img.src = imageSrc;
    });
  };

  const handleImageError = (error) => {
    setHasError(true);
    setIsLoading(false);
    
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    } else {
      onError(error);
    }
  };

  // Componente de loader por defecto
  const DefaultLoader = () => (
    <div 
      className="lazy-image-loader"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        color: '#999'
      }}
    >
      <div style={{ fontSize: '0.8rem' }}>📷</div>
    </div>
  );

  // Estilos del contenedor
  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    ...style
  };

  // Estilos de la imagen
  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: isLoaded ? 'opacity 0.3s ease-in-out' : 'none',
    opacity: isLoaded ? 1 : (placeholder || blurHash) ? 0.8 : 0,
    filter: isLoading && !isLoaded ? 'blur(2px)' : 'none'
  };

  // Combinar refs
  const combinedRef = (el) => {
    imgRef.current = el;
    ref(el);
  };

  return (
    <div 
      ref={combinedRef}
      className={`lazy-image-container ${className}`}
      style={containerStyle}
      data-priority={priority}
      data-loaded={isLoaded}
      data-loading={isLoading}
    >
      {/* Mostrar loader si está cargando y no hay placeholder */}
      {isLoading && !placeholder && showLoader && (
        loaderComponent || <DefaultLoader />
      )}

      {/* Imagen principal */}
      {(inView || eager || isLoaded) && (
        <img
          ref={imgRef}
          src={currentSrc || src}
          alt={alt}
          style={imageStyle}
          onLoad={() => {
            if (!isLoaded) {
              setIsLoaded(true);
              setIsLoading(false);
              onLoad();
            }
          }}
          onError={handleImageError}
          loading={eager ? 'eager' : 'lazy'}
          {...props}
        />
      )}

      {/* Placeholder para BlurHash o imagen de fondo */}
      {!isLoaded && blurHash && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml;base64,${btoa(`
              <svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f0f0f0"/>
                <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#ccc" font-family="Arial" font-size="12">
                  ${alt || 'Imagen'}
                </text>
              </svg>
            `)}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
            transform: 'scale(1.1)',
            opacity: 0.6
          }}
        />
      )}

      {/* Estado de error */}
      {hasError && !fallbackSrc && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f8f8',
            color: '#999',
            fontSize: '0.8rem',
            textAlign: 'center',
            padding: '1rem'
          }}
        >
          <div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚠️</div>
            <div>Error al cargar imagen</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
