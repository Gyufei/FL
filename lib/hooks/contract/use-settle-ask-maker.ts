import { ChainType } from "@/lib/types/chain";
import { useSettleAskMakerEth } from "./eth/use-settle-ask-maker-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useSettleAskMakerSol } from "./solana/use-settle-ask-maker-sol";

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
    useSettleAskMakerEth,
    useSettleAskMakerSol,
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
