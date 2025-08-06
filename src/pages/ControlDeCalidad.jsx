import useInViewAnimation from '../hooks/useInViewAnimation';
import '../styles/main.css';
import '../styles/ScrollAnimations.css';
import '../styles/equipamientos.css';

// Import images for control de calidad
import img1 from '../assets/controlDeCalidad1.avif';
import img2 from '../assets/controlDeCalidad2.avif';
import img3 from '../assets/controlDeCalidad3.avif';
import img4 from '../assets/controlDeCalidad4.avif';

export default function ControlDeCalidad() {
  const { ref: h2Ref, inView: h2InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: sectionRef, inView: sectionInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });

  return (
    <main className="control-calidad-main">
      <h2
        ref={h2Ref}
        className={`control-calidad-title section-title fade-in-up${h2InView ? ' fade-in-visible' : ''}`}
      >
        Control de Calidad
      </h2>
      
      <section
        ref={sectionRef}
        className={`control-calidad-section fade-in-up${sectionInView ? ' fade-in-visible' : ''}`}
      >
        <p className="control-calidad-text">
          Contamos con el equipamiento necesario para garantizar la calidad de nuestros productos realizando ensayos para controlar las propiedades físicas de aquellos materiales que utilizamos. Utilizamos para esto, máquinas para prueba de tracción con el fin de controlar la resistencia a la rotura como también Mullen Tester donde se realizan pruebas de reventamiento o estallido del material.
        </p>
        <img src={img1} alt="Control de calidad imagen 1" className="control-calidad-img control-calidad-img-1" />
        <img src={img2} alt="Control de calidad imagen 2" className="control-calidad-img control-calidad-img-2" />
        <img src={img3} alt="Control de calidad imagen 3" className="control-calidad-img control-calidad-img-3" />
        <img src={img4} alt="Control de calidad imagen 4" className="control-calidad-img control-calidad-img-4" />
      </section>
    </main>
  );
}
