import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { generateRandomCode } from "@/lib/utils/common";
import { SystemConfigABI } from "@/lib/abi/eth/SystemConfig";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";
import { useTransactionRecord } from "../../api/use-transactionRecord";

export function useCreateReferralEth() {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { recordTransaction } = useTransactionRecord();
  const { writeContractAsync } = useWriteContract();

  const txAction = async (args?: {
    firstAmount?: number;
    secondAmount?: number;
  }) => {
    const { firstAmount = 300000, secondAmount = 0 } = args || {};

    const abiAddress = ethConfig.contracts.systemConfig;
    const RandomCode = generateRandomCode(8);

    const callParams = {
      abi: SystemConfigABI,
      address: abiAddress as any,
      functionName: "createReferralCode",
      args: [RandomCode, BigInt(firstAmount || 0), BigInt(secondAmount || 0)],
    };

    const gasParams = await getGasParams(callParams);

    const txHash = await writeContractAsync({
      ...callParams,
      ...gasParams,
    });

    await recordTransaction({
      txHash,
      note: "",
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
