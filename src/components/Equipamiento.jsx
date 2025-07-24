import './Equipamiento.css';

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
  return (
    <section className="equipamiento-section">
      <h2 className="equipamiento-title">Equipamiento</h2>
      <div className="equipamiento-gallery">
        {equipos.map((equipo) => (
          <div className="equipo-card" key={equipo.id}>
            <div className="equipo-image-container">
              <a href={equipo.link} className="equipo-image-link">
                <img src={equipo.image} alt={equipo.title} className="equipo-image" />
              </a>
              <div className="equipo-badge">{equipo.badge}</div>
            </div>
            <div className="equipo-info">
              <h3 className="equipo-title">{equipo.title}</h3>
              <button className="equipo-ver-mas-btn">Ver más</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Equipamiento;
