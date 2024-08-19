import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddress,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSolanaConfig } from "../../web3/use-solana-config";

export function useAccountsSol() {
  const { publicKey: authority } = useWallet();
  const { clusterConfig } = useSolanaConfig();

  async function getAccounts(programId: PublicKey) {
    const tokenProgram = TOKEN_PROGRAM_ID;
    const tokenProgram2022 = TOKEN_2022_PROGRAM_ID;
    const associatedTokenProgram = ASSOCIATED_TOKEN_PROGRAM_ID;
    const systemProgram = SystemProgram.programId;
    const seedAccount = Keypair.generate();

    const usdcTokenMint = new PublicKey(clusterConfig.program.usdcTokenMint);
    const pointTokenMint = new PublicKey(clusterConfig.program.pointTokenMint);
    const wsolTokenMint = new PublicKey(
      "So11111111111111111111111111111111111111112",
    );

    const systemConfig = PublicKey.findProgramAddressSync(
      [Buffer.from("system_config")],
      programId,
    )[0];

    const poolTokenAuthority = PublicKey.findProgramAddressSync(
      [systemConfig.toBuffer()],
      programId,
    )[0];

    const userSolTokenAccount = PublicKey.default;

    const userUsdcTokenAccount = await getAssociatedTokenAddress(
      usdcTokenMint,
      authority!,
      false,
      tokenProgram,
      associatedTokenProgram,
    );

    const userPointsTokenAccount = await getAssociatedTokenAddress(
      pointTokenMint,
      authority!,
      false,
      tokenProgram,
      associatedTokenProgram,
    );

    const poolUsdcTokenAccount = await getAssociatedTokenAddress(
      usdcTokenMint,
      poolTokenAuthority,
      true,
    );

    const poolSolTokenAccount = await getAssociatedTokenAddress(
      wsolTokenMint,
      poolTokenAuthority,
      true,
    );

    const poolPointsTokenAccount = await getAssociatedTokenAddress(
      pointTokenMint,
      poolTokenAuthority,
      true,
    );

    const userConfig = PublicKey.findProgramAddressSync(
      [Buffer.from("user_config"), authority!.toBuffer()],
      programId,
    )[0];

    return {
      tokenProgram,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      userConfig,
      userUsdcTokenAccount,
      poolUsdcTokenAccount,
      usdcTokenMint,
      seedAccount,
      wsolTokenMint,
      userPointsTokenAccount,
      poolPointsTokenAccount,
      pointTokenMint,
      associatedTokenProgram,
      poolTokenAuthority,
      poolSolTokenAccount,
      userSolTokenAccount,
    };
  }

  async function getWalletBalanceAccount(
    programId: PublicKey,
    wallet: PublicKey,
    marketPlace: PublicKey,
    isSolStable = false,
  ) {
    const usdcTokenMint = new PublicKey(clusterConfig.program.usdcTokenMint);
    const wsolTokenMint = new PublicKey(
      "So11111111111111111111111111111111111111112",
    );

    const walletBaseTokenBalance = PublicKey.findProgramAddressSync(
      [
        Buffer.from("token_balance"),
        (isSolStable ? wsolTokenMint : usdcTokenMint).toBuffer(),
        wallet.toBuffer(),
      ],
      programId,
    )[0];

    const walletPointTokenBalance = PublicKey.findProgramAddressSync(
      [
        Buffer.from("point_token_balance"),
        marketPlace.toBuffer(),
        wallet.toBuffer(),
      ],
      programId,
    )[0];

    return {
      walletBaseTokenBalance,
      walletPointTokenBalance,
    };
  }

  return {
    getAccounts,
    getWalletBalanceAccount,
  };
}
