import {
  useEvmConfig,
  useWriteContract,
} from "@/lib/hooks/web3/use-evm-config";
import { DeliveryPlaceABI } from "@/lib/abi/eth/DeliveryPlace";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";
import { useTransactionRecord } from "../../api/use-transactionRecord";

export function useSettleAskTakerEth({ holdingStr }: { holdingStr: string }) {
  const { evmConfig } = useEvmConfig();
  const { getGasParams } = useGasEth();

  const { recordTransaction } = useTransactionRecord();
  const { writeContractAsync } = useWriteContract();

  const txAction = async ({ settleAmount }: { settleAmount: number }) => {
    const abiAddress = evmConfig.contracts.deliveryPlace;

    const callParams = {
      abi: DeliveryPlaceABI,
      address: abiAddress as any,
      functionName: "settleAskTaker",
      args: [holdingStr as any, BigInt(settleAmount)],
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
