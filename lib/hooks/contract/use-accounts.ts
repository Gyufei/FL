import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddress,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { useClusterConfig } from "../web3/use-cluster-config";

export function useAccounts() {
  const { publicKey: account } = useWallet();
  const { clusterConfig } = useClusterConfig();

  async function getAccounts() {
    const tokenProgram = TOKEN_PROGRAM_ID;
    const tokenProgram2022 = TOKEN_2022_PROGRAM_ID;
    const associatedTokenProgram = ASSOCIATED_TOKEN_PROGRAM_ID;
    const authority = account;
    const systemProgram = SystemProgram.programId;
    const systemConfig = new PublicKey(clusterConfig.program.systemConfig);
    const seedAccount = Keypair.generate();

    const usdcTokenMint = new PublicKey(clusterConfig.program.usdcTokenMint);
    const pointTokenMint = new PublicKey(clusterConfig.program.pointTokenMint);
    const poolTokenAuthority = new PublicKey(
      clusterConfig.program.poolTokenAuthority,
    );

    const userUsdcTokenAccount = await getAssociatedTokenAddress(
      new PublicKey(clusterConfig.program.usdcTokenMint),
      authority!,
      false,
      tokenProgram,
      associatedTokenProgram,
    );
    const userPointsTokenAccount = await getAssociatedTokenAddress(
      new PublicKey(clusterConfig.program.pointTokenMint),
      authority!,
      false,
      tokenProgram,
      associatedTokenProgram,
    );

    const poolUsdcTokenAccount = new PublicKey(
      clusterConfig.program.poolUsdcTokenAccount,
    );
    const poolPointsTokenAccount = new PublicKey(
      clusterConfig.program.poolPointsTokenAccount,
    );

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
      associatedTokenProgram,
      poolTokenAuthority,
    };
  }

  return {
    getAccounts,
  };
}
