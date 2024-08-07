import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./help/use-accounts";
import { useBuildTransaction } from "./help/use-build-transaction";

export function useRemoveReferral() {
  const { program } = useTadleProgram();
  const { getAccounts } = useAccounts();

  const { buildTransaction } = useBuildTransaction();
  const { recordTransaction } = useTransactionRecord();

  const writeAction = async ({ referralCode }: { referralCode: string }) => {
    const { authority, systemProgram } = await getAccounts(program.programId);

    const referralCodeData = PublicKey.findProgramAddressSync(
      [
        Buffer.from("create_referral_code"),
        Buffer.from(referralCode),
        authority!.toBuffer(),
      ],
      program.programId,
    )[0];

    const methodTransaction = await program.methods
      .removeReferralCode(referralCode)
      .accounts({
        authority: authority!,
        referralCodeData,
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
