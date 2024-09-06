import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import useTxStatus from "../help/use-tx-status";
// import { useGasEth } from "../help/use-gas-eth";

export function useRollinEth() {
  const { ethConfig } = useEthConfig();
  // const { getGasParams } = useGasEth();

  const { writeContractAsync } = useWriteContract();

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
    // return writeContractAsync({
    //   ...callParams,
    //   ...gasParams,
    // });
  }, [writeContractAsync, ethConfig]);

  const wrapRes = useTxStatus(txAction);

  return {
    ...wrapRes,
    getRollingData,
  };
}
