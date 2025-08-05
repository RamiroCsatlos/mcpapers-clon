import React from 'react';
import useInViewAnimation from '../hooks/useInViewAnimation';
import '../styles/main.css';
import '../styles/ScrollAnimations.css';
import '../styles/equipamientos.css';

// Import images for each section
import img1a from '../assets/tecnologia1.avif';
import img1b from '../assets/tecnologia2.avif';
import img2a from '../assets/tecnologia3.avif';
import img2b from '../assets/tecnologia4.avif';
import img3a from '../assets/tecnologia5.avif';
import img3b from '../assets/tecnologia6.avif';
import img4a from '../assets/tecnologia7.avif';
import img4b from '../assets/tecnologia8.avif';

const sections = [
  {
    title: 'Impresión Huecograbado y Flexografía',
    text: 'Contamos con 2 impresoras en sistema Huecograbado, con excelente calidad de impresión en banda media y gran formato a 9 y 12 colores, tratamiento corona y con la opción de imprimir en ambas caras del sustrato, además una de ellas tiene un sistema integrado para la aplicación superficial de ceras o parafina en lineal. También tenemos en nuestro equipamiento 2 impresoras en sistema Flexográfico rotativo lineal para impresión en alta velocidad de banda media y gran formato a 5 y 8 colores, ideal para impresión en alta calidad sobre papel Kraft utilizado comúnmente para bolsas de fondo cuadrado.',
    img1: img1a,
    img2: img1b,
  },
  {
    title: 'Línea de producción contínua',
    text: 'En el área de impresión continua contamos con una impresora Flexográfica de tambor central a 6 colores y otro cuerpo para impresión de dorso junto con unidad de encerado y corte a registro integrados con contador para producción continua en línea dando como resultado el producto terminado y listo para su empaque.',
    img1: img2a,
    img2: img2b,
  },
  {
    title: 'Laminación',
    text: 'Además realizamos laminados en aluminio y otros sustratos dado que contamos con una maquina laminadora preparada para la aplicación dosificada de adhesivos monocomponente o bicomponente y tratamiento corona, también realizamos la aplicación de cera o parafina en superficie utilizando otra maquina que también nos permite el corte longitudinal o refile de bobinas a diferentes formatos y por ultimo contamos con 2 cortadoras para corte random de laminas con producción de grandes volúmenes.',
    img1: img3a,
    img2: img3b,
  },
  {
    title: 'Confección bolsas flat y fondo cuadrado',
    text: 'Poseemos 7 maquinas bolseras para la confección de bolsas de fondo cuadrado en papel Kraft de gran formato que nos permite tener grandes volúmenes de producción y también 2 maquinas confeccionadoras de bolsas Flat o de fuelle con corte troquel, en las cuales podemos realizar diferentes formatos y una tercera maquina confeccionadora con corte de arranque. Poseemos también dos maquinas rebobinadoras con sistema handlook para el control automático de tensión que permite obtener un excelente rebobinado en diferentes formatos.',
    img1: img4a,
    img2: img4b,
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
