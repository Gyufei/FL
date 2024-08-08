import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./help/use-accounts";
import { useBuildTransaction } from "./help/use-build-transaction";

export function useRollin() {
  const { program } = useTadleProgram();
  const { getAccounts } = useAccounts();

  const { buildTransaction } = useBuildTransaction();
  const { recordTransaction } = useTransactionRecord();

  const getRollingData = async () => {
    const { authority } = await getAccounts(program.programId);
    const rollinState = PublicKey.findProgramAddressSync(
      [Buffer.from("rollin_state"), authority!.toBuffer()],
      program.programId,
    )[0];

    const rollinStateData = (await program.account.rollinStateData.fetch(
      rollinState,
    )) as any;

    return {
      rollinAt: rollinStateData.rollinAt.toString(),
    };
  };

  const writeAction = async () => {
    const { authority, systemProgram } = await getAccounts(program.programId);

    const rollinState = PublicKey.findProgramAddressSync(
      [Buffer.from("rollin_state"), authority!.toBuffer()],
      program.programId,
    )[0];

    const methodTransaction = await program.methods
      .rollin()
      .accounts({
        authority: authority!,
        rollinState,
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

  return {
    ...wrapRes,
    getRollingData,
  };
}
