import { io, Socket } from "socket.io-client";
import { useEndPoint } from "./use-endpoint";
import { useMemo } from "react";
import { useCurrentChain } from "../web3/use-current-chain";

const socketMap = new Map<string, Socket>();

export function useSocket() {
  const { wssEndPoint } = useEndPoint();
  const { isEth, isBsc } = useCurrentChain();

  const socket = useMemo(() => {
    const key = `${isEth ? "eth" : isBsc ? "bsc" : "solana"}`;
    const so = socketMap.get(key) || io(wssEndPoint);
    socketMap.set(key, so);
    return so;
  }, [isEth, isBsc, wssEndPoint]);

  return {
    socket,
  };
}
