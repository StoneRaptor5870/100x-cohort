// import React, { useEffect, useState } from 'react';

// interface WebSocketClientProps {
//   onMessage: (message: string) => void;
// }

// const WebSocketClient: React.FC<WebSocketClientProps> = ({ onMessage }) => {
//   const [ws, setWs] = useState<WebSocket | null>(null);
//   const [userId, setUserId] = useState(''); // State for storing the user ID
//   const [message, setMessage] = useState(''); // State for storing the message

//   useEffect(() => {
//     const websocket = new WebSocket('ws://localhost:8080');

//     websocket.onopen = () => {
//       console.log('WebSocket connected');
//       websocket.send(JSON.stringify({ userId, message: 'Initial message' }));
//     };

//     websocket.onmessage = (event) => {
//       console.log('Received message:', event.data);
//       onMessage(event.data);
//     };

//     websocket.onclose = () => {
//       console.log('WebSocket disconnected');
//     };

//     setWs(websocket);

//     return () => {
//       websocket.close();
//     };
//   }, [userId, message]); // Reconnect when userId or message changes

//   const sendMessage = () => {
//     if (!ws || ws.readyState!== WebSocket.OPEN) return;
//     ws.send(JSON.stringify({ userId, data: message }));
//     setMessage(''); // Clear the message input after sending
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter User ID"
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Enter Message"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send Message</button>

//       {/* Display received messages
//       <ul>
//         {onMessage.call(this, '')} // Assuming onMessage is a method that returns an array of messages
//          .map((msg, index) => (
//             <li key={index}>{msg}</li>
//           ))
//       </ul> */}
//     </div>
//   );
// };

// export default WebSocketClient;

// import React, { useState } from 'react';
// import WebSocketClient from './webSocket/WebSocketClient';
// import './App.css';

// const App: React.FC = () => {
//   const [messages, setMessages] = useState<string[]>([]);

//   const handleMessage = (message: string) => {
//     setMessages((prevMessages) => [...prevMessages, message]);
//   };

//   return (
//     <div>
//       <h1>WebSocket Example</h1>
//       <WebSocketClient onMessage={handleMessage} />
//       <ul>
//         {messages.map((message, index) => (
//           <li key={index}>{message}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;