import { isProduction } from "@/lib/PathMap";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

export function useWsMsgs() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [msgEvents, setMsgEvents] = useState<any[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMsgEvent(value: any) {
      setMsgEvents((previous: any[]) => [
        ...previous,
        {
          ...value,
          timestamp: Date.now(),
        },
      ]);
    }

    function onError(error: Error) {
      if (isProduction) {
        console.warn("Socket.IO error:", error);
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMsgEvent);
    socket.on("error", onError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMsgEvent);
      socket.off("error", onError);
    };
  }, []);

  return {
    isConnected,
    msgEvents,
  };
}
