import { useWriteContract } from "wagmi";
import { DeliveryPlaceABI } from "@/lib/abi/eth/DeliveryPlace";
import useTxStatus from "../help/use-tx-status";
import { useTransactionRecord } from "../../api/use-transactionRecord";
import { ChainType } from "@/lib/types/chain";
import { ChainConfigs } from "@/lib/const/chain-configs";

export function useSettleAskTakerSol({
  chain,
  holdingStr,
}: {
  chain: ChainType;
  holdingStr: string;
}) {
  const evmConfig = ChainConfigs[chain];

  const { recordTransaction } = useTransactionRecord(chain);
  const { writeContractAsync } = useWriteContract();

  const txAction = async ({ settleAmount }: { settleAmount: number }) => {
    const abiAddress = evmConfig.contracts.deliveryPlace;

    const callParams = {
      abi: DeliveryPlaceABI,
      address: abiAddress as any,
      functionName: "settleAskTaker",
      args: [holdingStr as any, BigInt(settleAmount)],
    };

    const txHash = await writeContractAsync({
      ...callParams,
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
