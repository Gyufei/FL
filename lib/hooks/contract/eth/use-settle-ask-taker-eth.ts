import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { DeliveryPlaceABI } from "@/lib/abi/eth/DeliveryPlace";

export function useSettleAskTakerEth({ holdingStr }: { holdingStr: string }) {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(
    ({ settleAmount }: { settleAmount: number }) => {
      const abiAddress = ethConfig.contracts.deliveryPlace;

      return writeContract({
        abi: DeliveryPlaceABI,
        address: abiAddress as any,
        functionName: "settleAskTaker",
        args: [holdingStr as any, BigInt(settleAmount)],
      });
    },
    [writeContract, ethConfig, holdingStr],
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
