import React, { useState, useRef, useEffect } from 'react';
import './App.css'

const App: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      ws.current = new WebSocket('ws://localhost:8080');

      ws.current.onopen = () => {
        console.log('WebSocket connection opened');
      };

      ws.current.onmessage = (event) => {
        console.log('Message from server:', event.data);
        setMessages((prevMessages) => [...prevMessages, event.data]);
      };

      ws.current.onclose = () => {
        console.log('WebSocket connection closed');
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  };

  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ userId, data });
      ws.current.send(message);
      console.log('Message sent:', message);
    } else {
      console.error('WebSocket is not open');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div id='websocket-client'>
      <h1>WebSocket Client</h1>
      <form id='form' onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data:</label>
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
      <div>
        <h2>Messages from Server:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;