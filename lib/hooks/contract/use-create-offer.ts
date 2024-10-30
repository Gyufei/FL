import { useCreateOfferSol } from "./solana/use-create-offer-sol";
import { useCreateOfferEth } from "./eth/use-create-offer-eth";
import { useChainTx } from "./help/use-chain-tx";
import { ChainType } from "@/lib/types/chain";

export function useCreateOffer({
  chain,
  marketSymbol,
  marketplaceStr: marketplaceStr,
  offerType,
}: {
  chain: ChainType;
  marketSymbol: string;
  marketplaceStr: string;
  offerType: "bid" | "ask";
}) {
  const chainActionRes = useChainTx(
    chain,
    useCreateOfferEth,
    useCreateOfferSol,
    {
      chain,
      marketSymbol,
      marketplaceStr,
      offerType,
    },
  );

  return chainActionRes;
}
