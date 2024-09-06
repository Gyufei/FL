import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { SystemConfigABI } from "@/lib/abi/eth/SystemConfig";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";

export function useRemoveReferralEth() {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { writeContractAsync } = useWriteContract();

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
