import { useListMakerEth } from "./eth/use-list-maker-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useListMakerSol } from "./solana/use-list-maker-sol";

export function useListStock({
  marketplaceStr,
  makerStr,
  stockStr,
  originOfferStr,
  isNativeToken,
}: {
  marketplaceStr: string;
  makerStr: string;
  stockStr: string;
  originOfferStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(useListMakerEth, useListMakerSol, {
    marketplaceStr,
    makerStr,
    stockStr,
    originOfferStr,
    isNativeToken,
  });

  return chainActionRes;
}
