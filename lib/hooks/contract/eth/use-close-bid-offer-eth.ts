import { PreMarketABI } from "@/lib/abi/eth/pre-markets";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";

export function useCloseBidOfferEth({
  marketplaceStr,
  makerStr,
  offerStr,
  isNativeToken,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  isNativeToken: boolean;
}) {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(() => {
    const abiAddress = ethConfig.contracts.preMarket;

    return writeContract({
      abi: PreMarketABI,
      address: abiAddress as any,
      functionName: "closeBidOffer",
      args: [],
    });
  }, [writeContract, ethConfig, marketplaceStr, offerType]);

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    write: txAction,
  };
}
