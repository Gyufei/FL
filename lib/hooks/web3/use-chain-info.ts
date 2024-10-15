import { ChainConfigs, IChainConfig } from "@/lib/const/chain-config";
import { ENetworks } from "@/lib/states/network";
import { useCallback } from "react";

export function useChainInfo() {
  const getChainAlias = useCallback((c: ENetworks) => {
    switch (c) {
      case ENetworks.Solana:
        return ChainConfigs.solana.alias;
      case ENetworks.Eth:
        return ChainConfigs.eth.alias;
      case ENetworks.Bsc:
        return ChainConfigs.bnb.alias;
      default:
        return "";
    }
  }, []);

  const getChainInfo = useCallback((c: string) => {
    switch (c) {
      case "eth":
        return ChainConfigs.eth;
      case "bnb":
        return ChainConfigs.eth;
      case "solana":
        return ChainConfigs.solana;
      default:
        return {
          name: "",
          alias: "",
          logo: "/icons/empty.svg",
        } as IChainConfig;
    }
  }, []);

  return {
    getChainInfo,
    getChainAlias,
  };
}
