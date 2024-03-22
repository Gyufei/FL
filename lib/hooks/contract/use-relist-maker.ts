import { useEffect } from "react";
import useTadleProgram from "../use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransaction } from "../api/use-transaction";
import { useAccounts } from "./use-accounts";

export function useRelistMaker({
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

  const writeAction = async ({
    receiveTokenAmount,
    breachFee,
  }: {
    receiveTokenAmount: number;
    breachFee: number;
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
    } = await getAccounts();

    const marketPlace = new PublicKey(marketplaceStr);
    const order = new PublicKey(orderStr);
    const maker = new PublicKey(makerStr);

    const txHash = await program.methods
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

  useEffect(() => {
    if (wrapRes.isSuccess) {
      return;
    }
  }, [wrapRes.isSuccess]);

  return wrapRes;
}
