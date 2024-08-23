import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";

export function useRollinEth() {
  const { ethConfig } = useEthConfig();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(() => {
    // const abiAddress = ethConfig.contracts.preMarket;
    // return writeContract({
    //   abi: PreMarketABI,
    //   address: abiAddress as any,
    //   functionName: "createOffer",
    //   args: [
    //     {
    //     },
    //   ],
    // });
  }, [writeContract, ethConfig]);

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    write: txAction,
  };
}
