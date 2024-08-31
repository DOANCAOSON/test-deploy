"use client";

import auth from "@/utils/auth";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

const SOCKET_URL = "https://ws.banhgio88.com/chat";

type Message = {
  id: string;
  avatar: string;
  userName: string;
  content: string;
};

function MatchChat() {
  const [stats, setStats] = useState<any[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const lastMessageTimeRef = useRef(0); 
console.log(messages)
  useEffect(() => {
    const fetchToken = async () => {
      const token = await auth.getToken();
      if (token) {
        const newConnection = new signalR.HubConnectionBuilder()
          .withUrl(`${SOCKET_URL}?access_token=Bearer%20${token}`, {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets,
          })
          .configureLogging(signalR.LogLevel.Information)
          .build();

        newConnection
          .start()
          .then(() => {
            console.log("SignalR connected");

            newConnection
              .invoke("JoinRoom", 359720621)
              .catch((error) => console.log("Join room error: ", error));
            newConnection.on("ReceiveNotification", handleReceiveNotification);

            setConnection(newConnection);
          })
          .catch((error) => console.log("SignalR connection error: ", error));

        return () => {
          if (newConnection) {
            newConnection
              .invoke("LeaveRoom", 359720621)
              .catch((error) => console.log("Leave room error: ", error));

            newConnection
              .stop()
              .then(() => console.log("SignalR disconnected"));
          }
        };
      } else{
        const newConnection = new signalR.HubConnectionBuilder()
          .withUrl(`${SOCKET_URL}`, {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets,
          })
          .configureLogging(signalR.LogLevel.Information)
          .build();

        newConnection
          .start()
          .then(() => {
            console.log("SignalR connected");

            newConnection
              .invoke("JoinRoom", 359720621)
              .catch((error) => console.log("Join room error: ", error));
            newConnection.on("ReceiveNotification", handleReceiveNotification);

            setConnection(newConnection);
          })
          .catch((error) => console.log("SignalR connection error: ", error));

        return () => {
          if (newConnection) {
            newConnection
              .invoke("LeaveRoom", 359720621)
              .catch((error) => console.log("Leave room error: ", error));

            newConnection
              .stop()
              .then(() => console.log("SignalR disconnected"));
          }
        };
      }
    };

    fetchToken();
  }, []);

  const handleReceiveNotification = (message: any, type: number) => {
    const parsedData =
      typeof message === "string" ? JSON.parse(message) : message;

    const currentTime = Date.now();
    if (currentTime - lastMessageTimeRef.current > 1000) {
      switch (type) {
        case 5: // PreviousMessages
          setMessages(parsedData.messages);
          break;
        case 4: // UserMessage
        case 6: // BotMessage
          setMessages((prevMessages) => [...prevMessages, parsedData]);
          break;
        case 104: // StatsMatchChange
          if (message.typeName === "StatsMatchChange") {
            setStats(message.newStats);
          }
          break;
        default:
          console.log(`Unhandled notification type: ${type}`);
          console.log(`Unhandled notification message: ${message}`);
          break;
      }
      lastMessageTimeRef.current = currentTime;
    }
  };

  const renderMessage = (message: Message) => (
    <div
      key={message.id}
      className="flex items-center p-2 border-b border-gray-200"
    >
      <div className="mr-2">
        <Image
          src={message.avatar}
          alt="User Avatar"
          className="w-6 h-6 rounded-full"
        />
      </div>
      <div className="flex-grow">
        <div className="font-medium">{message.userName}</div>
        <div className="text-gray-600">{message.content}</div>
      </div>
    </div>
  );

  return (
    <div className="w-4/12 hidden lg:block sticky top-[140px] xl:h-[calc(100vh-100px)]">
      <div className="w-full rounded-md border bg-card text-card-foreground">
        <div dir="ltr" data-orientation="horizontal" className="w-full">
          <div
            role="tablist"
            aria-orientation="horizontal"
            className="h-9 items-center justify-center bg-muted p-1 text-muted-foreground grid w-full grid-cols-2 rounded-none"
            tabIndex={0}
            data-orientation="horizontal"
            style={{ outline: "none" }}
          >
            <button
              type="button"
              role="tab"
              aria-selected="true"
              aria-controls="radix-:Rl7puducqba:-content-chat"
              data-state="active"
              id="radix-:Rl7puducqba:-trigger-chat"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow data-[state=active]:bg-primary data-[state=active]:text-white"
              tabIndex={-1}
              data-orientation="horizontal"
              data-radix-collection-item
            >
              Chat
            </button>
            <button
              type="button"
              role="tab"
              aria-selected="false"
              aria-controls="radix-:Rl7puducqba:-content-tips"
              data-state="inactive"
              id="radix-:Rl7puducqba:-trigger-tips"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow data-[state=active]:bg-primary data-[state=active]:text-white"
              tabIndex={-1}
              data-orientation="horizontal"
              data-radix-collection-item
            >
              Tips
            </button>
          </div>
          <div
            data-state="active"
            data-orientation="horizontal"
            role="tabpanel"
            aria-labelledby="radix-:Rl7puducqba:-trigger-chat"
            id="radix-:Rl7puducqba:-content-chat"
            tabIndex={0}
            className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {messages.map(renderMessage)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchChat;
