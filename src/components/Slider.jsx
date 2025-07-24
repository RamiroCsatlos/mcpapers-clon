import { useState, useEffect } from 'react';
import './Slider.css';
import sliderBobina from '../assets/sliderBobina.webp';
import sliderFabrica from '../assets/sliderFabrica.webp';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState('next'); // 'next' o 'prev'

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

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection('next');
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection('next');
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        {slides.map((slide, index) => {
          let slideClass = 'slide';
          
          if (index === currentSlide) {
            slideClass += ' active';
          } else {
            // Lógica para carrusel infinito
            if (direction === 'next') {
              // Si estamos en el último slide y vamos al primero
              if (currentSlide === slides.length - 1 && index === 0) {
                slideClass += ' next';
              }
              // Si estamos en el primer slide y venimos del último
              else if (currentSlide === 0 && index === slides.length - 1) {
                slideClass += ' prev';
              }
              // Comportamiento normal
              else {
                slideClass += index < currentSlide ? ' prev' : ' next';
              }
            } else { // direction === 'prev'
              // Si estamos en el primer slide y vamos al último
              if (currentSlide === 0 && index === slides.length - 1) {
                slideClass += ' prev';
              }
              // Si estamos en el último slide y venimos del primero
              else if (currentSlide === slides.length - 1 && index === 0) {
                slideClass += ' next';
              }
              // Comportamiento normal
              else {
                slideClass += index > currentSlide ? ' next' : ' prev';
              }
            }
          }

          return (
            <div
              key={slide.id}
              className={slideClass}
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="slide-overlay">
                <div className="slide-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
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
