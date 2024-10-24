import { ChainType } from "@/lib/types/chain";
import { useUpdateReferralEth } from "./eth/use-update-referral-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useUpdateReferralSol } from "./solana/use-update-referral-sol";

export function useUpdateReferral({
  chain,
  referrerStr,
  referralCode,
}: {
  chain: ChainType;
  referrerStr: string;
  referralCode: string;
}) {
  const actionRes = useChainTx(
    chain,
    useUpdateReferralEth,
    useUpdateReferralSol,
    {
      chain,
      referrerStr,
      referralCode,
    },
  );

  return actionRes;
}
