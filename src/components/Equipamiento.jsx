import './Equipamiento.css';
import '../styles/scrollAnimations.css';
import useScrollAnimation from '../hooks/useScrollAnimation';

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
  const [titleRef, titleClasses] = useScrollAnimation({ 
    animationType: 'titleSlide', 
    delay: 100 
  });

  // Crear hooks para cada equipo fuera del map
  const [equipo0Ref, equipo0Classes] = useScrollAnimation({ 
    animationType: 'bounceIn', 
    delay: 200 
  });
  
  const [equipo1Ref, equipo1Classes] = useScrollAnimation({ 
    animationType: 'bounceIn', 
    delay: 400 
  });
  
  const [equipo2Ref, equipo2Classes] = useScrollAnimation({ 
    animationType: 'bounceIn', 
    delay: 600 
  });

  const equipoRefs = [equipo0Ref, equipo1Ref, equipo2Ref];
  const equipoClasses = [equipo0Classes, equipo1Classes, equipo2Classes];

  return (
    <section className="equipamiento-section">
      <h2 ref={titleRef} className={`equipamiento-title ${titleClasses}`}>Equipamiento</h2>
      <div className="equipamiento-gallery">
        {equipos.map((equipo, index) => (
          <div ref={equipoRefs[index]} className={`equipo-card ${equipoClasses[index]}`} key={equipo.id}>
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
        ))}
      </div>
    </section>
  );
}

export default Equipamiento;
