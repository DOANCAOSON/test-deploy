'use client'
import React, { useState, useEffect } from 'react';

interface Message {
  id: string; // Assuming messages have an 'id' property
  content: string;
}

const MyComponent: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!window.WebSocket) {
      return;
    }

    const url = 'wss://ws.banhgio88.com/push/match';

    const connection = new WebSocket(url);

    connection.onopen = () => {
      console.log('WebSocket connection opened');
      setWs(connection);
    };

    connection.onmessage = (event: MessageEvent<string>) => {
      console.log(event); 
      try {
        const message: Message = JSON.parse(event.data);
        setMessages([...messages, message]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    connection.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => connection.close();
  }, []);
  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
      <button>
        Send Message
      </button>
    </div>
  );
};

export default MyComponent;
