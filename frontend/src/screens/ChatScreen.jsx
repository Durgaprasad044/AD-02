import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversations, fetchMessages, sendMessage, setActiveChat } from '../store/slices/chatSlice';
import Button from '../components/common/Button.jsx';
import Avatar from '../components/common/Avatar.jsx';
import Loader from '../components/common/Loader.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import ErrorState from '../components/common/ErrorState.jsx';

function ChatScreen() {
  const dispatch = useDispatch();
  const { conversations, messages, activeChatId, loading, error } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    if (activeChatId) {
      dispatch(fetchMessages(activeChatId));
    }
  }, [activeChatId, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim() || !activeChatId) return;
    dispatch(sendMessage({ chatId: activeChatId, content: newMessage }));
    setNewMessage('');
  };

  const currentChat = conversations.find(c => c.id === activeChatId);

  const containerStyle = {
    display: 'flex',
    height: 'calc(100vh - 72px)', 
    backgroundColor: 'var(--color-background)',
    overflow: 'hidden',
    borderTop: '1px solid var(--color-border)',
  };

  const sidebarStyle = {
    width: '320px',
    backgroundColor: 'var(--color-sidebar)',
    borderRight: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
  };

  const chatAreaStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--color-card)',
    position: 'relative'
  };

  const conversationItemStyle = (isActive) => ({
    padding: 'var(--spacing-md) var(--spacing-lg)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
    cursor: 'pointer',
    backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
    borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
    borderBottom: '1px solid var(--color-border)',
    transition: 'all var(--transition-fast)',
  });

  const messageBubbleStyle = (isSender) => ({
    maxWidth: '70%',
    padding: 'var(--spacing-sm) var(--spacing-lg)',
    borderRadius: isSender ? 'var(--radius-lg) var(--radius-lg) 0 var(--radius-lg)' : 'var(--radius-lg) var(--radius-lg) var(--radius-lg) 0',
    backgroundColor: isSender ? 'var(--color-accent)' : 'var(--color-muted)',
    color: isSender ? 'var(--color-accent-foreground)' : 'var(--color-foreground)',
    fontWeight: isSender ? '500' : '400',
    alignSelf: isSender ? 'flex-end' : 'flex-start',
    marginBottom: 'var(--spacing-md)',
    lineHeight: 1.6,
    border: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-sm)',
  });

  if (loading && conversations.length === 0) {
    return (
      <div style={{ height: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader />
      </div>
    );
  }

  if (error && conversations.length === 0) {
    return (
      <div style={{ padding: 'var(--spacing-xl)' }}>
        <ErrorState message={error} onRetry={() => dispatch(fetchConversations())} />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-border)' }}>
          <h3 style={{ margin: 0, color: 'var(--color-foreground)' }}>Messages</h3>
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {conversations.length === 0 ? (
            <div style={{ padding: 'var(--spacing-lg)', textAlign: 'center', color: 'var(--color-muted-foreground)' }}>
              No conversations yet.
            </div>
          ) : (
            conversations.map((chat) => (
              <div
                key={chat.id}
                style={conversationItemStyle(chat.id === activeChatId)}
                onClick={() => dispatch(setActiveChat(chat.id))}
              >
                <Avatar name={chat.name || 'User'} size="md" />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-foreground)' }}>{chat.name || 'Unknown User'}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-muted-foreground)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {chat.lastMessage?.content || 'Start chatting...'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={chatAreaStyle}>
        {activeChatId ? (
          <>
            {/* Header */}
            <div style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              borderBottom: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                <Avatar name={currentChat?.name || 'User'} size="sm" />
                <h4 style={{ margin: 0, color: 'var(--color-foreground)' }}>{currentChat?.name || 'Chat'}</h4>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: 'var(--spacing-lg)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              {messages.map((msg, index) => (
                <div key={index} style={messageBubbleStyle(msg.senderId === user?.id)}>
                  {msg.content}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: 'var(--spacing-lg)',
              backgroundColor: 'var(--color-card)',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              gap: 'var(--spacing-md)'
            }}>
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-muted)',
                  color: 'var(--color-foreground)',
                  outline: 'none',
                  fontFamily: 'inherit',
                }} />
              <Button 
                label="Send" 
                variant="primary"
                onClick={handleSend} 
                disabled={!newMessage.trim()} 
              />
            </div>
          </>
        ) : (
          <EmptyState
            icon="💬"
            title="Select a conversation"
            message="Choose a chat from the sidebar to start messaging." />
        )}
      </div>
    </div>
  );
}

export default ChatScreen;
