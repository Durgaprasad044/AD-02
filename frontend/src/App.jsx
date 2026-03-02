import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import { connectSocket, disconnectSocket } from './services/websocket.service';
import './App.css';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      connectSocket();
    } else {
      disconnectSocket();
    }
  }, [isAuthenticated]);

  return (
    <div className="app-root">
      <AppNavigator />
    </div>
  );
}

export default App;
