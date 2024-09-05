import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { useChainWallet } from "../../web3/use-chain-wallet";
import { TokenManagerABI } from "@/lib/abi/eth/TokenManager";
import { useGasEth } from "../help/use-gas-eth";

export function useWithDrawProjectTokenEth() {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { address: userAddress } = useChainWallet();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(async () => {
    const abiAddress = ethConfig.contracts.tokenManager;
    const usdcAddress = ethConfig.contracts.usdcToken;

    const callParams = {
      abi: TokenManagerABI,
      address: abiAddress as any,
      functionName: "withdrawPlatformFee",
      args: [usdcAddress as any, userAddress],
    };

    const gasParams = await getGasParams(callParams);

    return writeContract({
      ...callParams,
      ...gasParams,
    });
  }, [writeContract, ethConfig, userAddress, getGasParams]);

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    write: txAction,
  };
}
