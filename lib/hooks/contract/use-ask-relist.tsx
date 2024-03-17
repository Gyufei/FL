import { useEffect } from "react";
import useTadleProgram from "../use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BN } from "bn.js";
import { useClusterConfig } from "../common/use-cluster-config";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

export function useAskRelist({
  makerStr,
  orderStr,
}: {
  makerStr: string;
  orderStr: string;
}) {
  const { publicKey: account } = useWallet();
  const { clusterConfig } = useClusterConfig();
  const { program } = useTadleProgram();

  const writeAction = async ({
    receiveTokenAmount,
    breachFee,
  }: {
    receiveTokenAmount: number;
    breachFee: number;
  }) => {
    const tokenProgram = TOKEN_PROGRAM_ID;
    const tokenProgram2022 = TOKEN_2022_PROGRAM_ID;
    const authority = account;
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

    const order = new PublicKey(orderStr);
    const maker = new PublicKey(makerStr);

    const res = await program.methods
      .relistMaker(
        new BN(receiveTokenAmount * LAMPORTS_PER_SOL),
        new BN(breachFee),
      )
      .accounts({
        authority: authority,
        systemConfig,
        order,
        userTokenAccount: userUsdcTokenAccount,
        poolTokenAccount: poolUsdcTokenAccount,
        maker,
        marketPlace,
        tokenMint: usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
      })
      .signers([])
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
