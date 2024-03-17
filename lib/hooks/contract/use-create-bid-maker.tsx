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

export function useCreateBidMaker() {
  const { publicKey: account } = useWallet();
  const { clusterConfig } = useClusterConfig();
  const { program } = useTadleProgram();

  const writeAction = async ({
    payTokenAmount,
    receivePointAmount,
    breachFee,
    taxForSub,
  }: {
    payTokenAmount: number;
    receivePointAmount: number;
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

    const bidMaker = PublicKey.findProgramAddressSync(
      [Buffer.from("marker"), seedAccount.publicKey.toBuffer()],
      program.programId,
    )[0];
    const bidMakerOrder = PublicKey.findProgramAddressSync(
      [Buffer.from("order"), seedAccount.publicKey.toBuffer()],
      program.programId,
    )[0];

    // 5000 usdc => 1000 points
    // settle_breach_fee: 50% => 5000
    // each_trade_tax: 3% => 300
    const res = await program.methods
      .createMaker(
        new BN(receivePointAmount),
        new BN(payTokenAmount * LAMPORTS_PER_SOL),
        new BN(breachFee),
        new BN(taxForSub),
        false,
        {
          bid: {},
        },
      )
      .accounts({
        authority,
        seedAccount: seedAccount.publicKey,
        marketPlace,
        systemConfig,
        maker: bidMaker,
        order: bidMakerOrder,
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
