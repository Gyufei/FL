import { isProduction } from "@/lib/PathMap";
import { useSocket } from "./use-socket";
import { useEffect, useState } from "react";
import { ChainType } from "@/lib/types/chain";

export interface IMsg {
  amount: string;
  buyer: string;
  item_id: string;
  market_id: string;
  token_amount: string;
  token_mint: string;
  trade_at: number;
  value: string;
}

export function useWsMsgs(chain: ChainType) {
  const { socket } = useSocket(chain);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [msgEvents, setMsgEvents] = useState<Array<IMsg>>([]);

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
