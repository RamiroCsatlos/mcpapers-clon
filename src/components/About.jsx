import './About.css';
import '../styles/ScrollAnimations.css';
import useInViewAnimation from '../hooks/useInViewAnimation';
import empresaImage from '../assets/foto-empresa.jpg';
import logoImage from '../assets/logo.png';

const About = () => {
  const { ref: textRef, className: textAnimClass } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: imageRef, className: imageAnimClass } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="about-section">
      <div className="about-content">
        <div 
          ref={textRef}
          className={`about-text fade-in-up ${textAnimClass}`}
        >
          <img src={logoImage} alt="Logo" className="empresa-logo" />
          <p>
            <strong>Mc Paper's Argentina S.A.</strong>, es una empresa dedicada a la producción de envases flexibles para la industria de la alimentación.
            <br>
            </br>
            Especializada en fast food packaging y en sugar confectionery.
          </p>
          <button className="ver-mas-btn">Ver más</button>
        </div>
        <div 
          ref={imageRef}
          className={`empresa-img-container scale-in animation-delay-200 ${imageAnimClass}`}
        >
          <div className="empresa-img-padding">
            <a href="/sobre-nosotros" className="empresa-img-link">
              <img src={empresaImage} alt="Empresa" className="empresa-img" />
            </a>
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
