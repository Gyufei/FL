import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./help/use-accounts";
import { useBuildTransaction } from "./help/use-build-transaction";

export function useCloseBidOffer({
  marketplaceStr,
  makerStr,
  offerStr,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
}) {
  const { program } = useTadleProgram();
  const { getAccounts, getWalletBalanceAccount } = useAccounts();

  const { buildTransaction } = useBuildTransaction();
  const { recordTransaction } = useTransactionRecord();

  const writeAction = async () => {
    const {
      authority,
      systemProgram,
      systemConfig,
    } = await getAccounts(program.programId);

    const marketPlace = new PublicKey(marketplaceStr);
    const maker = new PublicKey(makerStr);
    const offerD = new PublicKey(offerStr);

    const {
      walletBaseTokenBalance: walletDBaseTokenBalance,
    } = await getWalletBalanceAccount(program.programId, authority!, marketPlace)

    const methodTransaction = await program.methods
      .closeBidOffer()
      .accounts({
        authority,
        userBaseTokenBalance: walletDBaseTokenBalance,
        systemConfig,
        offer: offerD,
        maker,
        marketPlace,
        systemProgram,
      }).transaction();

    const txHash = await buildTransaction(methodTransaction, program, [], authority!);

    await recordTransaction({
      txHash,
      note: "",
    });

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
