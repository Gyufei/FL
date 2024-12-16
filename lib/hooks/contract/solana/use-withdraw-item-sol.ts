import { useWriteContract } from "wagmi";
import { useChainWallet } from "../../web3/use-chain-wallet";
import { TokenManagerABI } from "@/lib/abi/eth/TokenManager";
import useTxStatus from "../help/use-tx-status";
import { useTransactionRecord } from "../../api/use-transactionRecord";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";

export function useWithdrawItemSol({ chain }: { chain: ChainType }) {
  const evmConfig = ChainConfigs[chain];

  const { address: userAddress } = useChainWallet(chain);

  const { recordTransaction } = useTransactionRecord(chain);
  const { writeContractAsync } = useWriteContract();

  const txAction = async ({ tokenAddress }: { tokenAddress: string }) => {
    const abiAddress = evmConfig.contracts.tokenManager;

    const callParams = {
      abi: TokenManagerABI,
      address: abiAddress as any,
      functionName: "withdrawPlatformFee",
      args: [tokenAddress as any, userAddress],
    };

    const txHash = await writeContractAsync({
      ...callParams,
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
