import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { DeliveryPlaceABI } from "@/lib/abi/eth/DeliveryPlace";
import { useEthConfig } from "../../web3/use-eth-config";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";

export function useCloseBidHoldingEth({ holdingStr }: { holdingStr: string }) {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { writeContractAsync } = useWriteContract();

  const txAction = useCallback(async () => {
    const abiAddress = ethConfig.contracts.deliveryPlace;

    const callParams = {
      abi: DeliveryPlaceABI,
      address: abiAddress as any,
      functionName: "closeBidHolding",
      args: [holdingStr as any],
    };

    const gasParams = await getGasParams(callParams);

    return writeContractAsync({
      ...callParams,
      ...gasParams,
    });
  }, [writeContractAsync, ethConfig, holdingStr, getGasParams]);

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
