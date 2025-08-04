import React from 'react';
import '../../styles/main.css';
import '../../styles/nosotros.css';
import useInViewAnimation from '../../hooks/useInViewAnimation';
import '../../styles/ScrollAnimations.css';

import certificadosH from '../../assets/certificadosH.avif';
import certificadosV from '../../assets/certificadosV.avif';

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

export default function Certificaciones() {
  const isMobile = useIsMobile(768);
  const { ref: h2Ref, inView: h2InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: imgRef, inView: imgInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: textRef, inView: textInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="nosotros-section">
      <h2
        ref={h2Ref}
        className={`section-title fade-in-up${h2InView ? ' fade-in-visible' : ''}`}
      >
        Certificaciones
      </h2>
      <div
        ref={textRef}
        className={`certificaciones-text fade-in-up${textInView ? ' fade-in-visible' : ''}`}
      >
        <p>
          McPaper's Argentina S.A. es una empresa dedicada a generar valor a través del desarrollo, fabricación y comercialización de materiales de excelencia utilizados para conservar, transportar y/o contener alimentos, bajo los más altos estándares mundiales.
        </p>
        <p>
          Nos enfocamos en el cumplimiento de los requerimientos y lograr la satisfacción de nuestros clientes, garantizando los niveles de calidad, seguridad y eficacia de los productos suministrados, y el cumplimiento de los requisitos legales y reglamentarios. Mediante la aplicación de esta política aseguramos de manera sostenida que nuestros productos alcanzan la prestación para la cual han sido diseñados, cubriendo dicho diseño aspectos estéticos, técnicos, funcionales y de seguridad alimentaria.
        </p>
        <p>
          Todo esto lo llevamos adelante aplicando una estrategia de mejora continua e implementando las acciones necesarias para asegurar el mantenimiento de la efectividad de nuestro sistema de gestión. Reconocemos el valor de los recursos humanos que conforman nuestra organización, brindándoles la formación y asistencia necesarias, como así también de nuestros proveedores, vitales para asegurar nuestro cumplimiento.
        </p>
      </div>
      <div className="certificaciones-img-container">
        <img
          ref={imgRef}
          src={isMobile ? certificadosV : certificadosH}
          alt="Certificaciones"
          className={`certificaciones-img fade-in-up${imgInView ? ' fade-in-visible' : ''}`}
        />
      </div>
    </section>
  );
}