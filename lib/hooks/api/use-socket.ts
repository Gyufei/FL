import { io } from "socket.io-client";
import { useEndPoint } from "./use-endpoint";

export function useSocket() {
  const { wssEndPoint } = useEndPoint();
  const socket = io(wssEndPoint);

  return {
    socket,
  };
}
