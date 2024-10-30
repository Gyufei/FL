import { useChainTx } from "./help/use-chain-tx";
import { useAbortAskOfferEth } from "./eth/use-abort-ask-offer-eth";
import { useAbortAskOfferSol } from "./solana/use-abort-ask-offer-sol";
import { ChainType } from "@/lib/types/chain";

export function useAbortAskOffer({
  chain,
  marketplaceStr,
  makerStr,
  offerStr,
  holdingStr,
  isNativeToken,
}: {
  chain: ChainType;
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  holdingStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(
    chain,
    useAbortAskOfferEth,
    useAbortAskOfferSol,
    {
      chain,
      marketplaceStr,
      makerStr,
      offerStr,
      holdingStr,
      isNativeToken,
    },
  );

  return chainActionRes;
}
