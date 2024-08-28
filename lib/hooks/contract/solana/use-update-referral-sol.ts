import useTadleProgram from "@/lib/hooks/web3/solana/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";

export function useUpdateReferralSol({
  referrerStr,
  referralCode,
}: {
  referrerStr: string;
  referralCode: string;
}) {
  const { program } = useTadleProgram();
  const { getAccounts } = useAccountsSol();

  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord();

  const writeAction = async () => {
    const { authority, systemProgram, systemConfig } = await getAccounts(
      program.programId,
    );

    const referrer = new PublicKey(referrerStr);

    const referralCodeData = PublicKey.findProgramAddressSync(
      [
        Buffer.from("create_referral_code"),
        Buffer.from(referralCode),
        referrer.toBuffer(),
      ],
      program.programId,
    )[0];

    const referralConfig = PublicKey.findProgramAddressSync(
      [Buffer.from("referral_config"), authority!.toBuffer()],
      program.programId,
    )[0];

    const methodTransaction = await program.methods
      .updateReferralConfig(referrer, referralCode)
      .accounts({
        authority: authority!,
        systemConfig,
        referralCodeData,
        referralConfig,
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
