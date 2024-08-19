import { useWithDrawBaseTokenEth } from "./eth/use-with-draw-base-token-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useWithdrawBaseTokenSol } from "./solana/use-with-draw-base-token-sol";

export type { IBalanceType } from "./solana/use-with-draw-base-token-sol";

export function useWithdrawBaseToken() {
  const chainActionRes = useChainTx(
    useWithDrawBaseTokenEth,
    useWithdrawBaseTokenSol,
    undefined,
  );
  return chainActionRes;
}
