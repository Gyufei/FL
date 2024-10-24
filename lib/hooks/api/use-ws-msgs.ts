import { isProduction } from "@/lib/PathMap";
import { useSocket } from "./use-socket";
import { useEffect, useState } from "react";

export function useWsMsgs() {
  const { socket } = useSocket();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [msgEvents, setMsgEvents] = useState<any[]>([]);

  // 模拟1分钟发一次
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setMsgEvents((previous: any[]) => [
  //       ...previous,
  //       {
  //         timestamp: Date.now(),
  //       },
  //     ]);
  //   }, 60000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMsgEvent(value: any) {
      console.log("🚀 ~ onMsgEvent ~ value:", value);
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
