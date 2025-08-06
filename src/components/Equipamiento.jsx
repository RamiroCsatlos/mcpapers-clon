import './Equipamiento.css';
import './ScrollAnimations.css';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

// Importar las imágenes de equipamiento
import controlDeCalidad from '../assets/controlDeCalidad.avif';
import tecnica from '../assets/técnica.avif';
import tecnologia from '../assets/tecnología.avif';

const equipos = [
  {
    id: 1,
    title: 'Control de Calidad',
    image: controlDeCalidad,
    badge: 'Control de Calidad',
    link: '/control-calidad'
  },
  {
    id: 2,
    title: 'Técnica',
    image: tecnica,
    badge: 'Técnica',
    link: '/tecnica'
  },
  {
    id: 3,
    title: 'Tecnología',
    image: tecnologia,
    badge: 'Tecnología',
    link: '/tecnologia'
  }
];

function Equipamiento() {
  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section className="equipamiento-section">
      <Link to="/equipamiento" className="title-link">
        <h2 
          ref={titleRef}
          className={`equipamiento-title fade-in-up ${titleInView ? 'fade-in-visible' : ''}`}
        >
          Equipamiento
        </h2>
      </Link>
      <div className="equipamiento-gallery">
        {equipos.map((equipo, idx) => {
          // Hook individual para cada tarjeta de equipo
          const { ref: equipoRef, inView: equipoInView } = useInView({
            threshold: 0.2,
            triggerOnce: true
          });

          return (
            <div 
              ref={equipoRef}
              className={`equipo-card scale-in animation-delay-${(idx + 1) * 200} ${equipoInView ? 'fade-in-visible' : ''}`} 
              key={equipo.id}
            >
              <div className="equipo-image-container">
                <Link to={equipo.link} className="equipo-image-link">
                  <img src={equipo.image} alt={equipo.title} className="equipo-image" />
                </Link>
                <div className="equipo-badge">{equipo.badge}</div>
              </div>
              <div className="equipo-info">
                <Link to={equipo.link} className="equipo-ver-mas-btn">Ver más</Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Equipamiento;
