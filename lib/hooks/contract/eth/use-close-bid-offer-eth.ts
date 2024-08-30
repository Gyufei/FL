import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { useChainWallet } from "../../web3/use-chain-wallet";
import { DeliveryPlaceABI } from "@/lib/abi/eth/DeliveryPlace";

export function useCloseBidOfferEth({
  marketplaceStr,
  makerStr,
  offerStr,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
}) {
  const { ethConfig } = useEthConfig();

  const { address } = useChainWallet();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(async () => {
    const abiAddress = ethConfig.contracts.deliveryPlace;

    const callParams = {
      abi: DeliveryPlaceABI,
      address: abiAddress as any,
      functionName: "closeBidOffer",
      args: [marketplaceStr, makerStr, offerStr, address],
    };

    return writeContract(callParams);
  }, [writeContract, ethConfig, marketplaceStr, makerStr, offerStr, address]);

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    write: txAction,
  };
}
