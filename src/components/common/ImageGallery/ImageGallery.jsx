import PropTypes from 'prop-types';
import useInViewAnimation from '../../hooks/useInViewAnimation';

/**
 * Componente reutilizable para galerías de imágenes
 * @param {Object} props - Props del componente
 * @param {Array} props.images - Array de objetos con datos de imágenes
 * @param {number} props.columns - Número de columnas en desktop
 * @param {string} props.className - Clases CSS adicionales
 */
const ImageGallery = ({ 
  images, 
  columns = 3, 
  className = '',
  imageHover = 'brightness'
}) => {
  const galleryClasses = `gallery gallery-${columns} ${className}`;
  
  return (
    <div className={galleryClasses}>
      {images.map((image, index) => {
        const { ref, className: animationClass } = useInViewAnimation({
          threshold: 0.2,
          triggerOnce: false
        });

        return (
          <a 
            key={image.id || index}
            href={image.link}
            ref={ref}
            className={`gallery-item image-link scale-in animation-delay-${(index + 1) * 200} ${animationClass}`}
          >
            <img 
              src={image.src} 
              alt={image.alt}
              className={`gallery-image hover-${imageHover}`}
              loading="lazy"
            />
            {image.badge && (
              <div className="image-badge">{image.badge}</div>
            )}
          </a>
        );
      })}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    badge: PropTypes.string
  })).isRequired,
  columns: PropTypes.oneOf([1, 2, 3, 4]),
  className: PropTypes.string,
  imageHover: PropTypes.oneOf(['brightness', 'scale', 'none'])
};

export default ImageGallery;
