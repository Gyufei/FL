import useTadleProgram from "@/lib/hooks/web3/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";

export function useCloseBidTakerSol({
  marketplaceStr,
  makerStr,
  stockStr,
  preOfferStr,
  isSolStable,
}: {
  marketplaceStr: string;
  makerStr: string;
  stockStr: string;
  preOfferStr: string;
  isSolStable: boolean;
}) {
  const { program } = useTadleProgram();
  const { getAccounts, getWalletBalanceAccount } = useAccountsSol();

  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord();

  const writeAction = async () => {
    const { authority, systemProgram, systemConfig } = await getAccounts(
      program.programId,
    );

    const marketPlace = new PublicKey(marketplaceStr);
    const maker = new PublicKey(makerStr);
    const preOffer = new PublicKey(preOfferStr);
    const stockD = new PublicKey(stockStr);

    const {
      walletBaseTokenBalance: walletDBaseTokenBalance,
      walletPointTokenBalance: walletDPointTokenBalance,
    } = await getWalletBalanceAccount(
      program.programId,
      authority!,
      marketPlace,
      isSolStable,
    );

    const methodTransaction = await program.methods
      .closeBidTaker()
      .accounts({
        authority,
        userBaseTokenBalance: walletDBaseTokenBalance,
        userPointTokenBalance: walletDPointTokenBalance,
        systemConfig,
        stock: stockD,
        preOffer,
        maker,
        marketPlace,
        systemProgram,
      })
      .transaction();

    const txHash = await buildTransaction(
      methodTransaction,
      program,
      [],
      authority!,
    );

    await recordTransaction({
      txHash,
      note: "",
    });

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
