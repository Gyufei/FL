import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { DeliveryPlaceABI } from "@/lib/abi/eth/DeliveryPlace";
import { useGasEth } from "../help/use-gas-eth";

export function useSettleAskMakerEth({ offerStr }: { offerStr: string }) {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(
    async ({ settleAmount }: { settleAmount: number }) => {
      const abiAddress = ethConfig.contracts.deliveryPlace;

      const callParams = {
        abi: DeliveryPlaceABI,
        address: abiAddress as any,
        functionName: "settleAskMaker",
        args: [offerStr as any, BigInt(settleAmount)],
      };

      const gasParams = await getGasParams(callParams);

      return writeContract({
        ...callParams,
        ...gasParams,
      });
    },
    [writeContract, ethConfig, offerStr, getGasParams],
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
