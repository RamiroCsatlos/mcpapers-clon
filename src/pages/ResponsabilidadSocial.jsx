import React, { useState } from 'react';
import useInViewAnimation from '../hooks/useInViewAnimation';
import Lightbox from '../components/common/Lightbox';
import '../styles/main.css';
import '../styles/ScrollAnimations.css';
import '../styles/responsabilidadSocial.css';

import rSocial0 from '../assets/responsabilidadSocial1.avif';
import rSocialBanner from '../assets/rSocialBanner.avif';
import rSocial1a from '../assets/rSocial1a.avif';
import rSocial1b from '../assets/rSocial1b.avif';
import rSocial1c from '../assets/rSocial1c.avif';
import rSocial2a from '../assets/rSocial2a.avif';
import rSocial2b from '../assets/rSocial2b.avif';
import rSocial2c from '../assets/rSocial2c.avif';
import rSocial2d from '../assets/rSocial2d.avif';
import rSocial2e from '../assets/rSocial2e.avif';
import rSocial2f from '../assets/rSocial2f.avif';
import rSocial2g from '../assets/rSocial2g.avif';
import rSocial2h from '../assets/rSocial2h.avif';
import rSocial3 from '../assets/rSocial3.avif';


// Gallery images for responsabilidadSocial
const rSocialImages = [
  { src: rSocial0, alt: 'La casa de Ronald McDonald' },
  { src: rSocial1a, alt: 'Banner' },
  { src: rSocial1b, alt: 'Imagen 1B' },
  { src: rSocial1c, alt: 'Imagen 1C' },
  { src: rSocial2a, alt: 'Imagen 2A' },
  { src: rSocial2b, alt: 'Imagen 2B' },
  { src: rSocial2c, alt: 'Imagen 2C' },
  { src: rSocial2d, alt: 'Imagen 2D' },
  { src: rSocial2e, alt: 'Imagen 2E' },
  { src: rSocial2f, alt: 'Imagen 2F' },
  { src: rSocial2g, alt: 'Imagen 2G' },
  { src: rSocial2h, alt: 'Imagen 2H' },
  { src: rSocial3, alt: 'Imagen 3' }
];

export default function RSocial() {
  // Solo las 8 imágenes de la galería
  const galleryImages = [
    { src: rSocial2a, alt: 'Imagen 2A' },
    { src: rSocial2b, alt: 'Imagen 2B' },
    { src: rSocial2c, alt: 'Imagen 2C' },
    { src: rSocial2d, alt: 'Imagen 2D' },
    { src: rSocial2e, alt: 'Imagen 2E' },
    { src: rSocial2f, alt: 'Imagen 2F' },
    { src: rSocial2g, alt: 'Imagen 2G' },
    { src: rSocial2h, alt: 'Imagen 2H' }
  ];
  const { ref: h2Ref, inView: h2InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: contentRef, inView: contentInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const handleImageClick = (idx) => {
    setCurrentImg(idx);
    setLightboxOpen(true);
  };
  return (
    <main className="rSocial-main">
      <article
        ref={contentRef}
        className={`rSocial-single-column fade-in-up${contentInView ? ' fade-in-visible' : ''}`}
      >
        {/* Título principal */}
        <h2
          ref={h2Ref}
          className={`rSocial-title-main section-title fade-in-up${h2InView ? ' fade-in-visible' : ''}`}
        >
          Responsabilidad Social
        </h2>
        {/* Imagen principal (La casa de Ronald McDonald) */}
        <img src={rSocial0} alt="La casa de Ronald McDonald" className="rSocial-image-secondary" loading="lazy" />
        {/* Imagen banner más grande */}
        <img src={rSocialBanner} alt="Banner Responsabilidad Social" className="rSocial-image-banner" loading="lazy" />
        {/* Dos textos */}
        <p className="rSocial-text-regular">
          Nuestra colaboración con la Casa Ronald McDonald en Argentina es un pilar fundamental de nuestro compromiso social. Juntos, trabajamos para brindar apoyo a las familias de niños enfermos, ofreciendo un espacio acogedor y lleno de esperanza. A través de diversas iniciativas y actividades, buscamos no solo proporcionar recursos y asistencia, sino también crear un ambiente donde las familias puedan encontrar consuelo y acompañamiento. 
        </p>
        <p className="rSocial-text-regular">
          Nuestro equipo se involucra en eventos y donaciones, promoviendo la importancia de la solidaridad y la empatía. Creemos firmemente que, al unir fuerzas, podemos marcar una diferencia significativa en la vida de estos niños y sus seres queridos. La Casa Ronald McDonald se convierte así en un símbolo de amor y apoyo, y nos sentimos orgullosos de ser parte de esta noble causa. Juntos, continuamos trabajando para hacer de esta experiencia un camino más llevadero y esperanzador.
        </p>
        {/* Fila de 3 imágenes */}
        <div className="rSocial-row-images">
          <img src={rSocial1a} alt="Banner" className="rSocial-row-image" loading="lazy" />
          <img src={rSocial1b} alt="Imagen 1B" className="rSocial-row-image" loading="lazy" />
          <img src={rSocial1c} alt="Imagen 1C" className="rSocial-row-image" loading="lazy" />
        </div>
        {/* Segundo título */}
        <h3 className="rSocial-title-section">Sala Familiar</h3>
        {/* Sección con 3 párrafos y una imagen */}
        <div className="rSocial-section-columns">
          <div className="rSocial-section-texts">
            <p>Nos enorgullece apadrinar la ¨Sala de Padres¨ en La Sala Familiar de La Casa de Ronald Mc Donald en el Hospital de niños ¨Sor María Ludovica¨.</p>
            <p>La Sala Familiar de La Plata fue inaugurada en diciembre de 2017, y se encuentra en el primer piso del Hospital Sor María Ludovica. La misma ofrece un lugar de descanso, contención y distensión diario a las mamás y los papás de los niños que se encuentran internados en las salas de Neonatología, Terapia Intensiva Pediátrica, Terapia Intensiva Cardiovascular del hospital Ludovica. Además, recibimos a las familias que aquellos niños que se encuentran en cirugía, brindándoles un espacio de tranquilidad en la espera y facilitando el acceso a la información de los mismos a través de un sistema articulado con el personal de quirófano, a partir del cual pueden hacer un seguimiento de la cirugía.</p>
            <p>La Sala tiene capacidad para 75 personas, y desde su apertura ya han pasado los padres de más de 4.600 niños internados. El espacio cuenta con 300 m2, y varias comodidades para hacer más llevadero el paso de sus hijos por el hospital. Algunas de ellas son: lavadero, duchas, cocina, lockers, living, computadoras con internet, sala de capacitación y dictado de talleres informativos y recreativos. Los talleres son realizados por profesionales del hospital, voluntarios y asociaciones amigas.</p>
          </div>
          <div className="rSocial-section-image">
            <img src={rSocial2a} alt="Imagen 2A" loading="lazy" />
          </div>
        </div>
        {/* Galería 2x4 con lightbox */}
        <div className="rSocial-gallery">
          {galleryImages.map((img, idx) => {
            const { ref: imgRef, inView: imgInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
            return (
              <div
                key={idx}
                ref={imgRef}
                className={`rSocial-gallery-item fade-in-up${imgInView ? ' fade-in-visible' : ''}`}
                onClick={() => handleImageClick(idx)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="rSocial-gallery-image"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
        {/* Tercer título y una imagen */}
        <h3 className="rSocial-title-end">Premio Compassion & Care 2023</h3>
        <img src={rSocial3} alt="Imagen 3" className="rSocial-image-end" loading="lazy" />
      </article>
      {/* Lightbox para galería */}
      {lightboxOpen && (
        <Lightbox
          images={galleryImages}
          open={lightboxOpen}
          current={currentImg}
          setOpen={setLightboxOpen}
          setCurrent={setCurrentImg}
        />
      )}
    </main>
  );
}