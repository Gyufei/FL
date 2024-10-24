import { ChainType } from "@/lib/types/chain";
import { useCreateReferralEth } from "./eth/use-create-referral-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useCreateReferralSol } from "./solana/use-create-referral-sol";

export function useCreateReferral(chain: ChainType) {
  const chainActionRes = useChainTx(
    chain,
    useCreateReferralEth,
    useCreateReferralSol,
    { chain },
  );

  return chainActionRes;
}
