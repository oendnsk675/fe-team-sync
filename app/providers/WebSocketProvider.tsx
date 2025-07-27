import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import io, { Socket } from 'socket.io-client';

interface WebSocketContextType {
  socket: Socket | null;
  status: string;
  sendMessage: (payload: any) => void;
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  status: 'disconnected',
  sendMessage: () => {},
});

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [status, setStatus] = useState('connecting');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    const socketInstance = io('http://localhost:3000', {
      transports: ['websocket'],
      auth: {
        authorization: `Bearer ${token}`,
      },
    });

    socketRef.current = socketInstance;

    socketInstance.on('connect', () => {
      console.log('[WS] Connected');
      setStatus('connected');
    });

    socketInstance.on('disconnect', () => {
      console.log('[WS] Disconnected');
      setStatus('disconnected');
    });

    socketInstance.on('connect_error', (err) => {
      console.error('[WS] Connection error:', err);
      setStatus('error');
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = (payload: any) => {
    if (socketRef.current) {
      socketRef.current.emit('message', payload);
    }
  };

  return (
    <WebSocketContext.Provider
      value={{ socket: socketRef.current, status, sendMessage }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
