import { Program } from "@coral-xyz/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  ComputeBudgetProgram,
  PublicKey,
  Signer,
  Transaction,
} from "@solana/web3.js";

export function useBuildTransactionSol() {
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();

  const buildTransaction = async (
    methodTransaction: Transaction,
    program: Program<any>,
    signers: Signer[],
    authority: PublicKey,
  ) => {
    const transaction = new Transaction();
    transaction.add(methodTransaction);
    transaction.feePayer = authority;

    const simulate_transaction_result =
      await program.provider.connection.simulateTransaction(transaction);
    const units = Math.trunc(
      Number(simulate_transaction_result.value.unitsConsumed) * 1.2,
    );
    const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
      units,
    });

    const prioritization_fee_list =
      await program.provider.connection.getRecentPrioritizationFees();
    const fees = prioritization_fee_list
      .map((fee) => fee.prioritizationFee)
      .sort();
    const microLamports =
      fees.length > 0
        ? Math.ceil(fees.reduce((acc, cur) => acc + cur) / fees.length)
        : 1000;

    const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
      microLamports,
    });

    transaction.add(modifyComputeUnits).add(addPriorityFee);

    const txHash = await sendTransaction(transaction, connection, {
      signers,
    });

    return txHash;
  };

  return {
    buildTransaction,
  };
}
