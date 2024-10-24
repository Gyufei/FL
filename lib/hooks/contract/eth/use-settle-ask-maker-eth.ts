import { useWriteContract } from "wagmi";
import { DeliveryPlaceABI } from "@/lib/abi/eth/DeliveryPlace";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";
import { useTransactionRecord } from "../../api/use-transactionRecord";
import { ChainType } from "@/lib/types/chain";
import { ChainConfigs } from "@/lib/const/chain-config";

export function useSettleAskMakerEth({
  chain,
  offerStr,
}: {
  chain: ChainType;
  offerStr: string;
}) {
  const evmConfig = ChainConfigs[chain];
  const { getGasParams } = useGasEth();

  const { recordTransaction } = useTransactionRecord();
  const { writeContractAsync } = useWriteContract();

  const txAction = async ({ settleAmount }: { settleAmount: number }) => {
    const abiAddress = evmConfig.contracts.deliveryPlace;

    const callParams = {
      abi: DeliveryPlaceABI,
      address: abiAddress as any,
      functionName: "settleAskMaker",
      args: [offerStr as any, BigInt(settleAmount)],
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
