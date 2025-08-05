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
  const { ref: articleRef, inView: articleInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });

  return (
    <main className="novedad-main">
      <Link to="/novedades" className="novedad-back">← Volver a Novedades</Link>
      
      <article
        ref={articleRef}
        className={`novedad-article fade-in-up${articleInView ? ' fade-in-visible' : ''}`}
      >
        <h1
          ref={h2Ref}
          className={`novedad-article-title fade-in-up${h2InView ? ' fade-in-visible' : ''}`}
        >
          Reconocimiento en la Industria
        </h1>
        
        <img src={img1} alt="Reconocimiento MCPapers" className="novedad-article-img" />
        
        <div className="novedad-article-content">
          <p>
            MCPapers ha sido reconocida como una de las empresas líderes en innovación 
            dentro del sector del packaging sostenible. Este reconocimiento destaca 
            nuestro compromiso continuo con la excelencia y la sustentabilidad.
          </p>
          
          <p>
            Nuestro enfoque en tecnologías avanzadas y procesos respetuosos con el 
            medio ambiente nos ha posicionado como referentes en la industria. 
            Este logro es el resultado del trabajo dedicado de todo nuestro equipo.
          </p>
          
          <p>
            Seguimos comprometidos con la innovación y la calidad, buscando siempre 
            nuevas formas de mejorar nuestros productos y servicios para nuestros clientes.
          </p>
        </div>
      </article>
    </main>
  );
}
