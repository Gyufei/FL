import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";

export function useListEth({ holdingStr }: { holdingStr: string }) {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { writeContractAsync } = useWriteContract();

  const txAction = useCallback(
    async ({
      receiveTokenAmount,
      collateralRate,
    }: {
      receiveTokenAmount: number;
      collateralRate: number;
    }) => {
      const abiAddress = ethConfig.contracts.preMarkets;

      const callParams = {
        abi: PreMarketABI,
        address: abiAddress as any,
        functionName: "listHolding",
        args: [holdingStr, BigInt(receiveTokenAmount), BigInt(collateralRate)],
      };

      const gasParams = await getGasParams(callParams);

      return writeContractAsync({
        ...callParams,
        ...gasParams,
      });
    },
    [writeContractAsync, ethConfig, holdingStr, getGasParams],
  );

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
