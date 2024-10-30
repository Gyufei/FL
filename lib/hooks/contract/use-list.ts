import { ChainType } from "@/lib/types/chain";
import { useListEth } from "./eth/use-list-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useListSol } from "./solana/use-list-sol";

export function useList({
  chain,
  marketplaceStr,
  makerStr,
  holdingStr,
  preOfferStr,
  originOfferStr,
  isNativeToken,
}: {
  chain: ChainType;
  marketplaceStr: string;
  makerStr: string;
  holdingStr: string;
  preOfferStr: string;
  originOfferStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(chain, useListEth, useListSol, {
    chain,
    marketplaceStr,
    makerStr,
    holdingStr,
    preOfferStr,
    originOfferStr,
    isNativeToken,
  });

  return chainActionRes;
}
