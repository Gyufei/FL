import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";

export function useCreateHoldingEth({ offerStr }: { offerStr: string }) {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { writeContractAsync } = useWriteContract();

  const txAction = useCallback(
    async ({ pointAmount }: { pointAmount: number }) => {
      const abiAddress = ethConfig.contracts.preMarkets;

      const callParams = {
        abi: PreMarketABI,
        address: abiAddress as any,
        functionName: "createHolding",
        args: [offerStr, BigInt(pointAmount)],
      };

      const gasParams = await getGasParams(callParams);

      return writeContractAsync({
        ...callParams,
        ...gasParams,
      });
    },
    [writeContractAsync, ethConfig, offerStr, getGasParams],
  );

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
