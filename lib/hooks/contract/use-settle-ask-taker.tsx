import { useEffect } from "react";
import useTadleProgram from "../use-tadle-program";
import useTxStatus from "./use-tx-status";
import {
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Keypair,
} from "@solana/web3.js";
import { BN } from "bn.js";
import { useClusterConfig } from "../common/use-cluster-config";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

export function useSettleAskTaker({
  makerStr,
  orderStr,
  preOrderStr,
}: {
  makerStr: string;
  orderStr: string;
  preOrderStr: string;
}) {
  const { publicKey: account } = useWallet();
  const { clusterConfig } = useClusterConfig();
  const { program } = useTadleProgram();

  const writeAction = async () => {
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
    const userPointsTokenAccount = await getAssociatedTokenAddress(
      new PublicKey(clusterConfig.program.pointTokenMint),
      account!,
      false,
      tokenProgram,
    );
    const poolUsdcTokenAccount = new PublicKey(
      clusterConfig.program.poolUsdcTokenAccount,
    );
    const poolPointsTokenAccount = new PublicKey(
      clusterConfig.program.poolPointsTokenAccount,
    );
    const usdcTokenMint = new PublicKey(clusterConfig.program.usdcTokenMint);
    const pointTokenMint = new PublicKey(clusterConfig.program.pointTokenMint);

    const programAuthority = Keypair.generate();

    const poolTokenAuthority = PublicKey.findProgramAddressSync(
      [systemConfig.toBuffer()],
      program.programId,
    )[0];

    const wsolTmpTokenAccount = PublicKey.findProgramAddressSync(
      [Buffer.from("wsol_tmp_token_account"), account!.toBuffer()],
      program.programId,
    )[0];

    const bidOrder = new PublicKey(orderStr);
    const bidMaker = new PublicKey(makerStr);
    const bidMakerOrder = new PublicKey(preOrderStr);

    // set 10 token per point
    const time_now = Math.ceil(new Date().getTime() / 1000) - 10;
    await program.methods
      .updateMarketPlace(
        pointTokenMint,
        new BN(10 * LAMPORTS_PER_SOL),
        new BN(time_now),
        new BN(86400),
      )
      .accounts({
        authority: programAuthority.publicKey,
        systemConfig,
        marketPlace,
      })
      .signers([programAuthority])
      .rpc();

    const res = await program.methods
      .settleAskTaker(new BN(100))
      .accounts({
        authority,
        systemConfig,
        maker: bidMaker,
        order: bidOrder,
        preOrder: bidMakerOrder,
        marketPlace,
        poolTokenAuthority,
        userTokenAccount: userUsdcTokenAccount,
        poolTokenAccount: poolUsdcTokenAccount,
        userPointTokenAccount: userPointsTokenAccount,
        poolPointTokenAccount: poolPointsTokenAccount,
        wsolTmpTokenAccount,
        tokenMint: usdcTokenMint,
        pointTokenMint,
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
