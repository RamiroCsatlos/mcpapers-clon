import React, { useState } from 'react';
import useInViewAnimation from '../hooks/useInViewAnimation';
import Lightbox from '../components/common/Lightbox';
import '../styles/main.css';
import '../styles/ScrollAnimations.css';
import '../styles/novedades.css';

// Import images for novedad2 gallery
import novedad2a from '../assets/novedad2a.jpeg';
import novedad2b from '../assets/instagram2.jpg';
import novedad2c from '../assets/novedad2c.jpeg';

// Gallery images for novedad2
const novedad2Images = [
  { src: novedad2a, alt: 'Foto de Evento 1' },
  { src: novedad2b, alt: 'Foto de Evento 2' },
  { src: novedad2c, alt: 'Foto de Evento 3' },
];

export default function Novedad2() {
  const { ref: h2Ref, inView: h2InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: contentRef, inView: contentInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const handleImageClick = (idx) => {
    setCurrentImg(idx);
    setLightboxOpen(true);
  };

  return (
    <main className="novedad-main">
      <article
        ref={contentRef}
        className={`novedad-single-column fade-in-up${contentInView ? ' fade-in-visible' : ''}`}
      >
        <h2
          ref={h2Ref}
          className={`novedad-title-main fade-in-up${h2InView ? ' fade-in-visible' : ''}`}
        >
          2° Edición de La Noche Solidaria de Alsea
        </h2>
        
        <h3 className="novedad-subtitle-main">
          EVENTOS
        </h3>
        
        <h3 className="novedad-subtitle-main">
          10/2/2024 ° 1 min leer
        </h3>
        
        <div className="novedad-separator"></div>
        
        <p className="novedad-text-regular">
          La noche del 7 de noviembre participamos de la 2da edición de La Noche Solidaria de Alsea, una noche solidaria en la que, junto a 350 invitados y más de 40 empresas, acompañamos a Alsea en su compromiso con la Fundación CONIN y el Banco de Alimentos Buenos Aires. 
        </p>
        
        <p className="novedad-text-regular">
          McPaper's Argentina participó como Sponsor Platino, y tuvo el honor de recibir la distinción al compromiso humanitario. Nuestro CEO y fundador, Carlos Wini Morchio, subió a recibir la placa de la mano de Santiago Farinati, Director General Alsea Sudamerica.
        </p>
        
        <p className="novedad-text-regular">
          Esperamos poder renovar nuestro compromiso año a año, haciendo nuestro aporte para lograr siempre el mayor impacto positivo.
        </p>
        
        <div className="novedad-gallery">
          {novedad2Images.map((img, idx) => {
            const { ref: imgRef, inView: imgInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
            return (
              <div
                key={idx}
                ref={imgRef}
                className={`novedad-gallery-item novedad-gallery-item-${idx + 1} fade-in-up${imgInView ? ' fade-in-visible' : ''}`}
                onClick={() => handleImageClick(idx)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="novedad-gallery-image"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </article>
      
      {lightboxOpen && (
        <Lightbox
          images={novedad2Images}
          open={lightboxOpen}
          current={currentImg}
          setOpen={setLightboxOpen}
          setCurrent={setCurrentImg}
        />
      )}
    </main>
  );
}
