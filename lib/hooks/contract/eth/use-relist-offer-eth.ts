import { PreMarketABI } from "@/lib/abi/eth/pre-markets";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";

export function useRelistOfferEth({
  offerStr,
  stockStr,
}: {
  offerStr: string;
  stockStr: string;
}) {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(() => {
    const abiAddress = ethConfig.contracts.preMarket;

    return writeContract({
      abi: PreMarketABI,
      address: abiAddress as any,
      functionName: "relistStock",
      args: [stockStr as any, offerStr as any],
    });
  }, [writeContract, ethConfig, stockStr, offerStr]);

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    write: txAction,
  };
}
