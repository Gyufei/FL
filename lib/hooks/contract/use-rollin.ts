import { useRollinEth } from "./eth/use-rollin-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useRollinSol } from "./solana/use-rollin-sol";

export function useRollin() {
  const chainActionRes = useChainTx(useRollinEth, useRollinSol, undefined);

  return chainActionRes;
}
