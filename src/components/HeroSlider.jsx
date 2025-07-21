import { useState } from 'react';
import './HeroSlider.css';

const images = [
  {
    src: 'https://mcpapers.com.ar/wp-content/uploads/2022/05/banner-papel.png',
    alt: 'Papel de regalo',
  },
  {
    src: 'https://mcpapers.com.ar/wp-content/uploads/2022/05/banner-bolsas.png',
    alt: 'Bolsas de papel',
  },
  {
    src: 'https://mcpapers.com.ar/wp-content/uploads/2022/05/banner-plastico.png',
    alt: 'Plásticos',
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="hero-slider">
      <button className="slider-btn prev" onClick={prevSlide}>&lt;</button>
      <img src={images[current].src} alt={images[current].alt} />
      <button className="slider-btn next" onClick={nextSlide}>&gt;</button>
    </div>
  );
}

export default HeroSlider;
