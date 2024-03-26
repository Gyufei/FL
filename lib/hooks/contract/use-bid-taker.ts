import { useEffect } from "react";
import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./use-accounts";
import { useAllOrders } from "../api/use-all-orders";

export function useBidTaker({
  marketplaceStr,
  preOrder,
  makerStr,
}: {
  marketplaceStr: string;
  preOrder: string;
  makerStr: string;
}) {
  const { program } = useTadleProgram();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts } = useAccounts();

  const writeAction = async ({ receivePoint }: { receivePoint: number }) => {
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
    } = await getAccounts();

    const marketPlace = new PublicKey(marketplaceStr);
    const perOrder = new PublicKey(preOrder);
    const maker = new PublicKey(makerStr);

    const orderA = PublicKey.findProgramAddressSync(
      [Buffer.from("order"), seedAccount.publicKey.toBuffer()],
      program.programId,
    )[0];

    // Bid Taker: 1000 USDC -> 200 point
    const txHash = await program.methods
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

    await recordTransaction({
      txHash,
      note: "",
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
