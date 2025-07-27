import './Equipamiento.css';
import './ScrollAnimations.css';
import { useInView } from 'react-intersection-observer';

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
    link: '/equipamiento/control-calidad'
  },
  {
    id: 2,
    title: 'Técnica',
    image: tecnica,
    badge: 'Técnica',
    link: '/equipamiento/tecnica'
  },
  {
    id: 3,
    title: 'Tecnología',
    image: tecnologia,
    badge: 'Tecnología',
    link: '/equipamiento/tecnologia'
  }
];

function Equipamiento() {
  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section className="equipamiento-section">
      <a href="/ruta-del-producto" className="title-link">
        <h2 
          ref={titleRef}
          className={`equipamiento-title fade-in-up ${titleInView ? 'fade-in-visible' : ''}`}
        >
          Equipamiento
        </h2>
      </a>
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
                <a href={equipo.link} className="equipo-image-link">
                  <img src={equipo.image} alt={equipo.title} className="equipo-image" />
                </a>
                <div className="equipo-badge">{equipo.badge}</div>
              </div>
              <div className="equipo-info">
                <button className="equipo-ver-mas-btn">Ver más</button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Equipamiento;
