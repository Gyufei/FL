import { useChainTx } from "./help/use-chain-tx";
import { useWithDrawProjectTokenEth } from "./eth/use-with-draw-project-token-eth";
import { useWithdrawProjectTokenSol } from "./solana/use-with-draw-project-token-sol";

export function useWithdrawProjectToken() {
  const actionRes = useChainTx(
    useWithDrawProjectTokenEth,
    useWithdrawProjectTokenSol,
    undefined,
  );
  return actionRes;
}
