import { useCallback, useMemo } from "react";
import { useSolanaConfig } from "./solana/use-solana-config";
import { useAtom } from "jotai";
import { CustomRpcsAtom, GlobalRpcsAtom } from "@/lib/states/rpc";
import { useEthConfig } from "./use-eth-config";
import { EthRPCS } from "@/lib/const/eth";
import { SolanaRPCS } from "@/lib/const/solana";
import { useCurrentChain } from "./use-current-chain";
import { Connection } from "@solana/web3.js";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { isProduction } from "@/lib/PathMap";
import { testnet } from "@/components/provider/web3-modal/testnet";

export function useRpc() {
  const { isEth, isSolana } = useCurrentChain();

  const { ethConfig } = useEthConfig();
  const { solanaConfig } = useSolanaConfig();

  const [globalRpcs, setGlobalRpc] = useAtom(GlobalRpcsAtom);
  const [customRpcs, setCustomRpc] = useAtom(CustomRpcsAtom);

  const chainRpcs = useMemo(() => {
    if (isEth) {
      return EthRPCS;
    }

    if (isSolana) {
      return SolanaRPCS;
    }

    return SolanaRPCS;
  }, [isEth, isSolana]);

  const saveRpcChainKey = useMemo(() => (isEth ? "eth" : "solana"), [isEth]);
  const saveRpcNetKey = useMemo(() => {
    return isEth ? ethConfig.id : solanaConfig.network;
  }, [isEth, solanaConfig, ethConfig]);

  const currentGlobalRpcs = useMemo(() => {
    return globalRpcs[saveRpcChainKey];
  }, [globalRpcs, saveRpcChainKey]);

  const currentCustomRpcs = useMemo(() => {
    return customRpcs[saveRpcChainKey];
  }, [customRpcs, saveRpcChainKey]);

  const currentGlobalRpc = useMemo(() => {
    return currentGlobalRpcs[saveRpcNetKey];
  }, [currentGlobalRpcs, saveRpcNetKey]);

  const currentCustomRpc = useMemo(() => {
    return currentCustomRpcs[saveRpcNetKey];
  }, [currentCustomRpcs, saveRpcNetKey]);

  const currentSolanaRpc = useMemo(() => {
    if (customRpcs["solana"][solanaConfig.network]) {
      return customRpcs["solana"][solanaConfig.network];
    }

    return globalRpcs["solana"][solanaConfig.network];
  }, [customRpcs, globalRpcs, solanaConfig]);

  const currentEthRpc = useMemo(() => {
    if (customRpcs["eth"][ethConfig.id]) {
      return customRpcs["eth"][ethConfig.id];
    }

    return globalRpcs["eth"][ethConfig.id];
  }, [customRpcs, globalRpcs, ethConfig]);

  const rpc = useMemo(() => {
    if (currentCustomRpcs[saveRpcNetKey]) {
      return currentCustomRpcs[saveRpcNetKey]!;
    }

    return currentGlobalRpcs[saveRpcNetKey];
  }, [currentGlobalRpcs, currentCustomRpcs, saveRpcNetKey]);

  const setGlobalRpcAction = useCallback(
    (rpcStr: string) => {
      return setGlobalRpc((prev) => {
        return {
          ...prev,
          [saveRpcChainKey]: {
            ...prev[saveRpcChainKey],
            [saveRpcNetKey]: rpcStr,
          },
        };
      });
    },
    [setGlobalRpc, saveRpcChainKey, saveRpcNetKey],
  );

  const setCustomRpcAction = useCallback(
    (rpcStr: string | null) => {
      return setCustomRpc((prev) => {
        return {
          ...prev,
          [saveRpcChainKey]: {
            ...prev[saveRpcChainKey],
            [saveRpcNetKey]: rpcStr,
          },
        };
      });
    },
    [setCustomRpc, saveRpcChainKey, saveRpcNetKey],
  );

  async function testRpcLatency(testRpc: string) {
    let startTimestamp: number;
    let endTimestamp: number;

    if (isEth) {
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
    currentGlobalRpcs,
    currentCustomRpcs,
    currentGlobalRpc,
    currentCustomRpc,
    currentSolanaRpc,
    currentEthRpc,
    setGlobalRpcAction,
    setCustomRpcAction,
    testRpcLatency,
    rpc,
  };
}
