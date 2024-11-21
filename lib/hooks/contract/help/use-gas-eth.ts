import NP from "number-precision";
import { parseGwei } from "viem";
// import { useGasPrice, usePublicClient } from "wagmi";
import { usePublicClient } from "wagmi";

export function useGasEth() {
  // const { data: gasPrice } = useGasPrice();
  // console.log("gasPrice from api", gasPrice);

  const publicClient = usePublicClient();

  const getGasParams = async (callParams: Record<string, any>) => {
    try {
      const estGas = await publicClient!.estimateContractGas(callParams as any);

      const gasLimit = NP.times(Number(estGas), 130 / 100).toFixed();
      // const maxPriorityFeePerGas = Math.ceil(NP.times(Number(gasPrice), 0.05));

      const gasParams: {
        gasPrice?: bigint;
        maxFeePerGas?: bigint;
        gas?: bigint;
        maxPriorityFeePerGas?: bigint;
      } = {
        gasPrice: parseGwei("1"),
        gas: BigInt(gasLimit),
        // maxFeePerGas: parseGwei("1"),
        // maxPriorityFeePerGas: BigInt(maxPriorityFeePerGas),
      };

      console.log(gasParams);
      return gasParams;
    } catch (e) {
      console.error("calc gas error: =>", e);
      return {};
    }
  };

  const ApiCallGas = {
    gasPrice: parseGwei("1"),
  };

  return {
    ApiCallGas,
    getGasParams,
  };
}
