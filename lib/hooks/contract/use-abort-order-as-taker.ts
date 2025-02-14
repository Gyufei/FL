import { ChainType } from "@/lib/types/chain";
import { useChainTx } from "./help/use-chain-tx";
import { useAbortOrderAsTakerEth } from "./eth/use-abort-order-as-taker";

export function useAbortOrderAsTaker({
  chain,
  marketplaceStr,
  makerStr,
  offerStr,
  holdingStr,
  isNativeToken,
}: {
  chain: ChainType;
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  holdingStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(
    chain,
    useAbortOrderAsTakerEth,
    {
      chain,
      marketplaceStr,
      makerStr,
      offerStr,
      holdingStr,
      isNativeToken,
    },
  );

  return chainActionRes;
}
