import { useWithDrawCollateralTokenEth } from "./eth/use-with-draw-collateral-token-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useWithdrawCollateralTokenSol } from "./solana/use-with-draw-collateral-token-sol";

export type { IBalanceType } from "./solana/use-with-draw-collateral-token-sol";

export function useWithdrawCollateralToken() {
  const chainActionRes = useChainTx(
    useWithDrawCollateralTokenEth,
    useWithdrawCollateralTokenSol,
    undefined,
  );
  return chainActionRes;
}
