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
      {direction === 'left' ? (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="22,6 10,16 22,26" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ) : (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="10,6 22,16 10,26" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      )}
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
