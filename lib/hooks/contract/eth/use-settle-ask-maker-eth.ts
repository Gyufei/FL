import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { DeliveryPlaceABI } from "@/lib/abi/eth/DeliveryPlace";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";

export function useSettleAskMakerEth({ offerStr }: { offerStr: string }) {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { writeContractAsync } = useWriteContract();

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

      return writeContractAsync({
        ...callParams,
        ...gasParams,
      });
    },
    [writeContractAsync, ethConfig, offerStr, getGasParams],
  );

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
