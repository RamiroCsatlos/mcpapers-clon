import React from 'react';
import './ResponsabilidadSocial.css';
import './ScrollAnimations.css';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';

// Importar las imágenes
import responsabilidadSocial1 from '../assets/responsabilidadSocial1.avif';
import responsabilidadSocial2 from '../assets/responsabilidadSocial2.avif';
import responsabilidadSocial3 from '../assets/responsabilidadSocial3.avif';
import responsabilidadSocial4 from '../assets/responsabilidadSocial4.avif';

const ResponsabilidadSocial = () => {
  const isMobile = useIsMobile(900);
  
  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const images = [
    {
      src: responsabilidadSocial1,
      alt: 'Responsabilidad Social 1',
      link: '/responsabilidad-social'
    },
    {
      src: responsabilidadSocial2,
      alt: 'Responsabilidad Social 2',
      link: '/responsabilidad-social'
    },
    {
      src: responsabilidadSocial3,
      alt: 'Responsabilidad Social 3',
      link: '/responsabilidad-social'
    },
    {
      src: responsabilidadSocial4,
      alt: 'Responsabilidad Social 4',
      link: '/responsabilidad-social'
    }
  ];

  return (
    <section className="responsabilidad-social">
      <div className="responsabilidad-social-container">
        <Link to="/responsabilidad-social" className="title-link">
          <h2 
            ref={titleRef}
            className={`responsabilidad-social-title fade-in-up ${titleInView ? 'fade-in-visible' : ''}`}
          >
            Responsabilidad Social
          </h2>
        </Link>
        <div className="responsabilidad-social-gallery">
          {isMobile ? (
            // Layout móvil con orden específico y imágenes 3-4 agrupadas
            <>
              {/* Imagen 2 primero */}
              {(() => {
                const { ref: imageRef, inView: imageInView } = useInView({
                  threshold: 0.2,
                  triggerOnce: true
                });
                return (
                  <Link 
                    to={images[1].link}
                    ref={imageRef}
                    className={`gallery-item gallery-item-2 scale-in animation-delay-200 ${imageInView ? 'fade-in-visible' : ''}`}
                  >
                    <img
                      src={images[1].src}
                      alt={images[1].alt}
                      className="gallery-image"
                    />
                  </Link>
                );
              })()}
              
              {/* Contenedor para imágenes 3 y 4 juntas */}
              <div className="mobile-images-row">
                {[images[2], images[3]].map((image, index) => {
                  const actualIndex = index + 2; // Para mantener los índices correctos
                  const { ref: imageRef, inView: imageInView } = useInView({
                    threshold: 0.2,
                    triggerOnce: true
                  });
                  return (
                    <Link 
                      key={actualIndex}
                      to={image.link}
                      ref={imageRef}
                      className={`gallery-item gallery-item-${actualIndex + 1} scale-in animation-delay-${(actualIndex + 1) * 200} ${imageInView ? 'fade-in-visible' : ''}`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="gallery-image"
                      />
                    </Link>
                  );
                })}
              </div>
              
              {/* Imagen 1 al final */}
              {(() => {
                const { ref: imageRef, inView: imageInView } = useInView({
                  threshold: 0.2,
                  triggerOnce: true
                });
                return (
                  <Link 
                    to={images[0].link}
                    ref={imageRef}
                    className={`gallery-item gallery-item-1 scale-in animation-delay-800 ${imageInView ? 'fade-in-visible' : ''}`}
                  >
                    <img
                      src={images[0].src}
                      alt={images[0].alt}
                      className="gallery-image"
                    />
                  </Link>
                );
              })()}
            </>
          ) : (
            // Layout desktop original
            images.map((image, index) => {
              const { ref: imageRef, inView: imageInView } = useInView({
                threshold: 0.2,
                triggerOnce: true
              });

              return (
                <Link 
                  key={index}
                  to={image.link}
                  ref={imageRef}
                  className={`gallery-item gallery-item-${index + 1} scale-in animation-delay-${(index + 1) * 200} ${imageInView ? 'fade-in-visible' : ''}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="gallery-image"
                  />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default ResponsabilidadSocial;
