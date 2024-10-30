import { ChainType } from "@/lib/types/chain";
import { useChainTx } from "./help/use-chain-tx";
import { useWithdrawTokenSol } from "./solana/use-withdraw-token-sol";
import { useWithdrawTokenEth } from "./eth/use-withdraw-token-eth";

export type { IBalanceType } from "./solana/use-withdraw-token-sol";

export function useWithdrawToken({ chain }: { chain: ChainType }) {
  const chainActionRes = useChainTx(
    chain,
    useWithdrawTokenEth,
    useWithdrawTokenSol,
    {
      chain,
    },
  );
  return chainActionRes;
}
