import { useCloseBidHoldingEth } from "./eth/use-close-bid-holding-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useCloseBidHoldingSol } from "./solana/use-close-bid-holding-sol";

export function useAbortBidHolding({
  marketplaceStr,
  makerStr,
  offerStr,
  holdingStr,
  isNativeToken,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  holdingStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(
    useCloseBidHoldingEth,
    useCloseBidHoldingSol,
    {
      marketplaceStr,
      makerStr,
      offerStr,
      holdingStr,
      isNativeToken,
    },
  );

  return chainActionRes;
}
