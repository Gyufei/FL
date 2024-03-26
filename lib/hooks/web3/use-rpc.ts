import { useMemo } from "react";
import { useClusterConfig } from "./use-cluster-config";
import { useAtomValue } from "jotai";
import { CustomRpcsAtom, GlobalRpcsAtom } from "@/lib/states/cluster";

export function useRpc() {
  const { clusterConfig } = useClusterConfig();

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
