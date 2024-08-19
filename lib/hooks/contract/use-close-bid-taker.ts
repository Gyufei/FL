import { useCloseBidTakerEth } from "./eth/use-close-bid-taker-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useCloseBidTakerSol } from "./solana/use-close-bid-taker-sol";

export function useCloseBidTaker({
  marketplaceStr,
  makerStr,
  stockStr,
  preOfferStr,
  isSolStable,
}: {
  marketplaceStr: string;
  makerStr: string;
  stockStr: string;
  preOfferStr: string;
  isSolStable: boolean;
}) {
  const chainActionRes = useChainTx(useCloseBidTakerEth, useCloseBidTakerSol, {
    marketplaceStr,
    makerStr,
    stockStr,
    preOfferStr,
    isSolStable,
  });

  return chainActionRes;
}
