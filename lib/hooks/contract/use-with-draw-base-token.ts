import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./help/use-accounts";
import { useBuildTransaction } from "./help/use-build-transaction";

export type IBalanceType = "taxIncome" |
      "referralBonus" |
      "salesRevenue" |
      "remainingCash" |
      "makerRefund"

export function useWithdrawBaseToken() {
  const { program } = useTadleProgram();
  const { buildTransaction } = useBuildTransaction();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts } = useAccounts();

  const writeAction = async ({ 
    mode
  }: {
    mode: IBalanceType
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
      poolUsdcTokenAccount,
    } = await getAccounts(program.programId);

    const wsolTmpTokenAccount = PublicKey.findProgramAddressSync(
      [Buffer.from("wsol_tmp_token_account"), authority!.toBuffer()],
      program.programId,
    )[0];

    const userBaseTokenBalance = PublicKey.findProgramAddressSync(
      [
        Buffer.from("token_balance"),
        usdcTokenMint.toBuffer(),
        authority!.toBuffer()
      ],
      program.programId
    )[0];


    const methodTransaction = await program.methods.withdrawBaseToken(
      {
        [mode]: {}
      }
    ).accounts({
      authority,
      poolTokenAuthority,
      wsolTmpTokenAccount,
      userBaseTokenBalance,
      systemConfig,
      poolTokenAccount: poolUsdcTokenAccount,
      tokenMint: usdcTokenMint,
      tokenProgram,
      tokenProgram2022,
      systemProgram
    }).remainingAccounts([
      {
        pubkey: userUsdcTokenAccount,
        isSigner: false,
        isWritable: true
      }
    ]).transaction()

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
