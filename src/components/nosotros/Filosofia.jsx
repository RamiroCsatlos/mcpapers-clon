import React from 'react';
import '../../styles/main.css';
import useInViewAnimation from '../../hooks/useInViewAnimation';
import '../../styles/ScrollAnimations.css';

export default function Filosofia() {
  const { titleRef, titleInView } = useInViewAnimation();
  const { titleRef: pRef, titleInView: pInView } = useInViewAnimation();

  return (
    <section className="nosotros-section">
      <h2 ref={titleRef} className={`contact-title fade-in-up${titleInView ? ' fade-in-visible' : ''}`}>Filosofía</h2>
      <p ref={pRef} className={`fade-in-up${pInView ? ' fade-in-visible' : ''}`}>Descripción de la filosofía de la empresa. Puedes incluir valores, misión y visión.</p>
      {/* <img src="/ruta/imagen-filosofia.jpg" alt="Filosofía" className="nosotros-img" /> */}
    </section>
  );
}
