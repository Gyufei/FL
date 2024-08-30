import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { useChainWallet } from "../../web3/use-chain-wallet";
import { TokenManagerABI } from "@/lib/abi/eth/TokenManager";

export function useWithDrawProjectTokenEth() {
  const { ethConfig } = useEthConfig();

  const { address: userAddress } = useChainWallet();

  const { data, error, isError, isPending, isSuccess, writeContract } =
    useWriteContract();

  const txAction = useCallback(() => {
    const abiAddress = ethConfig.contracts.tokenManager;
    const usdcAddress = ethConfig.contracts.usdcToken;

    return writeContract({
      abi: TokenManagerABI,
      address: abiAddress as any,
      functionName: "withdrawPlatformFee",
      args: [usdcAddress as any, userAddress],
    });
  }, [writeContract, ethConfig, userAddress]);

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    write: txAction,
  };
}
