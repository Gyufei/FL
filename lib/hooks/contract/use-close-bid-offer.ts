import { ChainType } from "@/lib/types/chain";
import { useCloseBidOfferEth } from "./eth/use-close-bid-offer-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useCloseBidOfferSol } from "./solana/use-close-bid-offer-sol";

export function useCloseBidOffer({
  chain,
  marketplaceStr,
  makerStr,
  offerStr,
  isNativeToken,
}: {
  chain: ChainType;
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(useCloseBidOfferEth, useCloseBidOfferSol, {
    chain,
    marketplaceStr,
    makerStr,
    offerStr,
    isNativeToken,
  });

  return chainActionRes;
}
