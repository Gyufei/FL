import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./help/use-accounts";
import { useBuildTransaction } from "./help/use-build-transaction";

export function useUpdateReferral({
  referrerStr
}: {
  referrerStr: string;
}) {
  const { program } = useTadleProgram();
  const { getAccounts } = useAccounts();

  const { buildTransaction } = useBuildTransaction();
  const { recordTransaction } = useTransactionRecord();

  const writeAction = async ({
    firstAmount,
    secondAmount,
  }: {
    firstAmount: number;
    secondAmount: number;
  }) => {
    const {
      authority,
      systemProgram,
      systemConfig,
    } = await getAccounts(program.programId);

    const referrer = new PublicKey(referrerStr);

    const referralConfig = PublicKey.findProgramAddressSync(
      [
        Buffer.from("referral_config"),
        authority!.toBuffer()
      ],
      program.programId
    )[0]

    const methodTransaction = await program.methods.updateReferralConfig(
      referrer,
      new BN(firstAmount),
      new BN(secondAmount),
    ).accounts({
      manager: authority!,
      authority: authority!,
      systemConfig,
      referralConfig,
      systemProgram
    }).transaction();

    const txHash = await buildTransaction(methodTransaction, program, [], authority!);

    await recordTransaction({
      txHash,
      note: '',
    });

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
