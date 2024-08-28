import { useMemo } from "react";
import { useSolanaConfig } from "./solana/use-solana-config";
import { useAtomValue } from "jotai";
import { CustomRpcsAtom, GlobalRpcsAtom } from "@/lib/states/cluster";

export function useRpc() {
  const { clusterConfig } = useSolanaConfig();

  const globalRpcs = useAtomValue(GlobalRpcsAtom);
  const customRpcs = useAtomValue(CustomRpcsAtom);

  const rpc = useMemo(() => {
    if (customRpcs[clusterConfig.network]) {
      return customRpcs[clusterConfig.network]!;
    }

    return globalRpcs[clusterConfig.network];
  }, [clusterConfig, globalRpcs, customRpcs]);

  return {
    rpc,
  };
}
