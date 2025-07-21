import './Products.css';

function Products() {
  return (
    <section className="products">
      <h2 className="products-title">Nuestros productos</h2>
      <div className="product-cards">
        <div className="product-card">
          <img
            src="https://mcpapers.com.ar/wp-content/uploads/2022/05/papel-embalaje.png"
            alt="Papel"
          />
          <h3>Papel</h3>
          <p>Ideales para envolver hamburguesas, papas fritas, panchos y más.</p>
        </div>
        <div className="product-card">
          <img
            src="https://mcpapers.com.ar/wp-content/uploads/2022/05/bolsas.png"
            alt="Bolsas"
          />
          <h3>Bolsas</h3>
          <p>Bolsas de papel kraft, delivery, take away o personalizadas con tu marca.</p>
        </div>
        <div className="product-card">
          <img
            src="https://mcpapers.com.ar/wp-content/uploads/2022/05/laminado.png"
            alt="Plásticos"
          />
          <h3>Plásticos</h3>
          <p>Material laminado, metalizado, con barrera para productos envasados.</p>
        </div>
      </div>
    </section>
  );
}

export default Products;
