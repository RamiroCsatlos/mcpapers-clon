import React from 'react';
import '../../styles/main.css';
import useInViewAnimation from '../../hooks/useInViewAnimation';
import '../../styles/ScrollAnimations.css';

export default function Marcas() {
  const { titleRef, titleInView } = useInViewAnimation();
  const { titleRef: pRef, titleInView: pInView } = useInViewAnimation();

  return (
    <section className="nosotros-section">
      <h2 ref={titleRef} className={`contact-title fade-in-up${titleInView ? ' fade-in-visible' : ''}`}>Marcas</h2>
      <p ref={pRef} className={`fade-in-up${pInView ? ' fade-in-visible' : ''}`}>Descripción de las marcas asociadas o propias de la empresa.</p>
      {/* <img src="/ruta/imagen-marcas.jpg" alt="Marcas" className="nosotros-img" /> */}
    </section>
  );
}
