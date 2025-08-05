import React from 'react';
import { Link } from 'react-router-dom';
import useInViewAnimation from '../hooks/useInViewAnimation';
import '../styles/main.css';
import '../styles/ScrollAnimations.css';
import '../styles/novedades.css';

// Import images for novedades
import img1 from '../assets/reconocimiento.avif';
import img2 from '../assets/instagram2.jpg';

export default function Novedades() {
  const { ref: h2Ref, inView: h2InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: sectionRef, inView: sectionInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });

  return (
    <main className="novedades-main">
      <h2
        ref={h2Ref}
        className={`novedades-title section-title fade-in-up${h2InView ? ' fade-in-visible' : ''}`}
      >
        Novedades
      </h2>
      
      <section
        ref={sectionRef}
        className={`novedades-section fade-in-up${sectionInView ? ' fade-in-visible' : ''}`}
      >
        <p className="novedades-intro">
          Mantente al día con las últimas noticias y desarrollos de MCPapers.
        </p>
        
        <div className="novedades-grid">
          <Link to="/novedad1" className="novedad-card">
            <img src={img1} alt="Novedad 1" className="novedad-img" />
            <div className="novedad-content">
              <h3 className="novedad-title">Reconocimiento en la Industria</h3>
              <p className="novedad-preview">
                Descubre cómo MCPapers ha sido reconocida por su excelencia en la industria del packaging...
              </p>
              <span className="novedad-link">Leer más →</span>
            </div>
          </Link>
          
          <Link to="/novedad2" className="novedad-card">
            <img src={img2} alt="Novedad 2" className="novedad-img" />
            <div className="novedad-content">
              <h3 className="novedad-title">Nuevas Tecnologías Implementadas</h3>
              <p className="novedad-preview">
                Conoce las últimas tecnologías que hemos implementado para mejorar nuestros procesos...
              </p>
              <span className="novedad-link">Leer más →</span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}