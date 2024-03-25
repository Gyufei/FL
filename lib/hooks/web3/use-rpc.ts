import { useMemo } from "react";
import { useClusterConfig } from "./use-cluster-config";
import { useAtomValue } from "jotai";
import { CustomRpcsAtom } from "@/lib/states/cluster";
import { Connection } from "@solana/web3.js";

export function useRpc() {
  const { clusterConfig } = useClusterConfig();
  const customRpcs = useAtomValue(CustomRpcsAtom);

  const rpc = useMemo(() => {
    if (customRpcs[clusterConfig.network]) {
      return customRpcs[clusterConfig.network]!;
    }

    return clusterConfig.rpcEndpoint;
  }, [clusterConfig, customRpcs]);

  async function testRpcLatency(testRpc: string) {
    const connection = new Connection(testRpc);

    const startTimestamp = Date.now();
    // 调用特定的 RPC
    await connection.getEpochInfo();
    const endTimestamp = Date.now();

    const latency = endTimestamp - startTimestamp;

    return latency;
  }

  return {
    rpc,
    testRpcLatency,
  };
}
