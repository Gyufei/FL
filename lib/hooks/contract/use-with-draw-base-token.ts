import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./help/use-accounts";
import { useBuildTransaction } from "./help/use-build-transaction";

export type IBalanceType =
  | "taxIncome"
  | "referralBonus"
  | "salesRevenue"
  | "remainingCash"
  | "makerRefund";

export function useWithdrawBaseToken() {
  const { program } = useTadleProgram();
  const { buildTransaction } = useBuildTransaction();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts, getWalletBalanceAccount } = useAccounts();

  const writeAction = async ({
    mode,
    isSol,
  }: {
    isSol: boolean;
    mode: IBalanceType;
  }) => {
    const {
      tokenProgram,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      usdcTokenMint,
      poolTokenAuthority,
      userUsdcTokenAccount,
      poolSolTokenAccount,
      poolUsdcTokenAccount,
      wsolTokenMint,
      userSolTokenAccount,
    } = await getAccounts(program.programId);

    const wsolTmpTokenAccount = PublicKey.findProgramAddressSync(
      [Buffer.from("wsol_tmp_token_account"), authority!.toBuffer()],
      program.programId,
    )[0];

    const { walletBaseTokenBalance: userBaseTokenBalance } =
      await getWalletBalanceAccount(
        program.programId,
        authority!,
        authority!,
        isSol,
      );

    const methodTransaction = await program.methods
      .withdrawBaseToken({
        [mode]: {},
      })
      .accounts({
        authority,
        poolTokenAuthority,
        wsolTmpTokenAccount,
        userBaseTokenBalance,
        systemConfig,
        poolTokenAccount: isSol ? poolSolTokenAccount : poolUsdcTokenAccount,
        tokenMint: isSol ? wsolTokenMint : usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
      })
      .remainingAccounts([
        {
          pubkey: isSol ? userSolTokenAccount : userUsdcTokenAccount,
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
