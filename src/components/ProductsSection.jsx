import './ProductsSection.css';
import './ScrollAnimations.css';
import { useInView } from 'react-intersection-observer';

import bolsasFondoFlatBobinas from '../assets/bolsasFondoFlatBobinas.avif';
import bolsasFondoFlatArmadas from '../assets/bolsasFondoFlatArmadas.avif';
import bolsaCuadrada1 from '../assets/bolsasFondoCuadradoBobinas.avif';
import bolsaCuadrada2 from '../assets/bolsasFondoCuadradoArmadas.avif';
import laminasBobinas from '../assets/laminasBobinas.png';
import laminas2 from '../assets/laminasArmadas.avif';

const products = [
  {
    title: 'Bolsas Flat',
    images: [
      bolsasFondoFlatBobinas,
      bolsasFondoFlatArmadas
    ]
  },
  {
    title: 'Bolsas Fondo\nCuadrado',
    images: [
      bolsaCuadrada1,
      bolsaCuadrada2
    ]
  },
  {
    title: 'Láminas',
    images: [
      laminasBobinas,
      laminas2
    ]
  }
];

function ProductsSection() {
  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  return (
    <section className="products-section">
      <a href="/ruta-del-producto" className="title-link">
       <h2 
         ref={titleRef}
         className={`products-title fade-in-up ${titleInView ? 'fade-in-visible' : ''}`}
       >
         Productos
       </h2>
      </a>
      <div className="products-list">
        {products.map((prod, idx) => {
          // Hook individual para cada producto (para desktop)
          const { ref: productRef, inView: productInView } = useInView({
            threshold: 0.2,
            triggerOnce: false
          });

          // Hooks individuales para cada elemento interno
          const { ref: firstImageRef, inView: firstImageInView } = useInView({
            threshold: 0.2,
            triggerOnce: false
          });

          const { ref: secondImageRef, inView: secondImageInView } = useInView({
            threshold: 0.2,
            triggerOnce: false
          });

          const { ref: infoRef, inView: infoInView } = useInView({
            threshold: 0.2,
            triggerOnce: false
          });

          // Calcular delays para los elementos internos
          const baseDelay = idx * 200 + 200;
          const firstImageDelay = baseDelay;
          const infoDelay = baseDelay + 100;
          const secondImageDelay = baseDelay + 200;

          return (
            <div 
              ref={productRef}
              className={`product-card product-${idx} scale-in animation-delay-${baseDelay} ${productInView ? 'fade-in-visible' : ''}`} 
              key={prod.title}
            >
              <div className="product-images">
                {/* Primera imagen con su propia animación */}
                <div 
                  ref={firstImageRef}
                  className={`image-wrapper first-image first-image-${idx} scale-in animation-delay-${firstImageDelay} ${firstImageInView ? 'fade-in-visible' : ''}`}
                >
                  <a href="/ruta-del-producto" className="image-link">
                    <img src={prod.images[0]} alt={prod.title} />
                  </a>
                </div>
                {/* Lado derecho: título+botón y segunda imagen */}
                <div className="product-right">
                  <div 
                    ref={infoRef}
                    className={`product-info scale-in animation-delay-${infoDelay} ${infoInView ? 'fade-in-visible' : ''}`}
                  >
                    <h3>{prod.title}</h3>
                    <button className="see-more-btn">Ver más</button>
                  </div>
                  <div 
                    ref={secondImageRef}
                    className={`image-wrapper second-image second-image-${idx} scale-in animation-delay-${secondImageDelay} ${secondImageInView ? 'fade-in-visible' : ''}`}
                  >
                    <a href="/ruta-del-producto" className="image-link">
                      <img src={prod.images[1]} alt={prod.title} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProductsSection;