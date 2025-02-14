import { ChainType } from "@/lib/types/chain";
import { useSettleAskMakerEth } from "./eth/use-settle-ask-maker-eth";
import { useChainTx } from "./help/use-chain-tx";

export function useSettleAskMaker({
  chain,
  marketplaceStr,
  makerStr,
  offerStr,
  isNativeToken,
}: {
  chain: ChainType;
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(
    chain,
    useSettleAskMakerEth,
    {
      chain,
      marketplaceStr,
      makerStr,
      offerStr,
      isNativeToken,
    },
  );

  return chainActionRes;
}
