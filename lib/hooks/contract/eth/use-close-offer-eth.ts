import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { generateEthAddress } from "@/lib/utils/web3";

export function useCloseOfferEth({ holdingStr }: { holdingStr: string }) {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(() => {
    const abiAddress = ethConfig.contracts.preMarkets;

    const offer1Address = generateEthAddress("2", "offer");

    return writeContract({
      abi: PreMarketABI,
      address: abiAddress as any,
      functionName: "closeOffer",
      args: [holdingStr as any, offer1Address],
    });
  }, [writeContract, ethConfig, holdingStr]);

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    write: txAction,
  };
}
