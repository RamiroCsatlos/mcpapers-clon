import './About.css';
import empresaImage from '../assets/foto-empresa.jpg';
import logoImage from '../assets/logo.png';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <div className="about-text">
          <img src={logoImage} alt="Logo" className="empresa-logo" />
          <p>
            <strong>Mc Paper’s Argentina S.A.</strong>, es una empresa dedicada a la producción de envases flexibles para la industria de la alimentación.
            <br>
            </br>
            Especializada en fast food packaging y en sugar confectionery.
          </p>
          <button className="ver-mas-btn">Ver más</button>
        </div>
        <div className="empresa-img-container">
          <div className="empresa-img-padding">
            <img src={empresaImage} alt="Empresa" className="empresa-img" />
          </div>
          <span className="badge top-left">Empresa líder del mercado</span>
          <span className="badge bottom-right">
            <span className="badge-number">
              <span className="badge-plus">+</span>33
            </span>
            <span className="badge-text">Años de experiencia</span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default About;
