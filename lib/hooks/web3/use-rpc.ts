import { useCallback, useMemo } from "react";
import { useAtom } from "jotai";
import { CustomRpcsAtom, GlobalRpcsAtom } from "@/lib/states/rpc";
import { useCurrentChain } from "./use-current-chain";
import { Connection } from "@solana/web3.js";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { isProduction } from "@/lib/PathMap";
import { testnet } from "@/components/provider/wallet-context/testnet";
import { ChainConfigs } from "@/lib/const/chain-config";

export function useRpc() {
  const { isEvm, currentChainInfo } = useCurrentChain();

  const [globalRpcs, setGlobalRpc] = useAtom(GlobalRpcsAtom);
  const [customRpcs, setCustomRpc] = useAtom(CustomRpcsAtom);

  const chainRpcs = currentChainInfo.rpcs;
  const saveRpcChainKey = currentChainInfo.alias;
  const saveRpcNetKey = currentChainInfo.network;

  const currentGlobalRpc = useMemo(() => {
    return globalRpcs[saveRpcNetKey];
  }, [globalRpcs, saveRpcNetKey]);

  const currentCustomRpc = useMemo(() => {
    return customRpcs[saveRpcNetKey];
  }, [customRpcs, saveRpcNetKey]);

  const currentSolanaRpc = useMemo(() => {
    const alias = ChainConfigs.solana.alias;

    if (customRpcs[alias]) {
      return customRpcs[alias];
    }

    return globalRpcs[alias];
  }, [customRpcs, globalRpcs]);

  const currentEthRpc = useMemo(() => {
    const alias = ChainConfigs.eth.alias;
    if (customRpcs[alias]) {
      return customRpcs[alias];
    }

    return globalRpcs[alias];
  }, [customRpcs, globalRpcs]);

  const currentBscRpc = useMemo(() => {
    const alias = ChainConfigs.bnb.alias;
    if (customRpcs[alias]) {
      return customRpcs[alias];
    }

    return globalRpcs[alias];
  }, [customRpcs, globalRpcs]);

  const rpc = useMemo(() => {
    if (customRpcs[saveRpcChainKey]) {
      return customRpcs[saveRpcChainKey]!;
    }

    return globalRpcs[saveRpcChainKey];
  }, [globalRpcs, customRpcs, saveRpcChainKey]);

  const setGlobalRpcAction = useCallback(
    (rpcStr: string) => {
      return setGlobalRpc((prev) => {
        return {
          ...prev,
          [saveRpcChainKey]: rpcStr,
        };
      });
    },
    [setGlobalRpc, saveRpcChainKey],
  );

  const setCustomRpcAction = useCallback(
    (rpcStr: string | null) => {
      return setCustomRpc((prev) => {
        return {
          ...prev,
          [saveRpcChainKey]: rpcStr,
        };
      });
    },
    [setCustomRpc, saveRpcChainKey, saveRpcNetKey],
  );

  async function testRpcLatency(testRpc: string) {
    let startTimestamp: number;
    let endTimestamp: number;

    if (isEvm) {
      const publicClient = createPublicClient({
        chain: isProduction ? mainnet : testnet,
        transport: http(testRpc),
      });

      startTimestamp = Date.now();
      await publicClient.getChainId();
      endTimestamp = Date.now();
    } else {
      const connection = new Connection(testRpc);

      startTimestamp = Date.now();
      await connection.getEpochInfo();
      endTimestamp = Date.now();
    }

    const latency = endTimestamp - startTimestamp;

    return latency;
  }

  return {
    chainRpcs,
    currentGlobalRpc,
    currentCustomRpc,
    currentSolanaRpc,
    currentEthRpc,
    currentBscRpc,
    setGlobalRpcAction,
    setCustomRpcAction,
    testRpcLatency,
    rpc,
  };
}
