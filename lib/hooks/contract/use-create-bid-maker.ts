import { useEffect } from "react";
import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./use-accounts";
import { useAllOrders } from "../api/use-all-orders";

export function useCreateBidMaker({
  marketplaceStr,
}: {
  marketplaceStr: string;
}) {
  const { program } = useTadleProgram();
  const { getAccounts } = useAccounts();
  const { recordTransaction } = useTransactionRecord();

  const writeAction = async ({
    payTokenAmount,
    receivePointAmount,
    breachFee,
    taxForSub,
    note,
  }: {
    payTokenAmount: number;
    receivePointAmount: number;
    breachFee: number;
    taxForSub: number;
    note: string;
  }) => {
    const {
      tokenProgram,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      userUsdcTokenAccount,
      poolUsdcTokenAccount,
      usdcTokenMint,
      seedAccount,
      associatedTokenProgram,
      poolTokenAuthority,
    } = await getAccounts();

    const marketPlace = new PublicKey(marketplaceStr);
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
    const txHash = await program.methods
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
        poolTokenAuthority,
        tokenMint: usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        poolTokenProgram: tokenProgram,
        associatedTokenProgram,
        systemProgram,
      })
      .signers([seedAccount])
      .rpc();

    await recordTransaction({
      txHash,
      note,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  const { mutate: refreshOrders } = useAllOrders();
  useEffect(() => {
    if (wrapRes.isSuccess) {
      refreshOrders();
    }
  }, [wrapRes.isSuccess, refreshOrders]);

  return wrapRes;
}
