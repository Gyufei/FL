import { useCloseBidTakerEth } from "./eth/use-close-bid-taker-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useCloseBidTakerSol } from "./solana/use-close-bid-taker-sol";

export function useCloseBidTaker({
  marketplaceStr,
  makerStr,
  holdingStr,
  preOfferStr,
  isNativeToken,
}: {
  marketplaceStr: string;
  makerStr: string;
  holdingStr: string;
  preOfferStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(useCloseBidTakerEth, useCloseBidTakerSol, {
    marketplaceStr,
    makerStr,
    holdingStr,
    preOfferStr,
    isNativeToken,
  });

  return chainActionRes;
}
