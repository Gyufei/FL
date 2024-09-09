import useTadleProgram from "@/lib/hooks/web3/solana/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";
import { generateRandomCode } from "@/lib/utils/common";

export function useCreateReferralSol() {
  const { program } = useTadleProgram();
  const { getAccounts } = useAccountsSol(program.programId);

  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord();

  const writeAction = async (args?: {
    firstAmount?: number;
    secondAmount?: number;
  }) => {
    const RandomCode = generateRandomCode(8);
    const { firstAmount = 300000, secondAmount = 0 } = args || {};
    const { authority, systemProgram } = await getAccounts();

    const referralCodeData = PublicKey.findProgramAddressSync(
      [
        Buffer.from("create_referral_code"),
        Buffer.from(RandomCode),
        authority!.toBuffer(),
      ],
      program.programId,
    )[0];

    const referralBaseRateConfig = PublicKey.findProgramAddressSync(
      [Buffer.from("base_referral_rate")],
      program.programId,
    )[0];

    const referralExtraRateConfig = PublicKey.findProgramAddressSync(
      [Buffer.from("extra_referral_rate"), authority!.toBuffer()],
      program.programId,
    )[0];

    const methodTransaction = await program.methods
      .createReferralCode(RandomCode, new BN(firstAmount), new BN(secondAmount))
      .accounts({
        authority: authority!,
        referralBaseRateConfig,
        referralExtraRateConfig,
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
