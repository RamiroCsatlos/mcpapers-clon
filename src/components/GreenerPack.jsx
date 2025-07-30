        <div>
          {/* Garabatos extra suaves y randoms */}
          <svg className="doodle doodle-7" viewBox="0 0 80 40" fill="none">
            <path d="M10,20 Q40,10 70,20 Q40,30 10,20 Z" stroke="#eaf7e2" stroke-width="3" fill="none"/>
          </svg>
          <svg className="doodle doodle-8" viewBox="0 0 60 60" fill="none">
            <ellipse cx="30" cy="30" rx="25" ry="10" stroke="#d6f5d6" stroke-width="2.5" fill="none"/>
          </svg>
          <svg className="doodle doodle-9" viewBox="0 0 100 40" fill="none">
            <path d="M10,20 Q30,5 50,20 Q70,35 90,20" stroke="#f5f3e7" stroke-width="2.5" fill="none"/>
          </svg>
          <svg className="doodle doodle-10" viewBox="0 0 50 50" fill="none">
            <circle cx="25" cy="25" r="18" stroke="#eaf7e2" stroke-width="2" fill="none"/>
          </svg>
        </div>
import './GreenerPack.css';
import './ScrollAnimations.css';
import { useInView } from 'react-intersection-observer';
import greenerImg from '../assets/greenerpackLogoColor.png';

const GreenerPack = () => {
  const { ref: logoRef, inView: logoInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const { ref: textRef, inView: textInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section className="greenerpack-section">
      <div className="greenerpack-bg">
        {/* Garabatos decorativos SVG */}
        <svg className="doodle doodle-1" viewBox="0 0 80 80" fill="none">
          <path d="M10,40 Q40,10 70,40 Q40,70 10,40 Z" stroke="#d6f5d6" strokeWidth="4" fill="none"/>
        </svg>
        <svg className="doodle doodle-2" viewBox="0 0 100 60" fill="none">
          <path d="M10,30 Q50,10 90,30 Q50,50 10,30 Z" stroke="#f5f3e7" strokeWidth="3" fill="none"/>
        </svg>
        <svg className="doodle doodle-3" viewBox="0 0 60 40" fill="none">
          <path d="M10,20 Q30,0 50,20 Q30,40 10,20 Z" stroke="#b7e3b7" strokeWidth="2" fill="none"/>
        </svg>
        {/* Garabatos extra con formas nuevas, colores suaves y trazos gruesos */}
        <svg className="doodle doodle-4" viewBox="0 0 100 60" fill="none">
          <path d="M10,30 Q50,5 90,30 Q50,55 10,30 Z" stroke="#eaf7e2" strokeWidth="6" fill="none"/>
          <ellipse cx="50" cy="30" rx="22" ry="12" stroke="#eaf7e2" strokeWidth="4" fill="none"/>
        </svg>
        <svg className="doodle doodle-5" viewBox="0 0 70 70" fill="none">
          <path d="M35,10 Q60,35 35,60 Q10,35 35,10 Z" stroke="#f7f7e2" strokeWidth="7" fill="none"/>
          <circle cx="35" cy="35" r="12" stroke="#eaf7e2" strokeWidth="5" fill="none"/>
        </svg>
        <svg className="doodle doodle-6" viewBox="0 0 130 50" fill="none">
          <path d="M10,25 Q65,0 120,25 Q65,50 10,25 Z" stroke="#eaf7e2" strokeWidth="6" fill="none"/>
          <rect x="55" y="15" width="20" height="20" rx="10" stroke="#f7f7e2" strokeWidth="4" fill="none"/>
        </svg>
        {/* Garabatos extra suaves y randoms */}
        <svg className="doodle doodle-7" viewBox="0 0 80 40" fill="none">
          <path d="M10,20 Q40,10 70,20 Q40,30 10,20 Z" stroke="#eaf7e2" strokeWidth="3" fill="none"/>
        </svg>
        <svg className="doodle doodle-8" viewBox="0 0 60 60" fill="none">
          <ellipse cx="30" cy="30" rx="25" ry="10" stroke="#d6f5d6" strokeWidth="2.5" fill="none"/>
        </svg>
        <svg className="doodle doodle-9" viewBox="0 0 100 40" fill="none">
          <path d="M10,20 Q30,5 50,20 Q70,35 90,20" stroke="#f5f3e7" strokeWidth="2.5" fill="none"/>
        </svg>
        <svg className="doodle doodle-10" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="18" stroke="#eaf7e2" strokeWidth="2" fill="none"/>
        </svg>
      </div>
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