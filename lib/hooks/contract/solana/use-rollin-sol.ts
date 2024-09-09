import useTadleProgram from "@/lib/hooks/web3/solana/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";

export function useRollinSol() {
  const { program } = useTadleProgram();
  const { getAccounts } = useAccountsSol(program.programId);

  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord();

  const getRollingData = async () => {
    const { authority } = await getAccounts();
    const rollinState = PublicKey.findProgramAddressSync(
      [Buffer.from("rollin_state"), authority!.toBuffer()],
      program.programId,
    )[0];

    try {
      const rollinStateData = (await program.account.rollinStateData.fetch(
        rollinState,
      )) as any;

      return {
        rollinAt: rollinStateData.rollinAt.toString(),
      };
    } catch (e) {
      return {
        rollinAt: "0",
      };
    }
  };

  const writeAction = async () => {
    const { authority, systemProgram } = await getAccounts();

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
