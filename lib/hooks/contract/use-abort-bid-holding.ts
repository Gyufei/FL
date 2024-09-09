import { useAbortBidHoldingEth } from "./eth/use-abort-bid-holding-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useAbortBidHoldingSol } from "./solana/use-abort-bid-holding-sol";

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
    useAbortBidHoldingEth,
    useAbortBidHoldingSol,
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
