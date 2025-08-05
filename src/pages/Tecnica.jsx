import React from 'react';
import useInViewAnimation from '../hooks/useInViewAnimation';
import '../styles/main.css';
import '../styles/ScrollAnimations.css';
import '../styles/equipamientos.css';

import img1a from '../assets/tecnica1.avif';
import img1b from '../assets/tecnica2.avif';
import img2a from '../assets/tecnica3.avif';
import img2b from '../assets/tecnica4.avif';

const sections = [
  {
    title: 'Montajes de Clichés y Análisis de Cilindro de Impresión',
    text: 'Contamos con un área técnica calificada para el analisis y desarrollo de nuevos productos garantizando en su ejecucion la aplicacion de altos standares de calidad. Trabajamos en la pre prensa desde la recepcion, control y preparación de los archivos originales hasta su correcta aplicacion en el sistema de impresión que se crea conveniente y para el caso de flexografia, se realiza el montaje de polimeros en una maquina montadora de alta presicion lo que posteriormente permite un correcto registro entre colores.Para huecograbado realizamos el analisis y posterior control del arte aplicado a los cilindros para obtener excelentes resultados en la impresion.',
    img1: img1a,
    img2: img1b,
  },
  {
    title: 'Sistema X-Rite Color',
    text: 'Para huecograbado realizamos el analisis y posterior control del arte aplicado a los cilindros para obtener excelentes resultados en la impresión. Utilizamos tambien herramientas de control (Sistema X-Rite Color) para analizar, especificar, formular y gestionar un color preciso y consistente en nuestros impresos.',
    img1: img2a,
    img2: img2b,
  },
];

export default function Tecnica() {
  const { ref: h2Ref, inView: h2InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  return (
    <main className="equipamiento-main">
      <h2
        ref={h2Ref}
        className={`equipamiento-title fade-in-up${h2InView ? ' fade-in-visible' : ''}`}
      >
        Técnica
      </h2>
      {/* Primera sección: igual a tecnología */}
      <section className="equipamiento-section fade-in-up fade-in-visible">
        <h3 className="equipamiento-subtitle">{sections[0].title}</h3>
        <p className="equipamiento-text">{sections[0].text}</p>
        <div className="equipamiento-imgs-row">
          <img src={sections[0].img1} alt={sections[0].title + ' imagen 1'} className="equipamiento-img" />
          <img src={sections[0].img2} alt={sections[0].title + ' imagen 2'} className="equipamiento-img" />
        </div>
      </section>
      {/* Segunda sección: layout especial en desktop */}
      <section className="equipamiento-section equipamiento-section-special fade-in-up fade-in-visible">
        <h3 className="equipamiento-subtitle">{sections[1].title}</h3>
        <div className="equipamiento-special-row">
          <div className="equipamiento-special-img-col">
            <img src={sections[1].img1} alt={sections[1].title + ' imagen 1'} className="equipamiento-img-rect" />
          </div>
          <div className="equipamiento-special-content-col">
            <p className="equipamiento-text">{sections[1].text}</p>
            <img src={sections[1].img2} alt={sections[1].title + ' imagen 2'} className="equipamiento-img" style={{objectFit: 'contain'}} />
          </div>
        </div>
      </section>
    </main>
  );
}
