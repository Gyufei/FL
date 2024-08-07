import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./help/use-accounts";
import { useBuildTransaction } from "./help/use-build-transaction";

export function useCloseBidTaker({
  marketplaceStr,
  makerStr,
  stockStr,
  preOfferStr,
  isSol,
}: {
  marketplaceStr: string;
  makerStr: string;
  stockStr: string;
  preOfferStr: string;
  isSol: boolean;
}) {
  const { program } = useTadleProgram();
  const { getAccounts, getWalletBalanceAccount } = useAccounts();

  const { buildTransaction } = useBuildTransaction();
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
      isSol,
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
