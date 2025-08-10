import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import io, { Socket } from 'socket.io-client';
import { Message } from '../stores/userStore';
import { decryptEncryptedKey, encryptMessage } from '../utils/crypto';

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

  const sendMessage = async (payload: Message) => {
    if (socketRef.current) {
      const encrypted_gck = localStorage.getItem('encrypted_gck');
      const private_key = localStorage.getItem(
        `rsa-private-key-${payload.user_id}`
      );
      if (encrypted_gck && private_key) {
        const gck = await decryptEncryptedKey(encrypted_gck, private_key);
        const originalMessage = payload.message;
        const { ciphertext, iv } = await encryptMessage(payload.message, gck);
        payload.message = ciphertext;
        payload.iv = iv;

        socketRef.current.emit('message', payload);
      }
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
