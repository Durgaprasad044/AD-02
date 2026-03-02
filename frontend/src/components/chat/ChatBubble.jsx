import React from 'react';
import PropTypes from 'prop-types';
import '../../index.css';

const ChatBubble = ({ message, isSender, timestamp }) => {
  const containerStyle = {
    maxWidth: '75%',
    alignSelf: isSender ? 'flex-end' : 'flex-start',
    marginBottom: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: isSender ? 'flex-end' : 'flex-start',
  };

  const bubbleStyle = {
    padding: '12px 16px',
    borderRadius: '16px',
    borderBottomRightRadius: isSender ? '4px' : '16px',
    borderBottomLeftRadius: isSender ? '16px' : '4px',
    backgroundColor: isSender ? 'var(--color-primary)' : 'white',
    color: isSender ? 'white' : 'var(--color-text-primary)',
    border: isSender ? 'none' : '1px solid var(--color-border)',
    boxShadow: isSender 
      ? '0 1px 2px rgba(37, 99, 235, 0.3)' 
      : '0 1px 2px rgba(0, 0, 0, 0.05)',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    position: 'relative',
    wordWrap: 'break-word',
  };

  const timeStyle = {
    fontSize: '0.7rem',
    marginTop: '4px',
    color: 'var(--color-text-secondary)',
    padding: '0 4px',
    fontWeight: 500,
  };

  return (
    <div style={containerStyle}>
      <div style={bubbleStyle}>
        {message}
      </div>
      {timestamp && <span style={timeStyle}>{timestamp}</span>}
    </div>
  );
};

ChatBubble.propTypes = {
  message: PropTypes.string.isRequired,
  isSender: PropTypes.bool,
  timestamp: PropTypes.string,
};

export default ChatBubble;
