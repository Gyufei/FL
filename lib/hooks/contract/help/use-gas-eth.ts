import NP from "number-precision";
import { useGasPrice, usePublicClient } from "wagmi";

export function useGasEth() {
  const { data: gasPrice } = useGasPrice();

  const publicClient = usePublicClient();

  const getGasParams = async (callParams: Record<string, any>) => {
    try {
      const estGas = await publicClient!.estimateContractGas(callParams as any);

      const gasLimit = NP.times(Number(estGas), 130 / 100).toFixed();
      const maxPriorityFeePerGas = Math.ceil(NP.times(Number(gasPrice), 0.05));

      const gasParams: {
        maxFeePerGas?: bigint;
        gas?: bigint;
        maxPriorityFeePerGas?: bigint;
      } = {
        maxFeePerGas: gasPrice,
        gas: BigInt(gasLimit),
        maxPriorityFeePerGas: BigInt(maxPriorityFeePerGas),
      };

      console.log(gasParams);
      return gasParams;
    } catch (e) {
      console.error("calc gas error: =>", e);
      return {};
    }
  };

  return {
    getGasParams,
  };
}
