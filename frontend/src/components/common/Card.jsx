import React from 'react';
import PropTypes from 'prop-types';
import '../../index.css';

const Card = ({ children, className = '', padding = 'var(--spacing-lg)', style: customStyle = {}, hoverable = false }) => {
  const baseStyle = {
    backgroundColor: 'var(--color-card)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--color-border)',
    padding: padding,
    transition: 'all var(--transition-normal)',
    backdropFilter: 'blur(10px)', // Adds a glass effect
    ...customStyle
  };

  return (
    <div 
      className={className} 
      style={baseStyle}
      onMouseEnter={(e) => {
        if (hoverable) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-lg), var(--shadow-glow)';
          e.currentTarget.style.borderColor = 'rgba(62, 207, 142, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          e.currentTarget.style.borderColor = 'var(--color-border)';
        }
      }}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  padding: PropTypes.string,
  style: PropTypes.object,
  hoverable: PropTypes.bool,
};

export default Card;
