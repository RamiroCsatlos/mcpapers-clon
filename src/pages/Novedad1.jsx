import React from 'react';
import { Link } from 'react-router-dom';
import useInViewAnimation from '../hooks/useInViewAnimation';
import '../styles/main.css';
import '../styles/ScrollAnimations.css';
import '../styles/novedades.css';

// Import image for novedad1
import img1 from '../assets/reconocimiento.avif';

export default function Novedad1() {
  const { ref: h2Ref, inView: h2InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: contentRef, inView: contentInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });

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
          Reconocimiento Gestión de Calidad 2024
        </h2>
        
        <h3 className="novedad-subtitle-main">
          PREMIOS
        </h3>
        
        <h3 className="novedad-subtitle-main">
          6/25/2025 ° 1 min leer
        </h3>
        
        <div className="novedad-separator"></div>
        
        <p className="novedad-text-bold">
          ¡Un logro que nos llena de orgullo!
        </p>
        
        <p className="novedad-text-regular">
          Queremos compartir con ustedes que hemos sido reconocidos por nuestra destacada gestión de calidad, un hito que reafirma nuestro compromiso con la excelencia en cada proceso, servicio que ofrecemos y brindar la máxima calidad.
        </p>
        
        <p className="novedad-text-regular">
          Nos sentimos profundamente agradecidos por este logro, que nos impulsa a seguir innovando y mejorando día a día.
        </p>
        
        <img src={img1} alt="Reconocimiento MCPapers" className="novedad-image-main" />
      </article>
    </main>
  );
}
