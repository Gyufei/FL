import {
  ClusterAtom,
  DevnetCluster,
  MainnetCluster,
} from "@/lib/states/cluster";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useAtom } from "jotai";
import { useCallback, useEffect, useMemo } from "react";

export function useClusterConfig() {
  const [cluster, setCluster] = useAtom(ClusterAtom);

  useEffect(() => {
    if (localStorage.getItem("cluster") === "0") {
      localStorage.setItem(
        "cluster",
        JSON.stringify(WalletAdapterNetwork.Mainnet),
      );
    }
    if (localStorage.getItem("cluster") === "1") {
      localStorage.setItem(
        "cluster",
        JSON.stringify(WalletAdapterNetwork.Devnet),
      );
    }
  }, []);

  const clusterConfig = useMemo(() => {
    if (cluster === WalletAdapterNetwork.Mainnet) {
      return MainnetCluster;
    }

    if (cluster === WalletAdapterNetwork.Devnet) {
      return DevnetCluster;
    }

    return MainnetCluster;
  }, [cluster]);

  const setClusterType = useCallback(
    (type: WalletAdapterNetwork) => {
      setCluster(type);
    },
    [setCluster],
  );

  return {
    clusterConfig,
    setClusterType,
  };
}
