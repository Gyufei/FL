import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { useEvmConfig } from "../../web3/use-evm-config";
import { useWriteContract } from "wagmi";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";
import { useTransactionRecord } from "../../api/use-transactionRecord";

export function useListEth({ holdingStr }: { holdingStr: string }) {
  const { evmConfig } = useEvmConfig();
  const { getGasParams } = useGasEth();

  const { recordTransaction } = useTransactionRecord();
  const { writeContractAsync } = useWriteContract();

  const txAction = async ({
    receiveTokenAmount,
    collateralRate,
  }: {
    receiveTokenAmount: number;
    collateralRate: number;
  }) => {
    const abiAddress = evmConfig.contracts.preMarkets;

    const callParams = {
      abi: PreMarketABI,
      address: abiAddress as any,
      functionName: "listHolding",
      args: [holdingStr, BigInt(receiveTokenAmount), BigInt(collateralRate)],
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
