import React from 'react';
import './ResponsabilidadSocial.css';
import './ScrollAnimations.css';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
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
          {images.map((image, index) => {
            // Hook individual para cada imagen de responsabilidad social
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
          })}
        </div>
      </div>
    </section>
  );
};

export default ResponsabilidadSocial;
