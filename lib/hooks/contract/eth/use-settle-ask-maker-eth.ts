import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { DeliveryPlaceABI } from "@/lib/abi/eth/delivery-place";

export function useSettleAskMakerEth({ offerStr }: { offerStr: string }) {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(
    ({ settleAmount }: { settleAmount: number }) => {
      const abiAddress = ethConfig.contracts.deliveryPlace;

      return writeContract({
        abi: DeliveryPlaceABI,
        address: abiAddress as any,
        functionName: "settleAskMaker",
        args: [offerStr as any, BigInt(settleAmount)],
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
