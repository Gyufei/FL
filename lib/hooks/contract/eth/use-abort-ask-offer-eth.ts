import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";

export function useAbortAskOfferEth({
  holdingStr,
  offerStr,
}: {
  holdingStr: string;
  offerStr: string;
}) {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { writeContractAsync } = useWriteContract();

  const txAction = useCallback(async () => {
    const abiAddress = ethConfig.contracts.preMarkets;

    const callParams = {
      abi: PreMarketABI,
      address: abiAddress as any,
      functionName: "abortAskOffer",
      args: [holdingStr as any, offerStr as any],
    };

    const gasParams = await getGasParams(callParams);

    return writeContractAsync({
      ...callParams,
      ...gasParams,
    });
  }, [writeContractAsync, ethConfig, holdingStr, offerStr, getGasParams]);

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
