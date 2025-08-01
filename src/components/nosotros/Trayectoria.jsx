import React from 'react';
import '../../styles/main.css';
import '../../styles/nosotros.css';
import useInViewAnimation from '../../hooks/useInViewAnimation';
import '../../styles/ScrollAnimations.css';

import trayectoriaH from '../../assets/trayectoriaH.avif';
import trayectoriaV from '../../assets/trayectoriaV.avif';

// Hook para detectar si es mobile
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


export default function Trayectoria() {
  const isMobile = useIsMobile(768);
  // Animación para el título y la imagen
  const { ref: h2Ref, inView: h2InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: imgRef, inView: imgInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });

  // Helper para cada item de la línea de tiempo
  function TimelineItem({ title, year, text }) {
    const { ref: h3Ref, inView: h3InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
    const { ref: h4Ref, inView: h4InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
    const { ref: pRef, inView: pInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
    return (
      <div className="trayectoria-item">
        <h3 ref={h3Ref} className={`h3-title fade-in-up${h3InView ? ' fade-in-visible' : ''}`}>{title}</h3>
        <h4 ref={h4Ref} className={`h4-title fade-in-up${h4InView ? ' fade-in-visible' : ''}`}>{year}</h4>
        <p ref={pRef} className={`fade-in-up${pInView ? ' fade-in-visible' : ''}`}>{text}</p>
      </div>
    );
  }

  return (
    <section className="nosotros-section">
      <h2 ref={h2Ref} className={`section-title fade-in-up${h2InView ? ' fade-in-visible' : ''}`}>Trayectoria</h2>
      <img
        ref={imgRef}
        src={isMobile ? trayectoriaV : trayectoriaH}
        alt="Trayectoria"
        className={`trayectoriaH-image fade-in-up${imgInView ? ' fade-in-visible' : ''}`}
      />
      <TimelineItem
        title="INICIÓ DE MC PAPER´S"
        year="1991"
        text="En mayo de 1991 se emprende este desafío, en el cual nos iniciamos en una planta ubicada en Martínez con 800m2, donde se procesaban 1000 toneladas de envases al año."
      />
      <TimelineItem
        title="ESPECIALIZACIÓN FAST FOOD"
        year="1996"
        text="Incorporamos como clientes Arcos Dorados lo cual dio comienzo a nuestra especialización en envases para comida comida rápida y una relación laboral que sigue vigente en la actualidad."
      />
      <TimelineItem
        title="CERTIFICACIÓN ISO"
        year="2013"
        text="Proceso mediante el cual Mc Paper´s demuestra que cumple con estándares de calidad, seguridad, eficiencia de productos y servicios."
      />
      <TimelineItem
        title="CERTIFICACIÓN FSC"
        year="2017"
        text="FSC es un sistema de certificación que ayuda a garantizar que los productos forestales que consumimos provengan de bosques gestionados de forma sostenible, beneficiando tanto al medio ambiente como a las comunidades locales."
      />
      <TimelineItem
        title="MUDANZA CENTRO INDUSTRIAL GARIN"
        year="2018"
        text="Ubicada en el Centro Industrial Garín, Partido de Belén de Escobar, Provincia de Buenos Aires, República Argentina, en un predio de 13.500 m2, con 8.000 m2 de planta productiva y depósitos y 500 m2 de oficinas."
      />
      <TimelineItem
        title="DESARROLLO GREENERPACK"
        year="2024"
        text="Desarrollo de un coating interno para los wraps y flat bags que se realiza con ceras vegetales biodegradables 100%."
      />
      <TimelineItem
        title="NUEVA PLANTA DE MC PAPER´S"
        year="2026"
        text="Como parte de la filosofía de Mc Paper´s, la innovación es un pilar fundamental. Próximamente una planta con mejor tecnología y comodidad para nuestros trabajadores."
      />
    </section>
  );
}