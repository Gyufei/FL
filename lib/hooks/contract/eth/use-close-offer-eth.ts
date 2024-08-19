import { PreMarketABI } from "@/lib/abi/eth/pre-markets";
import { ISettleMode } from "@/lib/types/maker-detail";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";

export function useCloseOfferEth({
  marketplaceStr,
  makerStr,
  offerStr,
  stockStr,
  isSolStable,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  stockStr: string;
  isSolStable: boolean;
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
    }: {
      pointAmount: number;
      tokenAmount: number;
      collateralRate: number;
      taxForSub: number;
      settleMode: ISettleMode;
    }) => {
      const abiAddress = ethConfig.contracts.preMarket;
      const usdcAddress = ethConfig.contracts.usdcToken;

      return writeContract({
        abi: PreMarketABI,
        address: abiAddress as any,
        functionName: "createOffer",
        args: [
          {
            marketPlace: marketplaceStr as any,
            collateralTokenAddr: usdcAddress as any,
            points: BigInt(pointAmount),
            amount: BigInt(tokenAmount * 1e18),
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
