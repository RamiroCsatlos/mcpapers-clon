import PropTypes from 'prop-types';
import useInViewAnimation from '../../hooks/useInViewAnimation';

/**
 * Componente reutilizable para títulos de sección
 * @param {Object} props - Props del componente
 * @param {string} props.children - Texto del título
 * @param {string} props.href - URL del enlace (opcional)
 * @param {string} props.level - Nivel del heading (h1, h2, h3, etc.)
 * @param {string} props.className - Clases CSS adicionales
 */
const SectionTitle = ({ 
  children, 
  href, 
  level = 'h2', 
  className = '',
  animationDelay = 0 
}) => {
  const { ref, className: animationClass } = useInViewAnimation({ triggerOnce: true });
  
  const TitleTag = level;
  const titleClasses = `section-title fade-in-up ${animationClass} ${className}`;
  
  const titleElement = (
    <TitleTag 
      ref={ref}
      className={titleClasses}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {children}
    </TitleTag>
  );

  if (href) {
    return (
      <a href={href} className="title-link">
        {titleElement}
      </a>
    );
  }

  return titleElement;
};

SectionTitle.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string,
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  className: PropTypes.string,
  animationDelay: PropTypes.number
};

export default SectionTitle;
