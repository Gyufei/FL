import { useMemo } from "react";
import { useClusterConfig } from "../common/use-cluster-config";

export function useEndPoint() {
  const { clusterConfig } = useClusterConfig();

  const apiEndPoint = useMemo(() => {
    return clusterConfig?.api.default;
  }, [clusterConfig]);

  const tokenEndPoint = useMemo(() => {
    return "https://token.jup.ag/strict";
  }, []);

  return {
    apiEndPoint,
    tokenEndPoint,
  };
}
