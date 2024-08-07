import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./help/use-accounts";
import { useBuildTransaction } from "./help/use-build-transaction";
import { generateRandomCode } from "@/lib/utils/common";

export function useCreateReferral() {
  const { program } = useTadleProgram();
  const { getAccounts } = useAccounts();

  const { buildTransaction } = useBuildTransaction();
  const { recordTransaction } = useTransactionRecord();

  const writeAction = async (args?: {
    firstAmount?: number;
    secondAmount?: number;
  }) => {
    const RandomCode = generateRandomCode(8);
    const { firstAmount = 300000, secondAmount = 0 } = args || {};
    const { authority, systemProgram } = await getAccounts(program.programId);

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
