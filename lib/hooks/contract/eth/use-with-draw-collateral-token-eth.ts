import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { TokenManagerABI } from "@/lib/abi/eth/TokenManager";
import { IBalanceType } from "../use-with-draw-collateral-token";
import { useGasEth } from "../help/use-gas-eth";

export function useWithDrawCollateralTokenEth() {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(
    async ({
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

      const callParams = {
        abi: TokenManagerABI,
        address: abiAddress as any,
        functionName: "withdraw",
        args: [tokenAddress as any, modeIndex],
      };

      const gasParams = await getGasParams(callParams);

      return writeContract({
        ...callParams,
        ...gasParams,
      });
    },
    [writeContract, ethConfig, getGasParams],
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
