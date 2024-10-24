import useTadleProgram from "@/lib/hooks/web3/solana/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";

export function useRelistSol({
  marketplaceStr,
  makerStr,
  offerStr,
  holdingStr,
  isNativeToken,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  holdingStr: string;
  isNativeToken: boolean;
}) {
  const { program } = useTadleProgram();
  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts } = useAccountsSol(program.programId);

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
    } = await getAccounts();

    const marketplace = new PublicKey(marketplaceStr);
    const offerD = new PublicKey(offerStr);
    const maker = new PublicKey(makerStr);
    const holdingD = new PublicKey(holdingStr);

    const methodTransaction = await program.methods
      .relist()
      .accounts({
        authority: authority,
        systemConfig,
        holding: holdingD,
        poolTokenAccount: isNativeToken
          ? poolSolTokenAccount
          : poolUsdcTokenAccount,
        maker,
        marketplace,
        collateralTokenMint: isNativeToken ? wsolTokenMint : usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
      })
      .remainingAccounts([
        {
          pubkey: offerD,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: isNativeToken ? userSolTokenAccount : userUsdcTokenAccount,
          isSigner: false,
          isWritable: true,
        },
      ])
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
