import { io } from 'socket.io-client';
import store from '../store';
import { receiveMessage } from '../store/slices/chatSlice';
import { addPost } from '../store/slices/feedSlice';
import { fetchMatches } from '../store/slices/matchesSlice';

let socket = null;

export const connectSocket = () => {
  if (socket) return;

  const token = localStorage.getItem('token');
  if (!token) return;

  socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:5000', {
    auth: { token },
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.on('new_message', (message) => {
    store.dispatch(receiveMessage(message));
  });

  socket.on('message:received', (message) => {
    store.dispatch(receiveMessage(message));
  });

  socket.on('post:new', (post) => {
    store.dispatch(addPost(post));
  });

  socket.on('match:update', () => {
    store.dispatch(fetchMatches());
  });

  socket.on('user_online', (data) => {
    console.log('User online:', data);
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const sendMessage = (messageData) => {
  if (socket) {
    socket.emit('send_message', messageData);
  }
};

export default {
  connectSocket,
  disconnectSocket,
  sendMessage,
};
