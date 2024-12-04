import { useReadContract, useAccount } from "wagmi";
import { ChainConfigs } from "../../const/chain-configs";
import { erc20Abi } from "viem";

export function useBalanceDataOf(chain?: string) {
  const abiAddress = ChainConfigs[chain || "eth"].contracts.mdin;
  const { address } = useAccount();
  const result = useReadContract({
    abi: erc20Abi,
    address: abiAddress as any,
    functionName: "balanceOf",
    args: [address as any],
  });

  return result;
}
