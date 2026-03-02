import React, { useState } from 'react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import '../../index.css';

const CreatePost = ({ onPost, user }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    await onPost(content);
    setLoading(false);
    setContent('');
  };

  const containerStyle = {
    display: 'flex',
    gap: 'var(--spacing-md)',
  };

  const inputContainerStyle = {
    flex: 1,
    backgroundColor: isFocused ? 'var(--color-muted)' : 'transparent',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--spacing-md)',
    border: `1px solid ${isFocused ? 'var(--color-primary)' : 'var(--color-border)'}`,
    transition: 'all var(--transition-normal)',
  };

  const inputStyle = {
    width: '100%',
    border: 'none',
    outline: 'none',
    resize: 'none',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    minHeight: isFocused ? '100px' : '48px',
    backgroundColor: 'transparent',
    color: 'var(--color-foreground)',
    transition: 'min-height var(--transition-fast)',
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'var(--spacing-sm)',
    paddingTop: isFocused ? 'var(--spacing-sm)' : 0,
    borderTop: isFocused ? '1px solid var(--color-border)' : 'none',
    opacity: isFocused || content ? 1 : 0,
    height: isFocused || content ? 'auto' : 0,
    overflow: 'hidden',
    transition: 'all var(--transition-fast)',
  };

  return (
    <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
      <div style={containerStyle}>
        <Avatar src={user?.avatar} name={user?.name} size="md" />
        <div style={inputContainerStyle}>
          <textarea
            placeholder={`What's happening, ${user?.name || 'Guest'}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => !content && setIsFocused(false)}
            style={inputStyle}
          />
          <div style={footerStyle}>
             <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-foreground)' }}>
                {content.length > 0 && `${content.length} chars`}
             </div>
            <Button
              label={loading ? 'Publishing...' : 'Publish Post'}
              variant="primary"
              disabled={!content.trim() || loading}
              loading={loading}
              onClick={handleSubmit}
              size="sm"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CreatePost;
