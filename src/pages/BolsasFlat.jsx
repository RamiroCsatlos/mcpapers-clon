import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageGallery from '../components/common/ImageGallery/ImageGallery';
import { useState } from 'react';
import { bolsasFlatImages } from '../constants/galleryImages';
import Lightbox from '../components/common/Lightbox';
import useInViewAnimation from '../hooks/useInViewAnimation';
import '../styles/BolsasFlat.css';
import '../styles/main.css';
import '../styles/ScrollAnimations.css';

const BolsasFlat = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const handleImageClick = (idx) => {
    setCurrentImg(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="bolsas-flat-page">
      <main>
        {(() => {
          const { ref, className: animClass } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
          return (
            <h1 ref={ref} className={`page-title fade-in-up ${animClass}`}>Bolsas Flat</h1>
          );
        })()}
        <div className="bolsas-flat-gallery-wrapper">
          <div className="bolsas-flat-gallery gallery gallery-2">
            {bolsasFlatImages.map((img, idx) => {
              const { ref, className: animClass } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
              return (
                <div
                  key={idx}
                  ref={ref}
                  className={`gallery-item scale-in animation-delay-${(idx + 1) * 200} ${animClass}`}
                  onClick={() => handleImageClick(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="gallery-image"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
        {lightboxOpen && (
          <Lightbox
            images={bolsasFlatImages}
            open={lightboxOpen}
            current={currentImg}
            setOpen={setLightboxOpen}
            setCurrent={setCurrentImg}
          />
        )}
      </main>
    </div>
  );
};

export default BolsasFlat;
