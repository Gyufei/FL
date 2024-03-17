import { useEffect } from "react";
import useTadleProgram from "../use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { BN } from "bn.js";
import { useClusterConfig } from "../common/use-cluster-config";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

export function useBidTaker({
  preOrder,
  makerStr,
}: {
  preOrder: string;
  makerStr: string;
}) {
  const { publicKey: account } = useWallet();
  const { clusterConfig } = useClusterConfig();
  const { program } = useTadleProgram();

  const writeAction = async ({ receivePoint }: { receivePoint: number }) => {
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

    const perOrder = new PublicKey(preOrder);
    const maker = new PublicKey(makerStr);

    const orderA = PublicKey.findProgramAddressSync(
      [Buffer.from("order"), seedAccount.publicKey.toBuffer()],
      program.programId,
    )[0];

    // Bid Taker: 1000 USDC -> 200 point
    const res = await program.methods
      .createTaker(new BN(receivePoint))
      .accounts({
        authority: authority,
        systemConfig,
        marketPlace,
        seedAccount: seedAccount.publicKey,
        order: orderA,
        preOrder: perOrder,
        maker,
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
