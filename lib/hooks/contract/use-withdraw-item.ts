import { useChainTx } from "./help/use-chain-tx";
import { useWithdrawItemEth } from "./eth/use-withdraw-item-eth";
import { useWithdrawItemSol } from "./solana/use-withdraw-item-sol";
import { ChainType } from "@/lib/types/chain";

export function useWithdrawItem({ chain }: { chain: ChainType }) {
  const actionRes = useChainTx(chain, useWithdrawItemEth, useWithdrawItemSol, {
    chain,
  });
  return actionRes;
}
