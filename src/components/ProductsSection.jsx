import './ProductsSection.css';

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
  return (
    <section className="products-section">
      <h2 className="products-title">Productos</h2>
      <div className="products-list">
        {products.map((prod, idx) => (
          <div className="product-card" key={prod.title}>
            <div className="product-images">
              {/* Primera imagen (izquierda) */}
              <div className="image-wrapper first-image">
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
                <div className="image-wrapper second-image">
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