import {
  useEvmConfig,
  useWriteContract,
} from "@/lib/hooks/web3/use-evm-config";
import { useChainWallet } from "../../web3/use-chain-wallet";
import { DeliveryPlaceABI } from "@/lib/abi/eth/DeliveryPlace";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";
import { useTransactionRecord } from "../../api/use-transactionRecord";

export function useCloseBidOfferEth({
  marketplaceStr,
  makerStr,
  offerStr,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
}) {
  const { evmConfig } = useEvmConfig();
  const { getGasParams } = useGasEth();

  const { address } = useChainWallet();

  const { recordTransaction } = useTransactionRecord();
  const { writeContractAsync } = useWriteContract();

  const txAction = async () => {
    const abiAddress = evmConfig.contracts.deliveryPlace;

    const callParams = {
      abi: DeliveryPlaceABI,
      address: abiAddress as any,
      functionName: "closeBidOffer",
      args: [marketplaceStr, makerStr, offerStr, address],
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
