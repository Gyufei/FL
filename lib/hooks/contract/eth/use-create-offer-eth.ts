import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { ISettleMode } from "@/lib/types/offer";
import {
  useEvmConfig,
  useWriteContract,
} from "@/lib/hooks/web3/use-evm-config";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";
import { useTransactionRecord } from "../../api/use-transactionRecord";

export function useCreateOfferEth({
  marketplaceStr,
  offerType,
}: {
  marketplaceStr: string;
  offerType: "bid" | "ask";
}) {
  const { evmConfig } = useEvmConfig();
  const { getGasParams } = useGasEth();

  const { recordTransaction } = useTransactionRecord();
  const { writeContractAsync } = useWriteContract();

  const txAction = async ({
    pointAmount,
    tokenAmount,
    collateralRate,
    taxForSub,
    settleMode,
    collateralTokenAddr,
    isNativeToken,
  }: {
    pointAmount: number;
    tokenAmount: number;
    collateralRate: number;
    taxForSub: number;
    settleMode: ISettleMode;
    collateralTokenAddr: string;
    isNativeToken: boolean;
  }) => {
    const abiAddress = evmConfig.contracts.preMarkets;
    const valueParams = isNativeToken ? { value: BigInt(tokenAmount) } : {};

    const callParams = {
      abi: PreMarketABI,
      functionName: "createOffer",
      args: [
        {
          marketPlace: marketplaceStr as any,
          collateralTokenAddr: collateralTokenAddr as any,
          projectPoints: BigInt(pointAmount),
          quoteTokenAmount: BigInt(tokenAmount),
          collateralRate: BigInt(collateralRate),
          eachTradeTax: BigInt(taxForSub),
          offerType: offerType === "ask" ? 0 : 1,
          offerSettleType: settleMode === "protected" ? 0 : 1,
        },
      ],
      address: abiAddress as any,
      ...valueParams,
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
