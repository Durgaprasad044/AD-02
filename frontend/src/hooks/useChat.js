import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversations, sendMessage, setActiveConversation } from '../store/slices/chatSlice';
import useWebSocket from './useWebSocket';

export default function useChat() {
  const dispatch = useDispatch();
  const { conversations, activeConversationId, messages, loading, error } = useSelector((state) => state.chat);
  const { typingUsers } = useWebSocket(); // Use for displaying "user is typing..."

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  const send = (conversationId, text) => {
    dispatch(sendMessage({ conversationId, text }));
  };

  const selectConversation = (id) => {
    dispatch(setActiveConversation(id));
  };
  
  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const activeMessages = messages[activeConversationId] || [];

  return {
    conversations,
    activeConversation,
    activeMessages,
    loading,
    error,
    sendMessage: send,
    selectConversation,
    typingUsers
  };
}
