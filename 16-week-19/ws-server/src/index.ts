import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { createClient, RedisClientType } from 'redis';

const app = express();
let wss: WebSocketServer;
let httpServer;

const redisClient: RedisClientType = createClient({
  url: 'redis://127.0.0.1:6379',
});

const redisPublisher: RedisClientType = createClient({
  url: 'redis://127.0.0.1:6379',
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisPublisher.on('error', (err) => console.log('Redis Publisher Error', err));

interface ExtendedWebSocket extends WebSocket {
  userId?: string;
}

async function startServer() {
  try {
    await redisClient.connect();
    await redisPublisher.connect();
    console.log('Connected to Redis');

    // Subscribe to Redis channel with a listener
    redisClient.subscribe('events', (message, channel) => {
      console.log(`Received message from channel ${channel}: ${message}`);
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
        });
      } catch (error) {
        console.error('Error processing Redis message:', error);
      }
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
            console.log(`User ${ws.userId} connected, ${data.data}`);

            // Publish message to Redis using the publisher client
            redisPublisher.publish('events', message.toString());
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