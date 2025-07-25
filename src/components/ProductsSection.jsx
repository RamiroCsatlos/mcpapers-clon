import './ProductsSection.css';
import '../styles/scrollAnimations.css';
import useScrollAnimation from '../hooks/useScrollAnimation';

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
    title: 'Bolsas Fondo Cuadrado',
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
  const [titleRef, titleClasses] = useScrollAnimation({ 
    animationType: 'titleSlide', 
    delay: 100 
  });

  // Crear hooks para cada producto fuera del map
  const [card0Ref, card0Classes] = useScrollAnimation({ 
    animationType: 'cardHover', 
    delay: 150 
  });
  
  const [card1Ref, card1Classes] = useScrollAnimation({ 
    animationType: 'cardHover', 
    delay: 300 
  });
  
  const [card2Ref, card2Classes] = useScrollAnimation({ 
    animationType: 'cardHover', 
    delay: 450 
  });

  const cardRefs = [card0Ref, card1Ref, card2Ref];
  const cardClasses = [card0Classes, card1Classes, card2Classes];

  return (
    <section className="products-section">
      <a href="/ruta-del-producto" className="title-link">
       <h2 ref={titleRef} className={`products-title ${titleClasses}`}>Productos</h2>
      </a>
      <div className="products-list">
        {products.map((prod, idx) => (
          <div ref={cardRefs[idx]} className={`product-card product-${idx} ${cardClasses[idx]}`} key={prod.title}>
            <div className="product-images">
              {/* Primera imagen (izquierda) */}
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
        ))}
      </div>
    </section>
  );
}

export default ProductsSection;