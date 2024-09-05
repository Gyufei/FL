import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { useGasEth } from "../help/use-gas-eth";

export function useCreateHoldingEth({ offerStr }: { offerStr: string }) {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(
    async ({ pointAmount }: { pointAmount: number }) => {
      const abiAddress = ethConfig.contracts.preMarkets;

      const callParams = {
        abi: PreMarketABI,
        address: abiAddress as any,
        functionName: "createHolding",
        args: [offerStr, BigInt(pointAmount)],
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
