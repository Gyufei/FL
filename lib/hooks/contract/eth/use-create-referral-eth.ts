import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { generateRandomCode } from "@/lib/utils/common";
import { SystemConfigABI } from "@/lib/abi/eth/SystemConfig";
import { useGasEth } from "../help/use-gas-eth";

export function useCreateReferralEth() {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(
    async ({
      firstAmount,
      secondAmount,
    }: {
      firstAmount?: number;
      secondAmount?: number;
    }) => {
      const abiAddress = ethConfig.contracts.systemConfig;
      const RandomCode = generateRandomCode(8);

      const callParams = {
        abi: SystemConfigABI,
        address: abiAddress as any,
        functionName: "createReferralCode",
        args: [RandomCode, BigInt(firstAmount || 0), BigInt(secondAmount || 0)],
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
