import React from 'react';
import Button from './Button';
import '../../index.css';

const ErrorState = ({ title = "Something went wrong", message, onRetry }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-3xl)',
    textAlign: 'center',
    backgroundColor: 'var(--color-glass)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--color-error)',
    width: '100%',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 0 20px rgba(239, 68, 68, 0.1)',
  };

  const titleStyle = {
    color: 'var(--color-text-primary)',
    marginBottom: 'var(--spacing-sm)',
    fontSize: '1.25rem',
    fontWeight: 600,
  };

  const messageStyle = {
    color: 'var(--color-text-secondary)',
    marginBottom: 'var(--spacing-lg)',
    maxWidth: '400px',
    lineHeight: 1.6,
  };

  return (
    <div style={containerStyle}>
      <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>⚠️</div>
      <h3 style={titleStyle}>{title}</h3>
      {message && <p style={messageStyle}>{message}</p>}
      {onRetry && (
        <Button 
          label="Try Again" 
          variant="danger" 
          onClick={onRetry} 
        />
      )}
    </div>
  );
};

export default ErrorState;
