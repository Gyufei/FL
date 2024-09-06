import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { ISettleMode } from "@/lib/types/maker-detail";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";

export function useCreateOfferEth({
  marketplaceStr,
  offerType,
}: {
  marketplaceStr: string;
  offerType: "bid" | "ask";
}) {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { writeContractAsync } = useWriteContract();

  const txAction = async ({
    pointAmount,
    tokenAmount,
    collateralRate,
    taxForSub,
    settleMode,
    isNativeToken,
  }: {
    pointAmount: number;
    tokenAmount: number;
    collateralRate: number;
    taxForSub: number;
    settleMode: ISettleMode;
    isNativeToken: boolean;
  }) => {
    const abiAddress = ethConfig.contracts.preMarkets;
    const usdcAddress = ethConfig.contracts.usdcToken;
    const ethAddress = ethConfig.contracts.ethToken;
    const collateralTokenAddr = isNativeToken ? ethAddress : usdcAddress;

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

    return writeContractAsync({
      ...callParams,
      ...gasParams,
    });
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
