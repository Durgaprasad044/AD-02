import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../index.css';

const CompatibilityScore = ({ score }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    // Small delay to trigger animation
    const timer = setTimeout(() => {
      setAnimatedWidth(Math.min(100, Math.max(0, score)));
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = (value) => {
    if (value >= 80) return 'var(--color-primary)'; // Changed to primary green
    if (value >= 50) return 'var(--color-warning, #f59e0b)';
    return 'var(--color-error, #ef4444)';
  };

  const color = getScoreColor(score);

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '4px',
  };

  const bgBarStyle = {
    flex: 1,
    height: '6px',
    backgroundColor: 'var(--color-border)', // Updated to CSS Variable
    borderRadius: '9999px',
    overflow: 'hidden',
  };

  const fillBarStyle = {
    width: `${animatedWidth}%`,
    height: '100%',
    backgroundColor: color,
    borderRadius: '9999px',
    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const labelStyle = {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: color,
    minWidth: '40px',
    textAlign: 'right',
  };

  return (
    <div style={containerStyle} title={`Compatibility Score: ${score}%`}>
      <div style={bgBarStyle}>
        <div style={fillBarStyle} />
      </div>
      <div style={labelStyle}>
        {score}%
      </div>
    </div>
  );
};

CompatibilityScore.propTypes = {
  score: PropTypes.number.isRequired,
};

export default CompatibilityScore;
