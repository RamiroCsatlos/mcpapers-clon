import React from 'react';
import './DecorativeBackground.css';

/**
 * Componente de fondo decorativo con SVGs
 * Optimizado para rendimiento y reutilización
 * Usado en GreenerPack e Innovación
 */
const DecorativeBackground = ({ 
  className = "greenerpack-bg",
  opacity = 0.8,
  strokeColor = "#b7e3b7" 
}) => {
  return (
    <div className={className}>
      {/* SVG decorativo 1 - Forma diamante */}
      <svg className="doodle doodle-1" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <path 
          d="M10,40 Q40,10 70,40 Q40,70 10,40 Z" 
          stroke="#d6f5d6" 
          strokeWidth="4" 
          fill="none"
        />
      </svg>
      
      {/* SVG decorativo 2 - Forma ondulada */}
      <svg className="doodle doodle-2" viewBox="0 0 100 60" fill="none" aria-hidden="true">
        <path 
          d="M10,30 Q50,10 90,30 Q50,50 10,30 Z" 
          stroke="#f5f3e7" 
          strokeWidth="3" 
          fill="none"
        />
      </svg>
      
      {/* SVG decorativo 3 - Forma pequeña */}
      <svg className="doodle doodle-3" viewBox="0 0 60 40" fill="none" aria-hidden="true">
        <path 
          d="M10,20 Q30,0 50,20 Q30,40 10,20 Z" 
          stroke="#b7e3b7" 
          strokeWidth="2" 
          fill="none"
        />
      </svg>
      
      {/* SVG decorativo 4 - Forma compleja con elipse */}
      <svg className="doodle doodle-4" viewBox="0 0 100 60" fill="none" aria-hidden="true">
        <path 
          d="M10,30 Q50,5 90,30 Q50,55 10,30 Z" 
          stroke="#eaf7e2" 
          strokeWidth="6" 
          fill="none"
        />
        <ellipse 
          cx="50" 
          cy="30" 
          rx="22" 
          ry="12" 
          stroke="#eaf7e2" 
          strokeWidth="4" 
          fill="none"
        />
      </svg>
      
      {/* SVG decorativo 5 - Forma diamante con círculo */}
      <svg className="doodle doodle-5" viewBox="0 0 70 70" fill="none" aria-hidden="true">
        <path 
          d="M35,10 Q60,35 35,60 Q10,35 35,10 Z" 
          stroke="#f7f7e2" 
          strokeWidth="7" 
          fill="none"
        />
        <circle 
          cx="35" 
          cy="35" 
          r="12" 
          stroke="#eaf7e2" 
          strokeWidth="5" 
          fill="none"
        />
      </svg>
      
      {/* SVG decorativo 6 - Forma ancha con rectángulo */}
      <svg className="doodle doodle-6" viewBox="0 0 130 50" fill="none" aria-hidden="true">
        <path 
          d="M10,25 Q65,0 120,25 Q65,50 10,25 Z" 
          stroke="#eaf7e2" 
          strokeWidth="6" 
          fill="none"
        />
        <rect 
          x="55" 
          y="15" 
          width="20" 
          height="20" 
          rx="10" 
          stroke="#f7f7e2" 
          strokeWidth="4" 
          fill="none"
        />
      </svg>
      
      {/* SVG decorativo 7 - Forma simple ondulada */}
      <svg className="doodle doodle-7" viewBox="0 0 80 40" fill="none" aria-hidden="true">
        <path 
          d="M10,20 Q40,10 70,20 Q40,30 10,20 Z" 
          stroke="#eaf7e2" 
          strokeWidth="3" 
          fill="none"
        />
      </svg>
      
      {/* SVG decorativo 8 - Elipse */}
      <svg className="doodle doodle-8" viewBox="0 0 60 60" fill="none" aria-hidden="true">
        <ellipse 
          cx="30" 
          cy="30" 
          rx="25" 
          ry="10" 
          stroke="#d6f5d6" 
          strokeWidth="2.5" 
          fill="none"
        />
      </svg>
      
      {/* SVG decorativo 9 - Curva suave */}
      <svg className="doodle doodle-9" viewBox="0 0 100 40" fill="none" aria-hidden="true">
        <path 
          d="M10,20 Q30,5 50,20 Q70,35 90,20" 
          stroke="#f5f3e7" 
          strokeWidth="2.5" 
          fill="none"
        />
      </svg>
      
      {/* SVG decorativo 10 - Círculo simple */}
      <svg className="doodle doodle-10" viewBox="0 0 50 50" fill="none" aria-hidden="true">
        <circle 
          cx="25" 
          cy="25" 
          r="18" 
          stroke="#eaf7e2" 
          strokeWidth="2" 
          fill="none"
        />
      </svg>
    </div>
  );
};

export default DecorativeBackground;
