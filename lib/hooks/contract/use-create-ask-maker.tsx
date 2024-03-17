import { useEffect } from "react";
import useTadleProgram from "../use-tadle-program";
import useTxStatus from "./use-tx-status";
import {
  PublicKey,
  LAMPORTS_PER_SOL,
  Keypair,
  SystemProgram,
} from "@solana/web3.js";
import { BN } from "bn.js";
import { useClusterConfig } from "../common/use-cluster-config";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

export function useCreateAskMaker() {
  const { publicKey: account } = useWallet();
  const { clusterConfig } = useClusterConfig();
  const { program } = useTadleProgram();

  const writeAction = async ({
    sellPointAmount,
    receiveTokenAmount,
    breachFee,
    taxForSub,
  }: {
    sellPointAmount: number;
    receiveTokenAmount: number;
    breachFee: number;
    taxForSub: number;
  }) => {
    const tokenProgram = TOKEN_PROGRAM_ID;
    const tokenProgram2022 = TOKEN_2022_PROGRAM_ID;
    const authority = account;
    const seedAccount = Keypair.generate();
    const systemProgram = SystemProgram.programId;
    const marketPlace = new PublicKey(clusterConfig.program.marketPlace);
    const systemConfig = new PublicKey(clusterConfig.program.systemConfig);
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

    const maker = PublicKey.findProgramAddressSync(
      [Buffer.from("marker"), seedAccount.publicKey.toBuffer()],
      program.programId,
    )[0];
    const order = PublicKey.findProgramAddressSync(
      [Buffer.from("order"), seedAccount.publicKey.toBuffer()],
      program.programId,
    )[0];

    const res = await program.methods
      .createMaker(
        new BN(sellPointAmount),
        new BN(receiveTokenAmount * LAMPORTS_PER_SOL),
        new BN(breachFee),
        new BN(taxForSub),
        false,
        {
          ask: {},
        },
      )
      .accounts({
        authority,
        seedAccount: seedAccount.publicKey,
        marketPlace,
        systemConfig,
        maker,
        order,
        userTokenAccount: userUsdcTokenAccount,
        poolTokenAccount: poolUsdcTokenAccount,
        tokenMint: usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
      })
      .signers([seedAccount])
      .rpc();

    return res;
  };

  const wrapRes = useTxStatus(writeAction);

  useEffect(() => {
    if (wrapRes.isSuccess) {
      return;
    }
  }, [wrapRes.isSuccess]);

  return wrapRes;
}