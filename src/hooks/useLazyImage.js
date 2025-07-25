import { useState, useRef, useEffect } from 'react';

const useLazyImage = (src, placeholder = null) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState();
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    let observer;
    
    if (imgRef.current && imageSrc !== src) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Precargar la imagen
              const imageLoader = new Image();
              imageLoader.src = src;
              
              imageLoader.onload = () => {
                setImageSrc(src);
                setLoaded(true);
              };
              
              imageLoader.onerror = () => {
                console.warn(`Error loading image: ${src}`);
                setLoaded(true); // Marcar como cargado incluso si falla
              };
              
              observer.unobserve(imgRef.current);
            }
          });
        },
        {
          rootMargin: '50px'
        }
      );
      
      observer.observe(imgRef.current);
    }
    
    return () => {
      if (observer && observer.unobserve) {
        observer.disconnect();
      }
    };
  }, [src, imageSrc]);

  const setRef = node => {
    imgRef.current = node;
    setImageRef(node);
  };

  return [setRef, imageSrc, loaded];
};

export default useLazyImage;
