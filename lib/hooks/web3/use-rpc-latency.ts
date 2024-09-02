import useSWR from "swr";
import { useRpc } from "./use-rpc";

export function useRpcLatency(rpc: string) {
  const { testRpcLatency } = useRpc();

  const res = useSWR(rpc, testRpcLatency);

  return res;
}
