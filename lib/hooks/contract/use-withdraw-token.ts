import { ChainType } from "@/lib/types/chain";
import { useWithdrawTokenEth } from "./eth/use-withdraw-token-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useWithdrawTokenSol } from "./solana/use-withdraw-token-sol";

export type { IBalanceType } from "./solana/use-withdraw-token-sol";

export function useWithdrawCollateralToken(chain: ChainType) {
  const chainActionRes = useChainTx(useWithdrawTokenEth, useWithdrawTokenSol, {
    chain,
  });
  return chainActionRes;
}
