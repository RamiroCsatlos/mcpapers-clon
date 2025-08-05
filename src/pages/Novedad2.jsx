import React from 'react';
import { Link } from 'react-router-dom';
import useInViewAnimation from '../hooks/useInViewAnimation';
import '../styles/main.css';
import '../styles/ScrollAnimations.css';
import '../styles/novedades.css';

// Import image for novedad2
import img2 from '../assets/instagram2.jpg';

export default function Novedad2() {
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
          Nuevas Tecnologías Implementadas
        </h1>
        
        <img src={img2} alt="Nuevas tecnologías MCPapers" className="novedad-article-img" />
        
        <div className="novedad-article-content">
          <p>
            MCPapers ha implementado nuevas tecnologías de vanguardia en sus procesos 
            de producción, mejorando significativamente la calidad y eficiencia de 
            nuestros productos de packaging.
          </p>
          
          <p>
            Estas innovaciones incluyen sistemas de control de calidad automatizados, 
            nuevos procesos de impresión de alta precisión y tecnologías de 
            sustentabilidad que reducen nuestro impacto ambiental.
          </p>
          
          <p>
            La inversión en tecnología nos permite ofrecer a nuestros clientes 
            productos de mayor calidad, tiempos de entrega más rápidos y soluciones 
            más sostenibles para sus necesidades de packaging.
          </p>
        </div>
      </article>
    </main>
  );
}
