import { io } from "socket.io-client";
import { useEndPoint } from "./use-endpoint";

let SocketInst: any;

export function useSocket() {
  const { wssEndPoint } = useEndPoint();
  const socket = SocketInst || io(wssEndPoint);
  SocketInst = socket;

  return {
    socket,
  };
}
