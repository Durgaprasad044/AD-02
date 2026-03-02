import React from 'react';
import useWebSocket from '../../hooks/useWebSocket';

export default function AvailabilityStatus({ userId, fallbackStatus }) {
  // Assuming useWebSocket gives us real-time status if available
  const { onlineUsers } = useWebSocket();
  
  // If user is connected via websocket, they are online. Otherwise use fallback props.
  const isOnline = onlineUsers?.includes(userId) || fallbackStatus === 'online';

  const dotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: isOnline ? 'var(--color-primary)' : 'var(--color-text-secondary)',
    display: 'inline-block',
    marginRight: '6px',
    boxShadow: isOnline ? '0 0 8px var(--color-primary)' : 'none',
    animation: isOnline ? 'pulse 2s infinite' : 'none'
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', color: isOnline ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>
      <span style={dotStyle} />
      <span>{isOnline ? 'Online now' : 'Offline'}</span>
      {isOnline && (
        <style>
          {`
            @keyframes pulse {
              0% { box-shadow: 0 0 0 0 rgba(62, 207, 142, 0.4); }
              70% { box-shadow: 0 0 0 6px rgba(62, 207, 142, 0); }
              100% { box-shadow: 0 0 0 0 rgba(62, 207, 142, 0); }
            }
          `}
        </style>
      )}
    </div>
  );
}
