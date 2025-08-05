import React from 'react';
import useInViewAnimation from '../hooks/useInViewAnimation';
import '../styles/main.css';
import '../styles/ScrollAnimations.css';
import '../styles/equipamientos.css';

// Import images for each section
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

export default function Tecnologia() {
  const { ref: h2Ref, inView: h2InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  return (
    <main className="tecnologia-main">
      <h2
        ref={h2Ref}
        className={`tecnologia-title section-title fade-in-up${h2InView ? ' fade-in-visible' : ''}`}
      >
        Tecnología
      </h2>
      {sections.map((sec, idx) => {
        const { ref: secRef, inView: secInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
        return (
          <section
            key={idx}
            ref={secRef}
            className={`tecnologia-section fade-in-up${secInView ? ' fade-in-visible' : ''}`}
          >
            <h3 className="tecnologia-subtitle">{sec.title}</h3>
            <p className="tecnologia-text">{sec.text}</p>
            <div className="tecnologia-imgs-row">
              <img src={sec.img1} alt={sec.title + ' imagen 1'} className="tecnologia-img" />
              <img src={sec.img2} alt={sec.title + ' imagen 2'} className="tecnologia-img" />
            </div>
          </section>
        );
      })}
    </main>
  );
}
