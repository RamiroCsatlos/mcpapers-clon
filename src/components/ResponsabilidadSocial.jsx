import React from 'react';
import './ResponsabilidadSocial.css';
import '../styles/scrollAnimations.css';
import useScrollAnimation from '../hooks/useScrollAnimation';
// Importar las imágenes
import responsabilidadSocial1 from '../assets/responsabilidadSocial1.avif';
import responsabilidadSocial2 from '../assets/responsabilidadSocial2.avif';
import responsabilidadSocial3 from '../assets/responsabilidadSocial3.avif';
import responsabilidadSocial4 from '../assets/responsabilidadSocial4.avif';

const ResponsabilidadSocial = () => {
  const [titleRef, titleClasses] = useScrollAnimation({ 
    animationType: 'titleSlide', 
    delay: 100 
  });

  const [galleryRef, galleryClasses] = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 200 
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
        <h2 ref={titleRef} className={`responsabilidad-social-title ${titleClasses}`}>Responsabilidad Social</h2>
        <div ref={galleryRef} className={`responsabilidad-social-gallery ${galleryClasses}`}>
          {images.map((image, index) => (
            <a 
              key={index}
              href={image.link}
              className={`gallery-item gallery-item-${index + 1}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="gallery-image"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResponsabilidadSocial;
