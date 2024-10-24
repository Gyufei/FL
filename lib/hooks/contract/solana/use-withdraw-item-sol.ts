import useTadleProgram from "@/lib/hooks/web3/solana/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";
import { ChainType } from "@/lib/types/chain";

export function useWithdrawItemSol({ chain }: { chain: ChainType }) {
  const { program } = useTadleProgram();
  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord(chain);
  const { getAccounts } = useAccountsSol(program.programId);

  const writeAction = async ({
    marketplaceStr,
  }: {
    marketplaceStr: string;
  }) => {
    const {
      tokenProgram,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      poolTokenAuthority,
      projectTokenMint,
      userPointsTokenAccount,
      poolPointsTokenAccount,
    } = await getAccounts();

    const marketplace = new PublicKey(marketplaceStr);

    const userProjectTokenBalance = PublicKey.findProgramAddressSync(
      [
        Buffer.from("point_token_balance"),
        marketplace.toBuffer(),
        authority!.toBuffer(),
      ],
      program.programId,
    )[0];

    const methodTransaction = await program.methods
      .withdrawPointToken()
      .accounts({
        authority,
        userProjectTokenBalance,
        poolTokenAuthority,
        marketplace,
        systemConfig,
        poolTokenAccount: poolPointsTokenAccount,
        projectTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
      })
      .remainingAccounts([
        {
          pubkey: userPointsTokenAccount,
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
