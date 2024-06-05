import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { createClient, RedisClientType } from 'redis';

const app = express();
let wss: WebSocketServer;
let httpServer;

const redisClient: RedisClientType = createClient({
  url: 'redis://127.0.0.1:6379',
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));

interface ExtendedWebSocket extends WebSocket {
  userId?: string;
}

// Event listener for messages from Redis Pub/Sub
redisClient.on('message', (channel, message) => {
  try {
    const eventData = JSON.parse(message);
    const userId = eventData.userId;
    const data = eventData.data;

    // Find WebSocket connection with matching userId and send event
    wss.clients.forEach((client) => {
      const extendedClient = client as ExtendedWebSocket;
      if (extendedClient.userId === userId && extendedClient.readyState === WebSocket.OPEN) {
        extendedClient.send(JSON.stringify(data));
      }
      redisClient.publish('events', JSON.stringify(data));
    });
  } catch (error) {
    console.error('Error processing Redis message:', error);
  }
});

async function startServer() {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');

    // Subscribe to Redis channel with a listener
    redisClient.subscribe('events', (message, channel) => {
      console.log(`Received message from channel ${channel}: ${message}`);
    });

    httpServer = app.listen(8080, () => {
      console.log('Server is running on port 8080');
    });

    wss = new WebSocketServer({ server: httpServer });
    console.log('WebSocket server is running');

    wss.on('connection', (ws: ExtendedWebSocket) => {
      console.log('Client connected');

      // Event listener for messages from the client
      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message.toString());
          if (data.userId) {
            // Store user id with WebSocket connection
            ws.userId = data.userId;
            console.log(`User ${ws.userId} connected`);
          } else {
            console.error('Invalid message format');
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });

      ws.send('Hello! Message From Server!!');

      ws.on('close', () => {
        console.log(`User ${ws.userId} disconnected`);
      });
    });
  } catch (error) {
    console.error('Failed to connect to Redis', error);
  }
}

startServer();
