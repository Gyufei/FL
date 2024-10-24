import { useWriteContract } from "wagmi";
import { TokenManagerABI } from "@/lib/abi/eth/TokenManager";
import { IBalanceType } from "../use-withdraw-token";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";
import { useTransactionRecord } from "../../api/use-transactionRecord";
import { ChainConfigs } from "@/lib/const/chain-config";
import { ChainType } from "@/lib/types/chain";

export function useWithdrawTokenEth({ chain }: { chain: ChainType }) {
  const { getGasParams } = useGasEth();

  const { recordTransaction } = useTransactionRecord();
  const { writeContractAsync } = useWriteContract();

  const txAction = async ({
    mode,
    tokenAddress,
  }: {
    tokenAddress: string;
    mode: IBalanceType;
  }) => {
    const abiAddress = ChainConfigs[chain].contracts.tokenManager;
    const modeIndex = [].findIndex((i) => i === mode);

    const callParams = {
      abi: TokenManagerABI,
      address: abiAddress as any,
      functionName: "withdraw",
      args: [tokenAddress as any, modeIndex],
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
