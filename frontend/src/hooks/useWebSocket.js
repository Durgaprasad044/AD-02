import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { connectSocket, disconnectSocket, getSocket } from '../services/websocket.service';

// Basic singleton pattern handled by websocket.service.js
export default function useWebSocket() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    connectSocket();
    const socket = getSocket();

    if (socket) {
      const handleUserOnline = (data) => {
        setOnlineUsers((prev) => [...new Set([...prev, data.userId])]);
      };
      
      const handleUserOffline = (data) => {
       setOnlineUsers((prev) => prev.filter(id => id !== data.userId));
      };

      const handleMessageReceived = (message) => {
        // dispatch(addMessage(message)); // requires chatSlice
        console.log('Message Received:', message);
      };

      const handleTypingStart = (data) => {
        setTypingUsers((prev) => [...new Set([...prev, data.userId])]);
      };
      
      const handleTypingEnd = (data) => {
        setTypingUsers((prev) => prev.filter(id => id !== data.userId));
      };

      socket.on('user:online', handleUserOnline);
      socket.on('user:offline', handleUserOffline);
      socket.on('message:received', handleMessageReceived);
      socket.on('typing:start', handleTypingStart);
      socket.on('typing:end', handleTypingEnd);

      return () => {
        socket.off('user:online', handleUserOnline);
        socket.off('user:offline', handleUserOffline);
        socket.off('message:received', handleMessageReceived);
        socket.off('typing:start', handleTypingStart);
        socket.off('typing:end', handleTypingEnd);
      };
    }

    return () => {
      // Disconnect handled at App level, not per component unmount
    };
  }, [dispatch]);

  return { onlineUsers, typingUsers };
}
