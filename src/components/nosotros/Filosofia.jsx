import React from 'react';
import '../../styles/main.css';
import '../../styles/nosotros.css';
import { useInfoSectionAnimations } from '../../hooks/useAnimations';
import useIsMobile from '../../hooks/useIsMobile';
import '../../styles/ScrollAnimations.css';

import filosofia from '../../assets/filosofia.avif';

export default function Filosofia() {
  const isMobile = useIsMobile(900);
  
  // Hook centralizado para animaciones de sección de información
  const { h2Ref, h2InView, imgRef, imgInView } = useInfoSectionAnimations();

  // Helper para cada item con animaciones individuales
  function InfoItem({ title, text, className = "" }) {
    const { h3Ref, h3InView, pRef, pInView } = useInfoSectionAnimations();
    return (
      <div className={`filosofia-item ${className}`}>
        <h3 ref={h3Ref} className={`h3-title fade-in-up${h3InView ? ' fade-in-visible' : ''}`}>{title}</h3>
        <p ref={pRef} className={`fade-in-up${pInView ? ' fade-in-visible' : ''}`}>{text}</p>
      </div>
    );
  }

  return (
    <section className="nosotros-section">
      <h2 ref={h2Ref} className={`section-title fade-in-up${h2InView ? ' fade-in-visible' : ''}`}>Filosofía</h2>
      <img
        ref={imgRef}
        src={isMobile ? filosofia : filosofia}
        alt="Filosofía"
        className={`filosofia-image fade-in-up${imgInView ? ' fade-in-visible' : ''}`}
      />
      <InfoItem
        title="INNOVACIÓN"
        text="La innovación es parte del ADN de McPaper’s Argentina y el motor de nuestra empresa. A través de la innovación y el desarrollo, hemos podido crear sistemas de elaboración personalizados, la única biocera 100% biodegradable y reciclable, de fuentes renovables, una manera responsable y competitiva de incursionar en el mercado local e internacional."
        className="item-innovacion"
      />
      <InfoItem
        title="COMPROMISO"
        text="Nuestro compromiso es con nuestros clientes y el medio ambiente. Promovemos prácticas sustentables, responsables para el desarrollo de productos biodegradables y con menor impacto, manteniendo los estándares de calidad de nuestros clientes."
        className="item-compromiso"
      />
      <InfoItem
        title="VALORES"
        text="Somos una empresa argentina que abastece a las principales marcas de fast-food y de comida en el país. Nuestros productos se fabrican con materiales biodegradables y certificados para estar en contacto con alimentos, garantizando la seguridad e inocuidad en nuestros procesos de producción."
        className="item-valores"
      />
      <InfoItem
        title="ESPECIALIZACIÓN"
        text="A través del desarrollo, la innovación, la tecnología y las buenas prácticas empresariales, nos dedicamos a la elaboración y producción de envases flexibles para la industria de la alimentación desde 1991, especializándonos en nuestra industria, envases flexibles y las necesidades de uso de nuestros productos."
        className="item-especializacion"
      />

    </section>
  );
}