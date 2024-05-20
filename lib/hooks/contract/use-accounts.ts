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
  const { publicKey: authority } = useWallet();
  const { clusterConfig } = useClusterConfig();

  async function getAccounts() {
    const tokenProgram = TOKEN_PROGRAM_ID;
    const tokenProgram2022 = TOKEN_2022_PROGRAM_ID;
    const associatedTokenProgram = ASSOCIATED_TOKEN_PROGRAM_ID;
    const systemProgram = SystemProgram.programId;
    const seedAccount = Keypair.generate();

    const usdcTokenMint = new PublicKey(clusterConfig.program.usdcTokenMint);
    const pointTokenMint = new PublicKey(clusterConfig.program.pointTokenMint);

    const systemConfig = new PublicKey(clusterConfig.program.systemConfig);
    const poolTokenAuthority = new PublicKey(
      clusterConfig.program.poolTokenAuthority,
    );

    // const systemConfig = await findProgramAddress(
    //   [
    //     Buffer.from("system_config")
    //   ],
    //   program.programId
    // )[0];

    // const poolTokenAuthority = await findProgramAddress(
    //   [
    //     systemConfig.toBuffer()
    //   ],
    //   program.programId
    // )[0];

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

    const poolUsdcTokenAccount = await getAssociatedTokenAddress(
      usdcTokenMint,
      poolTokenAuthority,
      true
    );

    const poolPointsTokenAccount = await getAssociatedTokenAddress(
      pointTokenMint,
      poolTokenAuthority,
      true
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
