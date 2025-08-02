
import React from 'react';
import '../../styles/main.css';
import '../../styles/nosotros.css';
import useInViewAnimation from '../../hooks/useInViewAnimation';
import '../../styles/ScrollAnimations.css';

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
  'Primera oración de la lista de innovaciones.',
  'Segunda oración destacando un logro.',
  'Tercera oración sobre tecnología.',
  'Cuarta oración sobre sostenibilidad.',
  'Quinta oración sobre calidad.',
  'Sexta oración sobre servicio.',
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
      <h2
        ref={h2Ref}
        className={`innovacion-title fade-in-up${h2InView ? ' fade-in-visible' : ''}`}
      >
        Innovación
      </h2>
      <div className="innovacion-img-container">
        <img
          ref={img1Ref}
          src={innovacionImg1}
          alt="Innovación principal"
          className={`innovacion-img fade-in-up${img1InView ? ' fade-in-visible' : ''}`}
        />
      </div>
      <div
        ref={textRef}
        className={`innovacion-text fade-in-up${textInView ? ' fade-in-visible' : ''}`}
      >
        Texto descriptivo sobre la innovación y el compromiso de la empresa con la mejora continua, tecnología y sostenibilidad.
      </div>
      <div className="innovacion-img-container">
        <img
          ref={img2Ref}
          src={innovacionImg2}
          alt="Innovación secundaria"
          className={`innovacion-img fade-in-up${img2InView ? ' fade-in-visible' : ''}`}
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
  );
}
