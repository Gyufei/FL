import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";

export function useCloseOfferEth({
  holdingStr,
  offerStr,
}: {
  holdingStr: string;
  offerStr: string;
}) {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(() => {
    const abiAddress = ethConfig.contracts.preMarkets;

    return writeContract({
      abi: PreMarketABI,
      address: abiAddress as any,
      functionName: "closeOffer",
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
