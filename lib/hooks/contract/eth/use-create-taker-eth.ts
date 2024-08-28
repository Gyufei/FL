import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { generateEthAddress } from "@/lib/utils/web3";

export function useCreateTakerEth() {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(
    ({ pointAmount }: { pointAmount: number }) => {
      const offerAddress = generateEthAddress("1", "offer");

      const abiAddress = ethConfig.contracts.preMarkets;

      return writeContract({
        abi: PreMarketABI,
        address: abiAddress as any,
        functionName: "createTaker",
        args: [offerAddress, BigInt(pointAmount)],
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
