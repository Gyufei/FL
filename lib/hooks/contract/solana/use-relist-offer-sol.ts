import useTadleProgram from "@/lib/hooks/web3/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";

export function useRelistOfferSol({
  marketplaceStr,
  makerStr,
  offerStr,
  stockStr,
  isSolStable,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  stockStr: string;
  isSolStable: boolean;
}) {
  const { program } = useTadleProgram();
  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts } = useAccountsSol();

  const writeAction = async () => {
    const {
      tokenProgram,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      userUsdcTokenAccount,
      poolUsdcTokenAccount,
      poolSolTokenAccount,
      usdcTokenMint,
      wsolTokenMint,
      userSolTokenAccount,
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

        poolTokenAccount: isSolStable ? poolSolTokenAccount :  poolUsdcTokenAccount,
        maker,
        marketPlace,
        tokenMint: isSolStable ? wsolTokenMint :  usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
      }).remainingAccounts([
        {
          pubkey: isSolStable ? userSolTokenAccount : userUsdcTokenAccount,
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
