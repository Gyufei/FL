import useTadleProgram from "@/lib/hooks/web3/solana/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";

export type IBalanceType =
  | "taxIncome"
  | "referralBonus"
  | "salesRevenue"
  | "remainingCash"
  | "makerRefund";

export function useWithdrawCollateralTokenSol() {
  const { program } = useTadleProgram();
  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts, getWalletBalanceAccount } = useAccountsSol();

  const writeAction = async ({
    mode,
    isNativeToken,
  }: {
    isNativeToken: boolean;
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

    const { walletCollateralTokenBalance: userCollateralTokenBalance } =
      await getWalletBalanceAccount(
        program.programId,
        authority!,
        authority!,
        isNativeToken,
      );

    const methodTransaction = await program.methods
      .withdrawBaseToken({
        [mode]: {},
      })
      .accounts({
        authority,
        poolTokenAuthority,
        wsolTmpTokenAccount,
        userCollateralTokenBalance,
        systemConfig,
        poolTokenAccount: isNativeToken
          ? poolSolTokenAccount
          : poolUsdcTokenAccount,
        collateralTokenMint: isNativeToken ? wsolTokenMint : usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
      })
      .remainingAccounts([
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
