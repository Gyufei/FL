import {
  useEvmConfig,
  useWriteContract,
} from "@/lib/hooks/web3/use-evm-config";
import { TokenManagerABI } from "@/lib/abi/eth/TokenManager";
import { IBalanceType } from "../use-with-draw-collateral-token";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";
import { useTransactionRecord } from "../../api/use-transactionRecord";

export function useWithDrawCollateralTokenEth() {
  const { evmConfig } = useEvmConfig();
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
    const abiAddress = evmConfig.contracts.tokenManager;
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
