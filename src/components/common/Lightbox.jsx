import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Lightbox.css';

const Lightbox = ({ images, open, current, setOpen, setCurrent }) => {
  if (!open) return null;
  const handleClose = () => setOpen(false);
  const prev = () => setCurrent(current === 0 ? images.length - 1 : current - 1);
  const next = () => setCurrent(current === images.length - 1 ? 0 : current + 1);
  return (
    <div className="lightbox-overlay" onClick={handleClose}>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close" onClick={handleClose}>&times;</button>
        <button className="lightbox-prev" onClick={prev}>&lt;</button>
        <img src={images[current].src} alt={images[current].alt} className="lightbox-img" loading="lazy" />
        <button className="lightbox-next" onClick={next}>&gt;</button>
      </div>
    </div>
  );
};

Lightbox.propTypes = {
  images: PropTypes.array.isRequired,
};

export default Lightbox;
