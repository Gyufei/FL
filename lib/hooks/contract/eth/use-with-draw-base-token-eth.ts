import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { TokenManagerABI } from "@/lib/abi/eth/token-manager";
import { IBalanceType } from "../use-with-draw-base-token";

export function useWithDrawBaseTokenEth() {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(
    ({
      mode,
      isNativeToken,
    }: {
      isNativeToken: boolean;
      mode: IBalanceType;
    }) => {
      const abiAddress = ethConfig.contracts.tokenManager;
      const usdcAddress = ethConfig.contracts.usdcToken;
      const ethAddress = ethConfig.contracts.ethToken;

      const tokenAddress = isNativeToken ? ethAddress : usdcAddress;

      const modeIndex = [].findIndex((i) => i === mode);

      return writeContract({
        abi: TokenManagerABI,
        address: abiAddress as any,
        functionName: "withdraw",
        args: [tokenAddress as any, modeIndex],
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
