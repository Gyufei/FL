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

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMsgEvent);
    socket.on("error", () => {});

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMsgEvent);
    };
  }, []);

  return {
    isConnected,
    msgEvents,
  };
}
