import React, { useState } from 'react';
import WebSocketClient from './webSocket/WebSocketClient';
import './App.css';

const App: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleMessage = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <WebSocketClient onMessage={handleMessage} />
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
