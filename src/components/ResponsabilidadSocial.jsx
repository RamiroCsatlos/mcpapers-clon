import React from 'react';
import './ResponsabilidadSocial.css';
// Importar las imágenes
import responsabilidadSocial1 from '../assets/responsabilidadSocial1.avif';
import responsabilidadSocial2 from '../assets/responsabilidadSocial2.avif';
import responsabilidadSocial3 from '../assets/responsabilidadSocial3.avif';
import responsabilidadSocial4 from '../assets/responsabilidadSocial4.avif';

const ResponsabilidadSocial = () => {
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
        <h2 className="responsabilidad-social-title">Responsabilidad Social</h2>
        <div className="responsabilidad-social-gallery">
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
