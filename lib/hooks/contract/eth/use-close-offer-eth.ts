import { PreMarketABI } from "@/lib/abi/eth/pre-markets";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { generateEthAddress } from "@/lib/utils/web3";

export function useCloseOfferEth({ stockStr }: { stockStr: string }) {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(() => {
    const abiAddress = ethConfig.contracts.preMarket;

    const offer1Address = generateEthAddress("2", "offer");

    return writeContract({
      abi: PreMarketABI,
      address: abiAddress as any,
      functionName: "closeOffer",
      args: [stockStr as any, offer1Address],
    });
  }, [writeContract, ethConfig, stockStr]);

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    write: txAction,
  };
}
