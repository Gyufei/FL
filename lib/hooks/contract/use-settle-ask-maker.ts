import { useEffect } from "react";
import useTadleProgram from "../use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransaction } from "../api/use-transaction";
import { useAccounts } from "./use-accounts";
import { useAllOrders } from "../api/use-all-orders";

export function useSettleAskMaker({
  marketplaceStr,
  makerStr,
  orderStr,
}: {
  marketplaceStr: string;
  makerStr: string;
  orderStr: string;
}) {
  const { program } = useTadleProgram();
  const { confirmTransaction } = useTransaction();
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
      userPointsTokenAccount,
      poolPointsTokenAccount,
      pointTokenMint,
    } = await getAccounts();

    const poolTokenAuthority = PublicKey.findProgramAddressSync(
      [systemConfig.toBuffer()],
      program.programId,
    )[0];

    const wsolTmpTokenAccount = PublicKey.findProgramAddressSync(
      [Buffer.from("wsol_tmp_token_account"), authority!.toBuffer()],
      program.programId,
    )[0];

    const marketPlace = new PublicKey(marketplaceStr);
    const order = new PublicKey(orderStr);
    const maker = new PublicKey(makerStr);

    const txHash = await program.methods
      .settleAskMaker(new BN(0))
      .accounts({
        authority: authority,
        systemConfig,
        maker,
        order,
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

    await confirmTransaction({
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
