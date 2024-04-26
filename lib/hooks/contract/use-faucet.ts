import * as anchor from "@coral-xyz/anchor";
import useTxStatus from "./use-tx-status";
import { PublicKey } from "@solana/web3.js";
import useProvider from "../web3/use-provider";
import { useWallet } from "@solana/wallet-adapter-react";
import { useClusterConfig } from "../web3/use-cluster-config";
import { TadleFaucetAbi } from "@/lib/abi/tadle_faucet";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

export function useFaucet() {
  const { provider } = useProvider();
  const { clusterConfig } = useClusterConfig();

  const programId = new PublicKey(
    clusterConfig.program?.faucet?.tadleFaucet || "",
  );
  const program = new anchor.Program(
    TadleFaucetAbi as any,
    programId,
    provider,
  );
  const systemProgram = anchor.web3.SystemProgram.programId;

  const { publicKey: authority } = useWallet();

  const tokenProgram = TOKEN_PROGRAM_ID;
  const tokenProgram2022 = TOKEN_2022_PROGRAM_ID;
  const associatedTokenProgram = ASSOCIATED_TOKEN_PROGRAM_ID;
  const systemConfig = new PublicKey(
    clusterConfig.program.faucet?.systemConfig || "",
  );
  const poolTokenAuthority = new PublicKey(
    clusterConfig.program.faucet?.poolTokenAuthority || "",
  );

  const usdcTokenMint = new PublicKey(clusterConfig.program.usdcTokenMint);

  const poolUsdcTokenAccount = new PublicKey(
    clusterConfig.program.faucet?.poolTokenAccount || '',
  )

  const writeAction = async () => {
    const userUsdcTokenAccount = await getAssociatedTokenAddress(
      usdcTokenMint,
      authority!,
      false,
      tokenProgram,
      associatedTokenProgram,
    );


    const tokenConfig = PublicKey.findProgramAddressSync(
      [
        Buffer.from("token_config"),
        authority!.toBuffer(),
        usdcTokenMint.toBuffer(),
      ],
      program.programId,
    )[0];

    const txHash = await program.methods
      .faucet()
      .accounts({
        authority: authority,
        systemConfig,
        tokenConfig,
        poolTokenAuthority,
        userTokenAccount: userUsdcTokenAccount,
        poolTokenAccount: poolUsdcTokenAccount,
        tokenMint: usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        poolTokenProgram: tokenProgram,
        associatedTokenProgram,
        systemProgram,
      })
      .signers([])
      .rpc();

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
