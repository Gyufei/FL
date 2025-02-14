import { ChainType } from "@/lib/types/chain";
import { useCreateReferralEth } from "./eth/use-create-referral-eth";
import { useChainTx } from "./help/use-chain-tx";

export function useCreateReferral(chain: ChainType) {
  const chainActionRes = useChainTx(
    chain,
    useCreateReferralEth,
    { chain },
  );

  return chainActionRes;
}
