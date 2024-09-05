import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
// import { useGasEth } from "../help/use-gas-eth";

export function useRollinEth() {
  const { ethConfig } = useEthConfig();
  // const { getGasParams } = useGasEth();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const getRollingData = async () => {
    // const abiAddress = ethConfig.contracts.preMarkets;

    return {
      rollinAt: new Date().getTime(),
    };
  };

  const txAction = useCallback(async () => {
    // const abiAddress = ethConfig.contracts.preMarkets;
    // const callParams = {
    //   abi: PreMarketABI,
    //   address: abiAddress as any,
    //   functionName: "createOffer",
    //   args: [
    //     {
    //     },
    //   ],
    // };
    //
    // const gasParams = await getGasParams(callParams);
    // return writeContract({
    //   ...callParams,
    //   ...gasParams,
    // });
  }, [writeContract, ethConfig]);

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    write: txAction,
    getRollingData,
  };
}
