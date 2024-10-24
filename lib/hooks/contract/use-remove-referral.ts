import { useRemoveReferralEth } from "./eth/use-remove-referral-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useRemoveReferralSol } from "./solana/use-remove-referral-sol";

export function useRemoveReferral() {
  const chainActionRes = useChainTx(
    useRemoveReferralEth,
    useRemoveReferralSol,
    undefined,
  );
  return chainActionRes;
}
