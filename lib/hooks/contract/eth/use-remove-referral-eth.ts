import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { SystemConfigABI } from "@/lib/abi/eth/SystemConfig";
import { useGasEth } from "../help/use-gas-eth";

export function useRemoveReferralEth() {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(
    async ({ referralCode }: { referralCode: string }) => {
      const abiAddress = ethConfig.contracts.systemConfig;

      const callParams = {
        abi: SystemConfigABI,
        address: abiAddress as any,
        functionName: "removeReferralCode",
        args: [referralCode],
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
