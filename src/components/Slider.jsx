import { useState, useEffect } from 'react';
import './Slider.css';
import ArrowButton from './common/ArrowButton';
import sliderBobina from '../assets/sliderBobina.webp';
import sliderFabrica from '../assets/sliderFabrica.webp';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1); // Comenzamos en 1 (primer slide real)
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      id: 1,
      image: sliderBobina,
      title: "Tecnología de Vanguardia",
      subtitle: "Se procesam aproximadamente 3.000 toneladas de envases al año"
    },
    {
      id: 2,
      image: sliderFabrica,
      title: "Instalaciones Modernas",
      subtitle: "Ubicada en el centro industrial Garín, en un predio de 13.500 m², con 8.000 m² de planta productiva y 500 m² de oficinas"
    }
  ];

  // Crear array extendido: [Slide2, Slide1, Slide2, Slide1]
  // Índices:                [0,     1,     2,     3]
  const extendedSlides = [
    slides[slides.length - 1], // Último slide (Slide2) al inicio - índice 0
    ...slides,                 // Slides originales (Slide1, Slide2) - índices 1, 2
    slides[0]                  // Primer slide (Slide1) al final - índice 3
  ];

  // Auto-slide functionality - siempre hacia la derecha
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isTransitioning]);

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);
    
    // Después de la transición, verificar si necesitamos saltar
    setTimeout(() => {
      setCurrentSlide(current => {
        if (current === 3) { // Si estamos en el último slide duplicado (índice 3)
          setIsTransitioning(false);
          return 1; // Saltar al primer slide real (índice 1) sin animación
        }
        setIsTransitioning(false);
        return current;
      });
    }, 600); // Duración de la transición CSS
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(prev => prev - 1);
    
    // Después de la transición, verificar si necesitamos saltar
    setTimeout(() => {
      setCurrentSlide(current => {
        if (current === 0) { // Si estamos en el primer slide duplicado (índice 0)
          setIsTransitioning(false);
          return 2; // Saltar al último slide real (índice 2) sin animación
        }
        setIsTransitioning(false);
        return current;
      });
    }, 600); // Duración de la transición CSS
  };

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        {extendedSlides.map((slide, index) => (
          <div
            key={`${slide.id}-${index}`}
            className="slide"
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
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
      <ArrowButton direction="left" onClick={prevSlide} className="slider-arrow slider-arrow-left" ariaLabel="Anterior" />
      <ArrowButton direction="right" onClick={nextSlide} className="slider-arrow slider-arrow-right" ariaLabel="Siguiente" />
    </div>
  );
};

export default Slider;
