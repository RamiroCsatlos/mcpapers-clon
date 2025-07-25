import React from 'react';
import useLazyImage from '../hooks/useLazyImage';
import '../styles/loadingOptimizations.css';

const LazyImage = ({ 
  src, 
  alt, 
  placeholder, 
  className = '', 
  style = {},
  ...props 
}) => {
  const [setRef, imageSrc, loaded] = useLazyImage(src, placeholder);

  const imageClass = `lazy-image ${loaded ? 'loaded' : 'loading'} ${className}`;

  return (
    <img
      ref={setRef}
      src={imageSrc}
      alt={alt}
      className={imageClass}
      style={style}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
};

export default LazyImage;
