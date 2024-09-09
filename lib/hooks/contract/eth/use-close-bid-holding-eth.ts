import { useWriteContract } from "wagmi";
import { DeliveryPlaceABI } from "@/lib/abi/eth/DeliveryPlace";
import { useEthConfig } from "../../web3/use-eth-config";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";
import { useTransactionRecord } from "../../api/use-transactionRecord";

export function useCloseBidHoldingEth({ holdingStr }: { holdingStr: string }) {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { recordTransaction } = useTransactionRecord();
  const { writeContractAsync } = useWriteContract();

  const txAction = async () => {
    const abiAddress = ethConfig.contracts.deliveryPlace;

    const callParams = {
      abi: DeliveryPlaceABI,
      address: abiAddress as any,
      functionName: "closeBidHolding",
      args: [holdingStr as any],
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
