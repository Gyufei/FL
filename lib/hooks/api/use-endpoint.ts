import { useMemo } from "react";
import { useClusterConfig } from "../web3/use-cluster-config";

export function useEndPoint() {
  const { clusterConfig } = useClusterConfig();

  const apiEndPoint = useMemo(() => {
    return clusterConfig?.api.default;
  }, [clusterConfig]);

  const tokenEndPoint = useMemo(() => {
    return clusterConfig?.api.tokenApi;
  }, [clusterConfig]);

  return {
    apiEndPoint,
    tokenEndPoint,
  };
}
