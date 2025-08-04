import React from 'react';
import '../../styles/main.css';
import '../../styles/nosotros.css';
import useInViewAnimation from '../../hooks/useInViewAnimation';
import '../../styles/ScrollAnimations.css';

import marca1 from '../../assets/arcosDorados.avif';
import marca2 from '../../assets/alsea.avif';
import marca3 from '../../assets/arcor.avif';
import marca4 from '../../assets/mostaza.avif';
import marca5 from '../../assets/degasa.png';
import marca6 from '../../assets/extremas.avif';

export default function Marcas() {
  const { ref: h2Ref, inView: h2InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: textRef, inView: textInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const marcas = [marca1, marca2, marca3, marca4, marca5, marca6];

  // Create refs and inView states for each image
  const marcaAnimations = marcas.map(() => useInViewAnimation({ threshold: 0.2, triggerOnce: true }));

  return (
    <section className="nosotros-section">
      <h2
        ref={h2Ref}
        className={`section-title fade-in-up${h2InView ? ' fade-in-visible' : ''}`}
      >
        Marcas
      </h2>
      <div className="marcas-img-row">
        {marcas.map((img, idx) => {
          const { ref, inView } = marcaAnimations[idx];
          return (
            <img
              key={idx}
              ref={ref}
              src={img}
              alt={`Marca ${idx + 1}`}
              className={`marca-img fade-in-up${inView ? ' fade-in-visible' : ''}`}
              style={{ animationDelay: `${idx * 100}ms` }}
            />
          );
        })}
      </div>
      <div
        ref={textRef}
        className={`marcas-text fade-in-up${textInView ? ' fade-in-visible' : ''}`}
      >
        Compañia Argentina de levaduras (CALSA), Molinos Rio de la Plata S.A., BRF (Paty), DOGG, TOGNI´S Café, Burgang , Noah´s kitchen, entre otros.
      </div>
    </section>
  );
}
