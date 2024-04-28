import { useEffect } from "react";
import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./use-accounts";
import { useAllOrders } from "../api/use-all-orders";
import { useTakerOrders } from "../api/use-taker-orders";

export function useSettleBidMaker({
  marketplaceStr,
  makerStr,
  orderStr,
}: {
  marketplaceStr: string;
  makerStr: string;
  orderStr: string;
}) {
  const { program } = useTadleProgram();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts } = useAccounts();

  const { data: subOrders } = useTakerOrders(orderStr, undefined);

  const subOrderStrings = subOrders?.map((o) => o.order_id) || [];


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
      userPointsTokenAccount,
      poolPointsTokenAccount,
      pointTokenMint,
      associatedTokenProgram,
      poolTokenAuthority,
    } = await getAccounts();

    const wsolTmpTokenAccount = PublicKey.findProgramAddressSync(
      [Buffer.from("wsol_tmp_token_account"), authority!.toBuffer()],
      program.programId,
    )[0];

    const marketPlace = new PublicKey(marketplaceStr);
    const bidMaker = new PublicKey(makerStr);
    const bidMakerOrder = new PublicKey(orderStr);

    const bidOrders = (subOrderStrings || []).map(
      (os: string) => ({
          pubkey: new PublicKey(os),
          isSigner: false,
          isWritable: true,
      })
    ) 

    const txHash = await program.methods
      .settleBidMaker()
      .accounts({
        authority,
        systemConfig,
        maker: bidMaker,
        order: bidMakerOrder,
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
        pointTokenProgram: tokenProgram,
        associatedTokenProgram,
        systemProgram,
      })
      .remainingAccounts(bidOrders)
      .signers([])
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
