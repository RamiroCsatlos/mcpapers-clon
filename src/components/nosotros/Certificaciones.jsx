import React from 'react';
import '../../styles/main.css';
import useInViewAnimation from '../../hooks/useInViewAnimation';
import '../../styles/ScrollAnimations.css';

export default function Certificaciones() {
  const { titleRef, titleInView } = useInViewAnimation();
  const { titleRef: pRef, titleInView: pInView } = useInViewAnimation();

  return (
    <section className="nosotros-section">
      <h2 ref={titleRef} className={`contact-title fade-in-up${titleInView ? ' fade-in-visible' : ''}`}>Certificaciones</h2>
      <p ref={pRef} className={`fade-in-up${pInView ? ' fade-in-visible' : ''}`}>Lista o descripción de certificaciones obtenidas por la empresa.</p>
      {/* <img src="/ruta/imagen-certificaciones.jpg" alt="Certificaciones" className="nosotros-img" /> */}
    </section>
  );
}
