import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./help/use-accounts";
import { useBuildTransaction } from "./help/use-build-transaction";

export function useRelistOffer({
  marketplaceStr,
  makerStr,
  offerStr,
  stockStr,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  stockStr: string;
}) {
  const { program } = useTadleProgram();
  const { buildTransaction } = useBuildTransaction();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts } = useAccounts();

  const writeAction = async () => {
    const {
      tokenProgram,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      userUsdcTokenAccount,
      poolUsdcTokenAccount,
      usdcTokenMint,
    } = await getAccounts(program.programId);

    const marketPlace = new PublicKey(marketplaceStr);
    const offerD = new PublicKey(offerStr);
    const maker = new PublicKey(makerStr);
    const stockD = new PublicKey(stockStr);

    const methodTransaction = await program.methods
      .relist()
      .accounts({
        authority: authority,
        systemConfig,
        offer: offerD,
        stock: stockD,

        poolTokenAccount: poolUsdcTokenAccount,
        maker,
        marketPlace,
        tokenMint: usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
      }).remainingAccounts([
        {
          pubkey: userUsdcTokenAccount,
          isSigner: false,
          isWritable: true
        }
      ]).transaction();

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
