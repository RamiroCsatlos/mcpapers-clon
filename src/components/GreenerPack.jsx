import './GreenerPack.css';
import './ScrollAnimations.css';
import { useInView } from 'react-intersection-observer';
import greenerImg from '../assets/greenerpackLogoColor.png';

const GreenerPack = () => {
  const { ref: logoRef, inView: logoInView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const { ref: textRef, inView: textInView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  return (
    <section className="greenerpack-section">
      <div className="greenerpack-bg" />
      <div className="greenerpack-content">
        <div 
          ref={logoRef}
          className={`greenerpack-img-container scale-in ${logoInView ? 'fade-in-visible' : ''}`}
        >
          <a href="/">
              <img src={greenerImg} alt="GreenerPack" className="greenerpack-img" />
          </a>
        </div>
        <div 
          ref={textRef}
          className={`greenerpack-text fade-in-up animation-delay-200 ${textInView ? 'fade-in-visible' : ''}`}
        >
          <p>
              Un coating interno para los wraps y flat bags que se realiza con   ceras vegetales biodegradables 100% 
          </p>
        </div>
      </div>
    </section>
  );
};

export default GreenerPack;