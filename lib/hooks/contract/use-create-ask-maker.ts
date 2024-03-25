import { useEffect } from "react";
import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import toPubString from "@/lib/utils/pub-string";
import { useAccounts } from "./use-accounts";
import { useAllOrders } from "../api/use-all-orders";

export function useCreateAskMaker({
  marketplaceStr: marketplaceStr,
}: {
  marketplaceStr: string;
}) {
  const { program } = useTadleProgram();
  const { getAccounts } = useAccounts();

  const { recordTransaction } = useTransactionRecord();

  const writeAction = async ({
    sellPointAmount,
    receiveTokenAmount,
    breachFee,
    taxForSub,
    note,
  }: {
    sellPointAmount: number;
    receiveTokenAmount: number;
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
    const maker = PublicKey.findProgramAddressSync(
      [Buffer.from("marker"), seedAccount.publicKey.toBuffer()],
      program.programId,
    )[0];
    const order = PublicKey.findProgramAddressSync(
      [Buffer.from("order"), seedAccount.publicKey.toBuffer()],
      program.programId,
    )[0];

    const txHash = await program.methods
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
      maker: toPubString(maker),
      order: toPubString(order),
      marketplace: marketplaceStr,
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
