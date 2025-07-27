import './ProductsSection.css';
import '../styles/ScrollAnimations.css';
import useInViewAnimation from '../hooks/useInViewAnimation';

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
  // Animaciones sincronizadas con el resto de la página
  const { ref: titleRef, className: titleAnimClass } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="products-section">
      <a href="/ruta-del-producto" className="title-link">
       <h2 ref={titleRef} className={`products-title fade-in-up ${titleAnimClass}`}>
         Productos
       </h2>
      </a>
      <div className="products-list">
        {products.map((prod, idx) => {
          const { ref: cardRef, className: cardAnimClass } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
          return (
            <div ref={cardRef} className={`product-card product-${idx} scale-in ${cardAnimClass}`} key={prod.title}>
              <div className="product-images">
                {/* Primera imagen */}
                <div className={`image-wrapper first-image first-image-${idx}`}>
                  <a href="/ruta-del-producto" className="image-link">
                    <img src={prod.images[0]} alt={prod.title} />
                  </a>
                </div>
                {/* Lado derecho: título+botón y segunda imagen */}
                <div className="product-right">
                  <div className="product-info">
                    <h3>{prod.title}</h3>
                    <button className="see-more-btn">Ver más</button>
                  </div>
                  <div className={`image-wrapper second-image second-image-${idx}`}>
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