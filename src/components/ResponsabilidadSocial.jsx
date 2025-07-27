import React from 'react';
import './ResponsabilidadSocial.css';
import './ScrollAnimations.css';
import { useInView } from 'react-intersection-observer';
// Importar las imágenes
import responsabilidadSocial1 from '../assets/responsabilidadSocial1.avif';
import responsabilidadSocial2 from '../assets/responsabilidadSocial2.avif';
import responsabilidadSocial3 from '../assets/responsabilidadSocial3.avif';
import responsabilidadSocial4 from '../assets/responsabilidadSocial4.avif';

const ResponsabilidadSocial = () => {
  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const images = [
    {
      src: responsabilidadSocial1,
      alt: 'Responsabilidad Social 1',
      link: '#responsabilidad-1'
    },
    {
      src: responsabilidadSocial2,
      alt: 'Responsabilidad Social 2',
      link: '#responsabilidad-2'
    },
    {
      src: responsabilidadSocial3,
      alt: 'Responsabilidad Social 3',
      link: '#responsabilidad-3'
    },
    {
      src: responsabilidadSocial4,
      alt: 'Responsabilidad Social 4',
      link: '#responsabilidad-4'
    }
  ];

  return (
    <section className="responsabilidad-social">
      <div className="responsabilidad-social-container">
        <a href="/ruta-del-producto" className="title-link">
          <h2 
            ref={titleRef}
            className={`responsabilidad-social-title fade-in-up ${titleInView ? 'fade-in-visible' : ''}`}
          >
            Responsabilidad Social
          </h2>
        </a>
        <div className="responsabilidad-social-gallery">
          {images.map((image, index) => {
            // Hook individual para cada imagen de responsabilidad social
            const { ref: imageRef, inView: imageInView } = useInView({
              threshold: 0.2,
              triggerOnce: true
            });

            return (
              <a 
                key={index}
                href={image.link}
                ref={imageRef}
                className={`gallery-item gallery-item-${index + 1} scale-in animation-delay-${(index + 1) * 200} ${imageInView ? 'fade-in-visible' : ''}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="gallery-image"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResponsabilidadSocial;
