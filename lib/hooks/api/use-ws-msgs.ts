import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export function useWsMsgs() {
  const socketUrl = "wss://echo.websocket.org";

  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const {
    // sendMessage,
    // sendJsonMessage,
    lastMessage,
    // lastJsonMessage,
    readyState,
    // getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log("ws opened"),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (_closeEvent) => true,
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev: any[]) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  return {
    messageHistory,
    connectionStatus,
  };
}
