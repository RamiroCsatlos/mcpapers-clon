
import React from 'react';
import '../../styles/main.css';
import '../../styles/nosotros.css';
import useInViewAnimation from '../../hooks/useInViewAnimation';
import '../../styles/ScrollAnimations.css';
import '../../components/GreenerPack.css';

import innovacionImg1 from '../../assets/greenerpackLogoColor.avif'; // Cambia por tu imagen
import innovacionImg2 from '../../assets/logosWebGreenerpack.avif'; // Cambia por tu imagen

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(() => window.innerWidth <= breakpoint);
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= breakpoint);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  return isMobile;
}

const innovacionList = [
  'Biodegradabilidad de todos los componentes.',
  'Compostabilidad del conjunto.',
  'Posibilidad de ser reciclable pre-consumo.',
  'Materias primas 100% de fuentes renovables.',
  'Perfluorados free.',
  'Metales pesados free.',
  'Plásticos o resinas sintéticas free.',
  'Los envases son "Grease proof" y resistentes a la humedad.',
  'Fluida y confiable cadena de abastecimiento.',
  'Productos certificados para contacto con alimentos por la jurisdiccional competente con validez nacional y Mercosur.',
  'Teflón free.',
];

export default function Innovacion() {
  const isMobile = useIsMobile(768);
  const { ref: h2Ref, inView: h2InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: img1Ref, inView: img1InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: textRef, inView: textInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: img2Ref, inView: img2InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: listRef, inView: listInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });

  // Divide la lista en dos columnas
  const mid = Math.ceil(innovacionList.length / 2);
  const col1 = innovacionList.slice(0, mid);
  const col2 = innovacionList.slice(mid);

  return (
    <section className="innovacion-section">
      <div className="greenerpack-bg">
        {/* SVGs grandes y decorativos igual que GreenerPack */}
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
      <section className="nosotros-section">
      <h2
        ref={h2Ref}
        className={`innovacion-title section-title fade-in-up${h2InView ? ' fade-in-visible' : ''}`}
      >
        Innovación
      </h2>
      <div className="innovacion-img-container">
        <img
          ref={img1Ref}
          src={innovacionImg1}
          alt="Innovación principal"
          className={`innovacion-img-1 fade-in-up${img1InView ? ' fade-in-visible' : ''}`}
        />
      </div>
      <div
        ref={textRef}
        className={`innovacion-text fade-in-up${textInView ? ' fade-in-visible' : ''}`}
      >
        Un coating interno para los wraps y flat bags que se realiza con ceras vegetales biodegradables 100% y cumple con las siguientes condiciones:
      </div>
      <div className="innovacion-img-container">
        <img
          ref={img2Ref}
          src={innovacionImg2}
          alt="Innovación secundaria"
          className={`innovacion-img-2 fade-in-up${img2InView ? ' fade-in-visible' : ''}`}
        />
      </div>
      <div
        ref={listRef}
        className={`innovacion-list-container fade-in-up${listInView ? ' fade-in-visible' : ''}`}
      >
        <div className="innovacion-list-columns">
          <ul>
            {col1.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <ul>
            {col2.map((item, idx) => (
              <li key={mid + idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      </section>
    </section>
  );
}
