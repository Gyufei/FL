import { ChainType } from "@/lib/types/chain";
import { useRollinEth } from "./eth/use-rollin-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useRollinSol } from "./solana/use-rollin-sol";

export function useRollin(chain: ChainType) {
  const chainActionRes = useChainTx(chain, useRollinEth, useRollinSol, {
    chain,
  });

  return chainActionRes;
}
