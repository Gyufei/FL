import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";

export function useCreateHoldingEth({ offerStr }: { offerStr: string }) {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(
    ({ pointAmount }: { pointAmount: number }) => {
      const abiAddress = ethConfig.contracts.preMarkets;

      return writeContract({
        abi: PreMarketABI,
        address: abiAddress as any,
        functionName: "createHolding",
        args: [offerStr, BigInt(pointAmount)],
      });
    },
    [writeContract, ethConfig, offerStr],
  );

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    write: txAction,
  };
}
