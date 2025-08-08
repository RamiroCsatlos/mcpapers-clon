import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import '../../styles/Lightbox.css';
import ArrowButton from './ArrowButton';

const Lightbox = ({ images, open, current, setOpen, setCurrent }) => {
  // Prevenir scroll del body cuando lightbox está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.left = '0';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      // Forzar reflow en móviles
      document.body.offsetHeight;
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [open]);

  if (!open) return null;
  
  const handleClose = () => setOpen(false);
  const prev = () => setCurrent(current === 0 ? images.length - 1 : current - 1);
  const next = () => setCurrent(current === images.length - 1 ? 0 : current + 1);
  
  const lightboxContent = (
    <div className="lightbox-overlay" onClick={handleClose}>
      <button className="lightbox-close" onClick={handleClose}>&times;</button>
      <ArrowButton direction="left" onClick={e => { e.stopPropagation(); prev(); }} className="lightbox-prev" ariaLabel="Anterior" />
      <img
        key={current}
        src={images[current].src}
        alt={images[current].alt}
        className="lightbox-img"
        onClick={(e) => e.stopPropagation()}
        onLoad={() => {
          // Forzar reflow cuando la imagen carga en móviles
          if (window.innerWidth <= 768) {
            document.body.offsetHeight;
          }
        }}
      />
      <ArrowButton direction="right" onClick={e => { e.stopPropagation(); next(); }} className="lightbox-next" ariaLabel="Siguiente" />
    </div>
  );
  
  // Renderizar en un portal al final del body para evitar conflictos de z-index
  return createPortal(lightboxContent, document.body);
};

Lightbox.propTypes = {
  images: PropTypes.array.isRequired,
};

export default Lightbox;
