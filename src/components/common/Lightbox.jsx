import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Lightbox.css';
import ArrowButton from './ArrowButton';

const Lightbox = ({ images, open, current, setOpen, setCurrent }) => {
  if (!open) return null;
  const handleClose = () => setOpen(false);
  const prev = () => setCurrent(current === 0 ? images.length - 1 : current - 1);
  const next = () => setCurrent(current === images.length - 1 ? 0 : current + 1);
  return (
    <div className="lightbox-overlay" onClick={handleClose}>
      <button className="lightbox-close" onClick={handleClose}>&times;</button>
      <ArrowButton direction="left" onClick={e => { e.stopPropagation(); prev(); }} className="lightbox-prev" ariaLabel="Anterior" />
      <img
        key={current}
        src={images[current].src}
        alt={images[current].alt}
        className="lightbox-img"
        loading="lazy"
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          margin: 'auto',
          display: 'block',
          boxShadow: 'none',
          background: 'none',
        }}
      />
      <ArrowButton direction="right" onClick={e => { e.stopPropagation(); next(); }} className="lightbox-next" ariaLabel="Siguiente" />
    </div>
  );
};

Lightbox.propTypes = {
  images: PropTypes.array.isRequired,
};

export default Lightbox;
