import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { useEvmConfig } from "../../web3/use-evm-config";
import { useWriteContract } from "wagmi";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";
import { useTransactionRecord } from "../../api/use-transactionRecord";

export function useCloseOfferEth({
  holdingStr,
  offerStr,
}: {
  holdingStr: string;
  offerStr: string;
}) {
  const { evmConfig } = useEvmConfig();
  const { getGasParams } = useGasEth();

  const { recordTransaction } = useTransactionRecord();
  const { writeContractAsync } = useWriteContract();

  const txAction = async () => {
    const abiAddress = evmConfig.contracts.preMarkets;

    const callParams = {
      abi: PreMarketABI,
      address: abiAddress as any,
      functionName: "closeOffer",
      args: [holdingStr as any, offerStr as any],
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
