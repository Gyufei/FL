// import { useEthConfig } from "../../web3/use-eth-config";
// import { useWriteContract } from "wagmi";
// import { useCallback } from "react";
import useTxStatus from "../help/use-tx-status";
// import { useGasEth } from "../help/use-gas-eth";

export function useRollinEth() {
  // const { evmConfig } = useEvmConfig();
  // // const { getGasParams } = useGasEth();

  // const { recordTransaction } = useTransactionRecord();
  // const { writeContractAsync } = useWriteContract();

  const getRollingData = async () => {
    // const abiAddress = evmConfig.contracts.preMarkets;

    return {
      rollinAt: new Date().getTime(),
    };
  };

  const txAction = async () => {
    // const abiAddress = evmConfig.contracts.preMarkets;
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
    // const txHash = await writeContractAsync({
    //   ...callParams,
    //   ...gasParams,
    // });
    //
    // await recordTransaction({
    //   txHash,
    //   note: "",
    // });
    // return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return {
    ...wrapRes,
    getRollingData,
  };
}
