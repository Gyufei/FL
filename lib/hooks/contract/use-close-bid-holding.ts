import { useCloseBidHoldingEth } from "./eth/use-close-bid-holding-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useCloseBidHoldingSol } from "./solana/use-close-bid-holding-sol";

// Not use
export function useCloseBidHolding({
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
  const chainActionRes = useChainTx(
    useCloseBidHoldingEth,
    useCloseBidHoldingSol,
    {
      marketplaceStr,
      makerStr,
      holdingStr,
      preOfferStr,
      isNativeToken,
    },
  );

  return chainActionRes;
}
