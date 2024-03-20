import { useEffect } from "react";
import useTadleProgram from "../use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransaction } from "../api/use-transaction";
import toPubString from "@/lib/utils/pub-string";
import { useAccounts } from "./use-accounts";

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
  const { confirmTransaction } = useTransaction();
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

    await confirmTransaction({
      maker: makerStr,
      order: toPubString(orderA),
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
