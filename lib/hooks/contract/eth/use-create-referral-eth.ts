import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { generateRandomCode } from "@/lib/utils/common";
import { SystemConfigABI } from "@/lib/abi/eth/system-config";

export function useCreateReferralEth() {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(
    ({
      firstAmount,
      secondAmount,
    }: {
      firstAmount?: number;
      secondAmount?: number;
    }) => {
      const abiAddress = ethConfig.contracts.systemConfig;
      const RandomCode = generateRandomCode(8);

      return writeContract({
        abi: SystemConfigABI,
        address: abiAddress as any,
        functionName: "createReferralCode",
        args: [RandomCode, BigInt(firstAmount || 0), BigInt(secondAmount || 0)],
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
