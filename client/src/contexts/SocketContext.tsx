"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { getUserInfo } from "@/services/auth.service";
import { notification } from 'antd';

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  console.log(socket)
  
  useEffect(() => {
    const socketInstance = io("http://localhost:5000");
    setSocket(socketInstance);
    
    // Get user info for joining room
    const userInfo = getUserInfo() as any;
    console.log(userInfo);
    if (userInfo && userInfo.userId) {
      socketInstance.emit('join', { mobile: userInfo.userId });
    }
    
    // Listen for transaction notifications
    socketInstance.on('notification', (data) => {
      notification.open({
        message: 'Transaction Alert',
        description: data.message,
        type: data.type === 'credit' ? 'success' : 'info',
      });
    });
    
    // Listen for general transactions
    socketInstance.on('transaction', (data) => {
      console.log('Transaction occurred:', data);
      // You could update global state here if needed
    });
    
    return () => {
      socketInstance.disconnect();
    };
  }, []);
  
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};