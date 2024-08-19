import { useSettleAskMakerEth } from "./eth/use-settle-ask-maker-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useSettleAskMakerSol } from "./solana/use-settle-ask-maker-sol";

export function useSettleAskMaker({
  marketplaceStr,
  makerStr,
  offerStr,
  isSolStable,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  isSolStable: boolean;
}) {
  const chainActionRes = useChainTx(
    useSettleAskMakerEth,
    useSettleAskMakerSol,
    {
      marketplaceStr,
      makerStr,
      offerStr,
      isSolStable,
    },
  );

  return chainActionRes;
}
