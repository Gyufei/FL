import { Connection } from "@solana/web3.js";
import useSWR from "swr";

export function useRpcLatency(rpc: string) {
  async function testRpcLatency(testRpc: string) {
    const connection = new Connection(testRpc);

    const startTimestamp = Date.now();
    await connection.getEpochInfo();
    const endTimestamp = Date.now();

    const latency = endTimestamp - startTimestamp;

    return latency;
  }

  const res = useSWR(rpc, testRpcLatency);

  return res;
}
