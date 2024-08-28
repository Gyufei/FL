import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { SystemConfigABI } from "@/lib/abi/eth/SystemConfig";

export function useRemoveReferralEth() {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(
    ({ referralCode }: { referralCode: string }) => {
      const abiAddress = ethConfig.contracts.systemConfig;

      return writeContract({
        abi: SystemConfigABI,
        address: abiAddress as any,
        functionName: "removeReferralCode",
        args: [referralCode],
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
