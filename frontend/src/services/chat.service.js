import api from './api';

export const getConversations = () => {
  return api.get('/chats');
};

export const getMessages = (chatId) => {
  return api.get(`/chats/${chatId}/messages`);
};

export const sendMessage = (chatId, content) => {
  return api.post(`/chats/${chatId}/messages`, { content });
};

export const createConversation = (participantId) => {
  return api.post('/chats', { participantId });
};

export default {
  getConversations,
  getMessages,
  sendMessage,
  createConversation,
};
