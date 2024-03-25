import { useEffect } from "react";
import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./use-accounts";
import { useAllOrders } from "../api/use-all-orders";

export function useUnlistMaker({
  marketplaceStr,
  orderStr,
  makerStr,
}: {
  marketplaceStr: string;
  orderStr: string;
  makerStr: string;
}) {
  const { program } = useTadleProgram();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts } = useAccounts();

  const writeAction = async () => {
    const {
      tokenProgram,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      userUsdcTokenAccount,
      poolUsdcTokenAccount,
      usdcTokenMint,
      poolTokenAuthority,
    } = await getAccounts();

    const wsolTmpTokenAccount = PublicKey.findProgramAddressSync(
      [Buffer.from("wsol_tmp_token_account"), authority!.toBuffer()],
      program.programId,
    )[0];

    const order = new PublicKey(orderStr);
    const maker = new PublicKey(makerStr);

    // Ask Taker: 200 point -> 1000 USDC
    const txHash = await program.methods
      .unlistMaker()
      .accounts({
        authority,
        systemConfig,
        order,
        userTokenAccount: userUsdcTokenAccount,
        poolTokenAccount: poolUsdcTokenAccount,
        maker,
        poolTokenAuthority,
        wsolTmpTokenAccount,
        tokenMint: usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
      })
      .signers([])
      .rpc();

    await recordTransaction({
      maker: makerStr,
      order: orderStr,
      marketplace: marketplaceStr,
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
