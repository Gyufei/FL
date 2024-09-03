import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { ISettleMode } from "@/lib/types/maker-detail";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";

export function useCreateOfferEth({
  marketplaceStr,
  offerType,
}: {
  marketplaceStr: string;
  offerType: "bid" | "ask";
}) {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(
    ({
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
      const ethAddress = ethConfig.contracts.usdcToken;
      const collateralTokenAddr = isNativeToken ? ethAddress : usdcAddress;

      return writeContract({
        abi: PreMarketABI,
        address: abiAddress as any,
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
      });
    },
    [writeContract, ethConfig, marketplaceStr, offerType],
  );

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    write: txAction,
  };
}
