import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddress,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSolanaConfig } from "../../web3/solana/use-solana-config";

export function useAccountsSol() {
  const { publicKey: authority } = useWallet();
  const { solanaConfig: clusterConfig } = useSolanaConfig();

  async function getAccounts(programId: PublicKey) {
    const tokenProgram = TOKEN_PROGRAM_ID;
    const tokenProgram2022 = TOKEN_2022_PROGRAM_ID;
    const associatedTokenProgram = ASSOCIATED_TOKEN_PROGRAM_ID;
    const systemProgram = SystemProgram.programId;
    const seedAccount = Keypair.generate();

    const usdcTokenMint = new PublicKey(clusterConfig.program.usdcTokenMint);
    const projectTokenMint = new PublicKey(
      clusterConfig.program.projectTokenMint,
    );
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
      projectTokenMint,
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
      projectTokenMint,
      poolTokenAuthority,
      true,
    );

    const userConfig = PublicKey.findProgramAddressSync(
      [Buffer.from("user_config"), authority!.toBuffer()],
      programId,
    )[0];

    const platformFeeAccountUSDT = PublicKey.findProgramAddressSync(
      [Buffer.from("platform_fee"), usdcTokenMint.toBuffer()],
      programId,
    )[0];

    const platformFeeAccountSOL = PublicKey.findProgramAddressSync(
      [Buffer.from("platform_fee"), wsolTokenMint.toBuffer()],
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
      projectTokenMint,
      associatedTokenProgram,
      poolTokenAuthority,
      poolSolTokenAccount,
      userSolTokenAccount,
      platformFeeAccountUSDT,
      platformFeeAccountSOL,
    };
  }

  async function getWalletBalanceAccount(
    programId: PublicKey,
    wallet: PublicKey,
    marketplace: PublicKey,
    isNativeToken = false,
  ) {
    const usdcTokenMint = new PublicKey(clusterConfig.program.usdcTokenMint);
    const wsolTokenMint = new PublicKey(
      "So11111111111111111111111111111111111111112",
    );

    const walletCollateralTokenBalance = PublicKey.findProgramAddressSync(
      [
        Buffer.from("token_balance"),
        (isNativeToken ? wsolTokenMint : usdcTokenMint).toBuffer(),
        wallet.toBuffer(),
      ],
      programId,
    )[0];

    const walletPointTokenBalance = PublicKey.findProgramAddressSync(
      [
        Buffer.from("point_token_balance"),
        marketplace.toBuffer(),
        wallet.toBuffer(),
      ],
      programId,
    )[0];

    return {
      walletCollateralTokenBalance,
      walletPointTokenBalance,
    };
  }

  return {
    getAccounts,
    getWalletBalanceAccount,
  };
}
