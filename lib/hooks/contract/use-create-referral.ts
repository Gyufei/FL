import { useCreateReferralEth } from "./eth/use-create-referral-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useCreateReferralSol } from "./solana/use-create-referral-sol";

export function useCreateReferral() {
  const chainActionRes = useChainTx(
    useCreateReferralEth,
    useCreateReferralSol,
    undefined,
  );

  return chainActionRes;
}
