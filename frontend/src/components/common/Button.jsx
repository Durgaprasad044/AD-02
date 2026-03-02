import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../index.css';

const Button = ({ 
  label, 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  size = 'md', 
  loading = false,
  type = 'button',
  className = '',
  style: customStyle = {},
  icon = null
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-md)',
    fontWeight: 600,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s ease-in-out',
    outline: 'none',
    fontFamily: 'inherit',
    position: 'relative',
    whiteSpace: 'nowrap',
    gap: '8px',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-primary-foreground)',
      border: '1px solid var(--color-primary)',
      boxShadow: 'var(--shadow-sm)',
    },
    primaryHover: {
      backgroundColor: '#8d6a46',
      transform: 'translateY(-1px)',
      boxShadow: 'var(--shadow-md)',
    },
    secondary: {
      backgroundColor: 'var(--color-secondary)',
      color: 'var(--color-secondary-foreground)',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
    },
    secondaryHover: {
      backgroundColor: '#d1c5ad',
      borderColor: 'var(--color-primary)',
      transform: 'translateY(-1px)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-muted-foreground)',
      border: '1px solid transparent',
    },
    ghostHover: {
      backgroundColor: 'var(--color-muted)',
      color: 'var(--color-foreground)',
    },
    danger: {
      backgroundColor: 'transparent',
      color: 'var(--color-destructive)',
      border: '1px solid var(--color-destructive)',
    },
    dangerHover: {
      backgroundColor: 'rgba(181, 74, 53, 0.1)',
      transform: 'translateY(-1px)',
    }
  };

  const sizes = {
    sm: {
      padding: '6px 12px',
      fontSize: '0.875rem',
      height: '32px',
    },
    md: {
      padding: '8px 16px',
      fontSize: '0.925rem',
      height: '40px',
    },
    lg: {
      padding: '12px 24px',
      fontSize: '1rem',
      height: '48px',
    },
  };

  const getVariantStyles = () => {
    let styles = { ...variants[variant] };
    if (isHovered && !disabled && !loading) {
      styles = { ...styles, ...variants[`${variant}Hover`] };
    }
    return styles;
  };

  const spinnerStyle = {
    width: '1em',
    height: '1em',
    border: '2px solid currentColor',
    borderRightColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 0.75s linear infinite',
  };

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ ...baseStyles, ...getVariantStyles(), ...sizes[size], ...customStyle }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {loading && <div style={spinnerStyle} />}
      {!loading && icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  loading: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.node,
};

export default Button;
