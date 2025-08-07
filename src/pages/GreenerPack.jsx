import React from 'react';
import '../styles/main.css';
import '../styles/nosotros.css';
import useInViewAnimation from '../hooks/useInViewAnimation';
import useIsMobile from '../hooks/useIsMobile';
import DecorativeBackground from '../components/DecorativeBackground';
import '../styles/ScrollAnimations.css';
import '../components/GreenerPack.css';

import innovacionImg1 from '../assets/greenerpackLogoColor.avif'; 
import innovacionImg2 from '../assets/logosWebGreenerpack.avif'; 
import innovacionImg3 from '../assets/logosWebGreenerpack1.avif'; 
import innovacionImg4 from '../assets/logosWebGreenerpack2.avif';

const innovacionList = [
  'Biodegradabilidad de todos los componentes.',
  'Compostabilidad del conjunto.',
  'Posibilidad de ser reciclable pre-consumo.',
  'Materias primas 100% de fuentes renovables.',
  'Perfluorados free.',
  'Metales pesados free.',
  'Plásticos o resinas sintéticas free.',
  'Los envases son "Grease proof" y resistentes a la humedad.',
  'Fluida y confiable cadena de abastecimiento.',
  'Productos certificados para contacto con alimentos por la jurisdiccional competente con validez nacional y Mercosur.',
  'Teflón free.',
];

export default function GreenerPackPage() {
  const isMobile = useIsMobile(900);
  const { ref: h2Ref, inView: h2InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: img1Ref, inView: img1InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: textRef, inView: textInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: img2Ref, inView: img2InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: mobileImagesRef, inView: mobileImagesInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: listRef, inView: listInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });

  // Divide la lista en dos columnas
  const mid = Math.ceil(innovacionList.length / 2);
  const col1 = innovacionList.slice(0, mid);
  const col2 = innovacionList.slice(mid);

  return (
    <main className="greenerpack-page">
      <section className="innovacion-section">
        <DecorativeBackground />
        <section className="nosotros-section">
        <h2
          ref={h2Ref}
          className={`innovacion-title section-title fade-in-up${h2InView ? ' fade-in-visible' : ''}`}
        >
          Innovación
        </h2>
        <div className="innovacion-img-container">
          <img
            ref={img1Ref}
            src={innovacionImg1}
            alt="Innovación principal"
            className={`innovacion-img-1 fade-in-up${img1InView ? ' fade-in-visible' : ''}`}
          />
        </div>
        <div
          ref={textRef}
          className={`innovacion-text fade-in-up${textInView ? ' fade-in-visible' : ''}`}
        >
          Un coating interno para los wraps y flat bags que se realiza con ceras vegetales biodegradables 100% y cumple con las siguientes condiciones:
        </div>
        <div className="innovacion-img-container">
          {isMobile ? (
            <div ref={mobileImagesRef} className="innovacion-img-mobile-overlap">
              <img
                src={innovacionImg3}
                alt="Innovación secundaria mobile 1"
                className={`innovacion-img-2 fade-in-up${mobileImagesInView ? ' fade-in-visible' : ''}`}
                loading="lazy"
              />
              <img
                src={innovacionImg4}
                alt="Innovación secundaria mobile 2"
                className={`innovacion-img-2 innovacion-img-2-overlap fade-in-up${mobileImagesInView ? ' fade-in-visible' : ''}`}
                loading="lazy"
              />
            </div>
          ) : (
            <img
              ref={img2Ref}
              src={innovacionImg2}
              alt="Innovación secundaria"
              className={`innovacion-img-2 fade-in-up${img2InView ? ' fade-in-visible' : ''}`}
            />
          )}
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
      </section>
    </main>
  );
}
