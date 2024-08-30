import NP from "number-precision";
import { encodeFunctionData, parseGwei } from "viem";
import { useConfig, useGasPrice } from "wagmi";
import { estimateGas } from "@wagmi/core";

export function useGasEth() {
  const config = useConfig();
  const { data: gasPrice } = useGasPrice();

  async function getGasParams(callParams: Record<string, any>) {
    try {
      const encodeCallData = encodeFunctionData(callParams as any);

      const estGas = await estimateGas(config, {
        data: encodeCallData,
      });

      const gasLimit = NP.times(Number(estGas), 130 / 100);
      const maxFeePerGas = Number(gasPrice);
      const maxPriorityFeePerGas = Math.ceil(NP.times(maxFeePerGas, 0.05));

      const gasParams: {
        maxFeePerGas?: bigint;
        gas?: bigint;
        maxPriorityFeePerGas?: bigint;
      } = {
        maxFeePerGas: parseGwei(String(maxFeePerGas)),
        gas: parseGwei(String(gasLimit)),
        maxPriorityFeePerGas: parseGwei(String(maxPriorityFeePerGas)),
      };

      return gasParams;
    } catch (e) {
      console.error("calc gas error: =>", e);
      return {};
    }
  }

  return {
    getGasParams,
  };
}
