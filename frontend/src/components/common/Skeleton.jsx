import React from 'react';
import '../../index.css';

const Skeleton = ({ width = '100%', height = '1rem', borderRadius = '4px', style = {} }) => {
  const skeletonStyle = {
    display: 'inline-block',
    width: width,
    height: height,
    borderRadius: borderRadius,
    backgroundColor: '#E5E7EB',
    animation: 'pulse 1.5s infinite ease-in-out',
    ...style,
  };

  return <div className="skeleton" style={skeletonStyle} />;
};

export default Skeleton;
