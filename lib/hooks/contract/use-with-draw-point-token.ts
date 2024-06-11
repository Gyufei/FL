import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./help/use-accounts";
import { useBuildTransaction } from "./help/use-build-transaction";

export function useWithdrawPointToken() {
  const { program } = useTadleProgram();
  const { buildTransaction } = useBuildTransaction();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts } = useAccounts();

  const writeAction = async ({
      marketplaceStr
    }: {
      marketplaceStr: string
  }) => {
    const {
      tokenProgram,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      poolTokenAuthority,
      pointTokenMint,
      userPointsTokenAccount,
      poolPointsTokenAccount
    } = await getAccounts(program.programId);

    const marketPlace = new PublicKey(marketplaceStr);

    const userPointTokenBalance = PublicKey.findProgramAddressSync(
      [
        Buffer.from("point_token_balance"),
        marketPlace.toBuffer(),
        authority!.toBuffer()
      ],
      program.programId
    )[0];

    const methodTransaction = await program.methods.withdrawPointToken().accounts({
      authority,
      userPointTokenBalance,
      poolTokenAuthority,
      marketPlace,
      systemConfig,
      poolTokenAccount: poolPointsTokenAccount,
      tokenMint: pointTokenMint,
      tokenProgram,
      tokenProgram2022,
      systemProgram
    }).remainingAccounts([
      {
        pubkey: userPointsTokenAccount,
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
