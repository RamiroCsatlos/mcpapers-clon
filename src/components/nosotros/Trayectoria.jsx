import React from 'react';
import '../../styles/main.css';
import useInViewAnimation from '../../hooks/useInViewAnimation';


export default function Trayectoria() {
    const { titleRef, titleInView } = useInViewAnimation();

  return (
    <section className="nosotros-section">
      <h2 ref={titleRef} className={`contact-title fade-in-up${titleInView ? ' fade-in-visible' : ''}`}>Trayectoria</h2>
    </section>
  );
}