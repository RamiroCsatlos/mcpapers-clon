import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../styles/GalleryLightbox.css';

const GalleryLightbox = ({ images, columns = 2 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const goToPrev = () => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goToNext = () => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className={`gallery-grid columns-${columns}`}>
      {images.map((img, idx) => (
        <div className="gallery-item" key={idx} onClick={() => openLightbox(idx)}>
          <LazyLoadImage
            src={img.src}
            alt={img.alt}
            effect="blur"
            className="gallery-img"
          />
        </div>
      ))}
      {isOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
            <button className="lightbox-prev" onClick={goToPrev}>&lt;</button>
            <LazyLoadImage
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              effect="blur"
              className="lightbox-img"
            />
            <button className="lightbox-next" onClick={goToNext}>&gt;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryLightbox;
