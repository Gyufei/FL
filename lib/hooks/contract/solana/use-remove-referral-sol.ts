import useTadleProgram from "@/lib/hooks/web3/solana/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";

export function useRemoveReferralSol() {
  const { program } = useTadleProgram();
  const { getAccounts } = useAccountsSol(program.programId);

  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord();

  const writeAction = async ({ referralCode }: { referralCode: string }) => {
    const { authority, systemProgram } = await getAccounts();

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
