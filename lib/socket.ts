import { io } from "socket.io-client";
import { isProduction, WithWss } from "./PathMap";

const URL = WithWss();

export const socket = !isProduction
  ? ({
      connected: false,
      on: () => {},
      off: () => {},
    } as any)
  : io(URL);
