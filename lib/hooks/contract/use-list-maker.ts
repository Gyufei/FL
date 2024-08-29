import { useListMakerEth } from "./eth/use-list-maker-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useListMakerSol } from "./solana/use-list-maker-sol";

export function useListStock({
  marketplaceStr,
  makerStr,
  holdingStr,
  originOfferStr,
  isNativeToken,
}: {
  marketplaceStr: string;
  makerStr: string;
  holdingStr: string;
  originOfferStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(useListMakerEth, useListMakerSol, {
    marketplaceStr,
    makerStr,
    holdingStr,
    originOfferStr,
    isNativeToken,
  });

  return chainActionRes;
}
