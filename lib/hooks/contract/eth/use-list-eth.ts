import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { generateEthAddress } from "@/lib/utils/web3";

export function useListEth() {
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
      const stockAddress = generateEthAddress("2", "stock");

      return writeContract({
        abi: PreMarketABI,
        address: abiAddress as any,
        functionName: "listHolding",
        args: [
          stockAddress,
          BigInt(receiveTokenAmount * 1e18),
          BigInt(collateralRate),
        ],
      });
    },
    [writeContract, ethConfig],
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
