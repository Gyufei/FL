import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { generateRandomCode } from "@/lib/utils/common";
import { SystemConfigABI } from "@/lib/abi/eth/SystemConfig";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";

export function useCreateReferralEth() {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { writeContractAsync } = useWriteContract();

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
