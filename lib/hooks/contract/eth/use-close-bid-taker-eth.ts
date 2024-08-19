import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { DeliveryPlaceABI } from "@/lib/abi/eth/delivery-place";

export function useCloseBidTakerEth({
  marketplaceStr,
}: // makerStr,
// stockStr,
// preOfferStr,
// isSolStable,
{
  marketplaceStr: string;
  makerStr: string;
  stockStr: string;
  preOfferStr: string;
  isSolStable: boolean;
}) {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(
    ({}) => {
      const abiAddress = ethConfig.contracts.deliveryPlace;
      // const usdcAddress = ethConfig.contracts.usdcToken;

      return writeContract({
        abi: DeliveryPlaceABI,
        address: abiAddress as any,
        functionName: "closeBidTaker",
        args: [],
      });
    },
    [writeContract, ethConfig, marketplaceStr, offerType],
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
