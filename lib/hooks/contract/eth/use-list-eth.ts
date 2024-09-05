import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { useGasEth } from "../help/use-gas-eth";

export function useListEth({ holdingStr }: { holdingStr: string }) {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

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

      return writeContract({
        ...callParams,
        ...gasParams,
      });
    },
    [writeContract, ethConfig, holdingStr, getGasParams],
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
