import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  VersionedMessage,
  VersionedTransaction,
  Keypair,
} from "@solana/web3.js";
export function useBuildTransactionSol() {
  const { publicKey, wallet, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const buildTransaction = async (callParams: any) => {
    const versionedMessage = VersionedMessage.deserialize(
      Uint8Array.from(Buffer.from(callParams.data, "hex")),
    );
    const recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    versionedMessage.recentBlockhash = recentBlockhash;

    const versionedTransaction = new VersionedTransaction(versionedMessage);
    // versionedTransaction.feePayer = publicKey;

    const seed_account = Keypair.fromSecretKey(
      new Uint8Array(callParams.accounts[0]),
    );
    versionedTransaction.sign([seed_account]);

    // await connection.simulateTransaction(versionedTransaction);
    const txHash = await sendTransaction(versionedTransaction, connection);

    return txHash;
  };

  return {
    buildTransaction,
  };
}
