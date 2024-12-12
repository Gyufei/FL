import { Program } from "@coral-xyz/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  ComputeBudgetProgram,
  Transaction,
  VersionedMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import useTadleProgram from "@/lib/hooks/web3/solana/use-tadle-program";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";

export function useBuildTransactionSol() {
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useTadleProgram();
  const { getAccounts } = useAccountsSol(program.programId);
  const buildTransaction = async (callParams: any) => {
    const { authority, seedAccount } = await getAccounts();
    console.log(
      "🚀 ~ buildTransaction ~ authority, seedAccount:",
      authority,
      seedAccount,
    );

    const transaction = new Transaction();
    const versionedMessage = VersionedMessage.deserialize(
      Uint8Array.from(Buffer.from(callParams.data, "hex")),
    );
    console.log(JSON.stringify(versionedMessage, null, 2));
    const versionedTransaction = new VersionedTransaction(versionedMessage);
    // transaction.add(instruction);
    // versionedTransaction.feePayer = authority;

    // const simulate_transaction_result =
    //   await program.provider.connection.simulateTransaction(transaction);
    // const units = Math.trunc(
    //   Number(simulate_transaction_result.value.unitsConsumed) * 1.2,
    // );
    // const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
    //   units,
    // });

    // const prioritization_fee_list =
    //   await program.provider.connection.getRecentPrioritizationFees();
    // const fees = prioritization_fee_list
    //   .map((fee) => fee.prioritizationFee)
    //   .sort();
    // const microLamports =
    //   fees.length > 0
    //     ? Math.ceil(fees.reduce((acc, cur) => acc + cur) / fees.length)
    //     : 1000;

    // const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
    //   microLamports,
    // });

    // versionedTransaction.add(modifyComputeUnits).add(addPriorityFee);

    const txHash = await sendTransaction(versionedTransaction, connection, {
      signers: callParams.accounts,
    });

    return txHash;
  };

  return {
    buildTransaction,
  };
}
