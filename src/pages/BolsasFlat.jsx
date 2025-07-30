import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageGallery from '../components/common/ImageGallery/ImageGallery';
import { useState } from 'react';
import { bolsasFlatImages } from '../constants/galleryImages';
import Lightbox from '../components/common/Lightbox';
import '../styles/BolsasFlat.css';

const BolsasFlat = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const handleImageClick = (idx) => {
    setCurrentImg(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="bolsas-flat-page">
      <Header />
      <main>
        <h1 className="bolsas-flat-title">Bolsas Flat</h1>
        <div className="bolsas-flat-gallery gallery gallery-2">
          {bolsasFlatImages.map((img, idx) => (
            <div
              key={idx}
              className="gallery-item"
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
          ))}
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
      <Footer />
    </div>
  );
};

export default BolsasFlat;
