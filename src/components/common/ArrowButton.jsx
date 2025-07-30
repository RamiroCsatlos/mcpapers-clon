import React from 'react';
import PropTypes from 'prop-types';
import './ArrowButton.css';

const ArrowButton = ({ direction, onClick, className = '', ariaLabel }) => {
  return (
    <button
      className={`arrow-btn arrow-btn-${direction} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel || (direction === 'left' ? 'Anterior' : 'Siguiente')}
      tabIndex={0}
      type="button"
    >
      {direction === 'left' ? <span>&lt;</span> : <span>&gt;</span>}
    </button>
  );
};

ArrowButton.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  ariaLabel: PropTypes.string
};

export default ArrowButton;
