import { useChainTx } from "./help/use-chain-tx";
import { useWithdrawItemEth } from "./eth/use-withdraw-item-eth";
import { useWithdrawItemSol } from "./solana/use-withdraw-item-sol";

export function useWithdrawItem() {
  const actionRes = useChainTx(
    useWithdrawItemEth,
    useWithdrawItemSol,
    undefined,
  );
  return actionRes;
}
