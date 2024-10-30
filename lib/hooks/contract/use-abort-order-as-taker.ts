import { ChainType } from "@/lib/types/chain";
import { useChainTx } from "./help/use-chain-tx";
import { useAbortOrderAsTakerSol } from "./solana/use-abort-order-as-taker-sol";
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
    useAbortOrderAsTakerSol,
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
