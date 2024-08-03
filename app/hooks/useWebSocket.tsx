// hooks/useWebSocket.js
import { useCallback, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import queryClient from "../utils/queryClient";

type WebSocketArgs = {
  url: string;
  sts?: string;
  queryKey: string;
};

const useWebSocket = ({ url, sts = "connecting", queryKey }: WebSocketArgs) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState<string>(sts);

  const initializeSocket = useCallback(() => {
    const token = localStorage.getItem("access_token");

    const socketInstance = io(url, {
      transports: ["websocket"],
      auth: {
        authorization: `Bearer ${token}`,
      },
    });

    // console.log(socketInstance);

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      setStatus("Connected");
      // console.log("Connected to WebSocket server");
    });

    socketInstance.on("connect_error", () => {
      setStatus("Failed to connect");
    });

    socketInstance.on("message", (newMessage: string) => {
      console.log("baru");

      queryClient.setQueryData<string[]>(queryKey, (oldMessages) => {
        return oldMessages ? [...oldMessages, newMessage] : [newMessage];
      });
    });

    return socketInstance;
  }, [url, queryKey]);

  useEffect(() => {
    const socketInstance = initializeSocket();

    return () => {
      socketInstance.disconnect();
    };
  }, [initializeSocket]);

  const sendMessage = (message: string, team_id: any) => {
    if (socket) {
      const payload = {
        message,
        team_id,
      };

      const jsonString = JSON.stringify(payload);
      socket.emit("message", payload);
    }
  };

  const reconnect = () => {
    if (socket) {
      socket.disconnect();
      const newSocket = initializeSocket();
      setSocket(newSocket);
    }
  };

  return { sendMessage, reconnect, status };
};

export default useWebSocket;
