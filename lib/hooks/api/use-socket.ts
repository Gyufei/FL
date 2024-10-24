import { io, Socket } from "socket.io-client";
import { useEndPoint } from "./use-endpoint";
import { useMemo } from "react";
import { ChainType } from "@/lib/types/chain";

const socketMap = new Map<string, Socket>();

export function useSocket(chain: ChainType) {
  const { wssEndPoint } = useEndPoint();

  const socket = useMemo(() => {
    const so = socketMap.get(chain) || io(`${wssEndPoint}/${chain}`);
    socketMap.set(chain, so);
    return so;
  }, [chain, wssEndPoint]);

  return {
    socket,
  };
}
