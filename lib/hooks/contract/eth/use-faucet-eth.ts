import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import useTxStatus from "../help/use-tx-status";

export function useFaucetEth() {
  const { ethConfig } = useEthConfig();

  const { writeContractAsync } = useWriteContract();

  const txAction = useCallback(() => {
    // const abiAddress = ethConfig.contracts.preMarkets;
    // return writeContract({
    //   abi: PreMarketABI,
    //   address: abiAddress as any,
    //   functionName: "createOffer",
    //   args: [],
    // });
    return new Promise((resolve) => {
      resolve(true);
    });
  }, [writeContractAsync, ethConfig]);

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
