import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { useClusterConfig } from "../common/use-cluster-config";

export function useAccounts() {
  const { publicKey: account } = useWallet();
  const { clusterConfig } = useClusterConfig();

  async function getAccounts() {
    const tokenProgram = TOKEN_PROGRAM_ID;
    const tokenProgram2022 = TOKEN_2022_PROGRAM_ID;
    const authority = account;
    const systemProgram = SystemProgram.programId;
    const systemConfig = new PublicKey(clusterConfig.program.systemConfig);
    const seedAccount = Keypair.generate();

    const userUsdcTokenAccount = await getAssociatedTokenAddress(
      new PublicKey(clusterConfig.program.usdcTokenMint),
      account!,
      false,
      tokenProgram,
    );
    const poolUsdcTokenAccount = new PublicKey(
      clusterConfig.program.poolUsdcTokenAccount,
    );
    const usdcTokenMint = new PublicKey(clusterConfig.program.usdcTokenMint);

    const userPointsTokenAccount = await getAssociatedTokenAddress(
      new PublicKey(clusterConfig.program.pointTokenMint),
      account!,
      false,
      tokenProgram,
    );
    const poolPointsTokenAccount = new PublicKey(
      clusterConfig.program.poolPointsTokenAccount,
    );
    const pointTokenMint = new PublicKey(clusterConfig.program.pointTokenMint);

    return {
      tokenProgram,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      userUsdcTokenAccount,
      poolUsdcTokenAccount,
      usdcTokenMint,
      seedAccount,
      userPointsTokenAccount,
      poolPointsTokenAccount,
      pointTokenMint,
    };
  }

  return {
    getAccounts,
  };
}
