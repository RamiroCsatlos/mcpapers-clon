import React from 'react';
import '../../styles/main.css';
import useInViewAnimation from '../../hooks/useInViewAnimation';
import '../../styles/ScrollAnimations.css';

export default function Innovacion() {
  const { titleRef, titleInView } = useInViewAnimation();
  const { titleRef: pRef, titleInView: pInView } = useInViewAnimation();

  return (
    <section className="nosotros-section">
      <h2 ref={titleRef} className={`contact-title fade-in-up${titleInView ? ' fade-in-visible' : ''}`}>Innovación</h2>
      <p ref={pRef} className={`fade-in-up${pInView ? ' fade-in-visible' : ''}`}>Texto sobre la innovación en la empresa. Resalta procesos, tecnología o productos innovadores.</p>
      {/* <img src="/ruta/imagen-innovacion.jpg" alt="Innovación" className="nosotros-img" /> */}
    </section>
  );
}
