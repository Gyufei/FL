import { useCallback } from "react";
import { useAtom } from "jotai";
import { CustomRpcsAtom, GlobalRpcsAtom } from "@/lib/states/rpc";
import { Connection } from "@solana/web3.js";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { isProduction } from "@/lib/PathMap";
import { testnet } from "@/components/provider/wallet-context/testnet";
import { ChainType } from "@/lib/types/chain";
import { isEvmChain } from "@/lib/utils/web3";

export function useRpc() {
  const [globalRpcs, setGlobalRpc] = useAtom(GlobalRpcsAtom);
  const [customRpcs, setCustomRpc] = useAtom(CustomRpcsAtom);

  const setGlobalRpcAction = useCallback(
    (chain: ChainType, rpcStr: string) => {
      return setGlobalRpc((prev) => {
        return {
          ...prev,
          [chain]: rpcStr,
        };
      });
    },
    [setGlobalRpc],
  );

  const setCustomRpcAction = useCallback(
    (chain: ChainType, rpcStr: string | null) => {
      return setCustomRpc((prev) => {
        return {
          ...prev,
          [chain]: rpcStr,
        };
      });
    },
    [setCustomRpc],
  );

  async function testRpcLatency(chain: ChainType, testRpc: string) {
    let startTimestamp: number;
    let endTimestamp: number;

    if (isEvmChain(chain)) {
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
    globalRpcs,
    customRpcs,
    setGlobalRpcAction,
    setCustomRpcAction,
    testRpcLatency,
  };
}
