import { useChainTx } from "./help/use-chain-tx";
import { useWithDrawPointTokenEth } from "./eth/use-with-draw-point-token-eth";
import { useWithdrawPointTokenSol } from "./solana/use-with-draw-point-token-sol";

export function useWithdrawPointToken() {
  const actionRes = useChainTx(
    useWithDrawPointTokenEth,
    useWithdrawPointTokenSol,
    undefined,
  );
  return actionRes;
}
