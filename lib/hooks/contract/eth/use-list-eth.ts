import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";

export function useListEth({ holdingStr }: { holdingStr: string }) {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(
    ({
      receiveTokenAmount,
      collateralRate,
    }: {
      receiveTokenAmount: number;
      collateralRate: number;
    }) => {
      const abiAddress = ethConfig.contracts.preMarkets;

      return writeContract({
        abi: PreMarketABI,
        address: abiAddress as any,
        functionName: "listHolding",
        args: [
          holdingStr,
          BigInt(receiveTokenAmount),
          BigInt(collateralRate),
        ],
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
