import { useState, useEffect } from 'react';
import './Slider.css';
import sliderBobina from '../assets/sliderBobina.webp';
import sliderFabrica from '../assets/sliderFabrica.webp';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: sliderBobina,
      title: "Tecnología de Vanguardia",
      subtitle: "Producción de alta calidad con maquinaria especializada"
    },
    {
      id: 2,
      image: sliderFabrica,
      title: "Instalaciones Modernas",
      subtitle: "Fábrica equipada con la mejor tecnología"
    }
  ];

  // Auto-slide functionality - siempre hacia la derecha
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="slide"
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className="slide-overlay">
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button className="slider-arrow slider-arrow-left" onClick={prevSlide}>
        &lt;
      </button>
      <button className="slider-arrow slider-arrow-right" onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
};

export default Slider;
