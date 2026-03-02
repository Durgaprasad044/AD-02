import React from 'react';
import PropTypes from 'prop-types';
import '../../index.css';

const Avatar = ({ src, name, size = 'md', className = '' }) => {
  const getInitials = (name) => {
    if (!name) return '??';
    const names = name.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const sizeMap = {
    sm: '32px',
    md: '48px',
    lg: '64px',
    xl: '96px',
  };

  const dimension = sizeMap[size] || sizeMap.md;

  const style = {
    width: dimension,
    height: dimension,
    borderRadius: '50%',
    objectFit: 'cover',
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-accent-foreground)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size === 'sm' ? '0.75rem' : size === 'md' ? '1rem' : '1.5rem',
    fontWeight: 600,
    border: '2px solid var(--color-border)',
    boxShadow: 'var(--shadow-sm)',
  };

  if (src) {
    return (
      <img 
        src={src} 
        alt={name || 'Avatar'} 
        style={style} 
        className={className}
        onError={(e) => { e.target.style.display = 'none'; }} 
      />
    );
  }

  return (
    <div style={style} className={className}>
      {getInitials(name)}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

export default Avatar;
