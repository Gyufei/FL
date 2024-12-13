import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  VersionedMessage,
  VersionedTransaction,
  Keypair,
} from "@solana/web3.js";

export function useBuildTransactionSol() {
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();

  const buildTransaction = async (callParams: any) => {
    const seed_account = Keypair.fromSecretKey(
      new Uint8Array(callParams.accounts[0]),
    );
    const recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    const versionedMessage = VersionedMessage.deserialize(
      Uint8Array.from(Buffer.from(callParams.data, "hex")),
    );
    versionedMessage.recentBlockhash = recentBlockhash;
    const versionedTransaction = new VersionedTransaction(versionedMessage);

    const txHash = await sendTransaction(versionedTransaction, connection, {
      signers: [seed_account],
    });

    return txHash;
  };

  return {
    buildTransaction,
  };
}
