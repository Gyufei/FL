import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";

export function useRelistEth({
  offerStr,
  holdingStr,
}: {
  offerStr: string;
  holdingStr: string;
}) {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(() => {
    const abiAddress = ethConfig.contracts.preMarkets;

    return writeContract({
      abi: PreMarketABI,
      address: abiAddress as any,
      functionName: "relistHolding",
      args: [holdingStr as any, offerStr as any],
    });
  }, [writeContract, ethConfig, holdingStr, offerStr]);

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    write: txAction,
  };
}
