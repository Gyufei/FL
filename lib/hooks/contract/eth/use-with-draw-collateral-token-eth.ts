import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { TokenManagerABI } from "@/lib/abi/eth/TokenManager";
import { IBalanceType } from "../use-with-draw-collateral-token";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";

export function useWithDrawCollateralTokenEth() {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { writeContractAsync } = useWriteContract();

  const txAction = useCallback(
    async ({
      mode,
      tokenAddress,
    }: {
      tokenAddress: string;
      mode: IBalanceType;
    }) => {
      const abiAddress = ethConfig.contracts.tokenManager;
      const modeIndex = [].findIndex((i) => i === mode);

      const callParams = {
        abi: TokenManagerABI,
        address: abiAddress as any,
        functionName: "withdraw",
        args: [tokenAddress as any, modeIndex],
      };

      const gasParams = await getGasParams(callParams);

      return writeContractAsync({
        ...callParams,
        ...gasParams,
      });
    },
    [writeContractAsync, ethConfig, getGasParams],
  );

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
