import { ChainType } from "@/lib/types/chain";
import { useRemoveReferralEth } from "./eth/use-remove-referral-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useRemoveReferralSol } from "./solana/use-remove-referral-sol";

export function useRemoveReferral(chain: ChainType) {
  const chainActionRes = useChainTx(
    chain,
    useRemoveReferralEth,
    useRemoveReferralSol,
    {
      chain,
    },
  );
  return chainActionRes;
}
