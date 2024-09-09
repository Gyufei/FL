import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useChainWallet } from "../../web3/use-chain-wallet";
import { TokenManagerABI } from "@/lib/abi/eth/TokenManager";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";
import { useTransactionRecord } from "../../api/use-transactionRecord";

export function useWithDrawProjectTokenEth() {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { address: userAddress } = useChainWallet();

  const { recordTransaction } = useTransactionRecord();
  const { writeContractAsync } = useWriteContract();

  const txAction = async ({ tokenAddress }: { tokenAddress: string }) => {
    const abiAddress = ethConfig.contracts.tokenManager;

    const callParams = {
      abi: TokenManagerABI,
      address: abiAddress as any,
      functionName: "withdrawPlatformFee",
      args: [tokenAddress as any, userAddress],
    };

    const gasParams = await getGasParams(callParams);

    const txHash = await writeContractAsync({
      ...callParams,
      ...gasParams,
    });

    await recordTransaction({
      txHash,
      note: "",
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
