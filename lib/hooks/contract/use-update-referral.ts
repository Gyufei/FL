import { useUpdateReferralEth } from "./eth/use-update-referral-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useUpdateReferralSol } from "./solana/use-update-referral-sol";

export function useUpdateReferral({
  referrerStr,
  referralCode,
}: {
  referrerStr: string;
  referralCode: string;
}) {
  const actionRes = useChainTx(useUpdateReferralEth, useUpdateReferralSol, {
    referrerStr,
    referralCode,
  });

  return actionRes;
}
