import { Link } from 'react-router-dom';
import useInViewAnimation from '../hooks/useInViewAnimation';
import '../styles/main.css';
import '../styles/ScrollAnimations.css';
import '../styles/novedades.css';

// Import images for novedades
import img1 from '../assets/reconocimiento.avif';
import img2 from '../assets/instagram2.jpg';

export default function Novedades() {
  const { ref: sectionRef, inView: sectionInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });

  return (
    <main className="novedades-main">
      <section
        ref={sectionRef}
        className={`novedades-section fade-in-up${sectionInView ? ' fade-in-visible' : ''}`}
      >
        <div className="novedades-grid">
          <Link to="/novedad1" className="novedad-container">
            <img src={img1} alt="Novedad 1" className="novedad-img" />
            <h3 className="novedad-subtitle">Industria</h3>
            <h2 className="novedad-title">Reconocimiento en la Industria</h2>
            <p className="novedad-text">
              Descubre cómo MCPapers ha sido reconocida por su excelencia en la industria del packaging sostenible. Este reconocimiento destaca nuestro compromiso continuo con la innovación y la sustentabilidad.
            </p>
          </Link>
          
          <Link to="/novedad2" className="novedad-container">
            <img src={img2} alt="Novedad 2" className="novedad-img" />
            <h3 className="novedad-subtitle">Tecnología</h3>
            <h2 className="novedad-title">Nuevas Tecnologías Implementadas</h2>
            <p className="novedad-text">
              Conoce las últimas tecnologías que hemos implementado para mejorar nuestros procesos de producción, incluyendo sistemas automatizados y soluciones más sostenibles.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}