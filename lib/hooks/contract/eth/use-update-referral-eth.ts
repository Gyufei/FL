import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { SystemConfigABI } from "@/lib/abi/eth/SystemConfig";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";

export function useUpdateReferralEth({
  // referrerStr,
  referralCode,
}: {
  // referrerStr: string;
  referralCode: string;
}) {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { writeContractAsync } = useWriteContract();

  const txAction = useCallback(async () => {
    const abiAddress = ethConfig.contracts.systemConfig;

    const callParams = {
      abi: SystemConfigABI,
      address: abiAddress as any,
      functionName: "updateReferrerInfo",
      args: [referralCode],
    };

    const gasParams = await getGasParams(callParams);

    return writeContractAsync({
      ...callParams,
      ...gasParams,
    });
  }, [writeContractAsync, ethConfig, referralCode, getGasParams]);

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
