import { useEffect } from "react";
import useTadleProgram from "../use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransaction } from "../api/use-transaction";
import toPubString from "@/lib/utils/pub-string";
import { useAccounts } from "./use-accounts";

export function useAskTaker({
  marketplaceStr,
  preOrderStr,
  makerStr,
}: {
  marketplaceStr: string;
  preOrderStr: string;
  makerStr: string;
}) {
  const { program } = useTadleProgram();
  const { confirmTransaction } = useTransaction();
  const { getAccounts } = useAccounts();

  const writeAction = async ({ payPoint }: { payPoint: number }) => {
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
    const preOrder = new PublicKey(preOrderStr);
    const maker = new PublicKey(makerStr);

    const bidOrderA = PublicKey.findProgramAddressSync(
      [Buffer.from("order"), seedAccount.publicKey.toBuffer()],
      program.programId,
    )[0];

    // Ask Taker: 200 point -> 1000 USDC
    const txHash = await program.methods
      .createTaker(new BN(payPoint))
      .accounts({
        authority,
        systemConfig,
        seedAccount: seedAccount.publicKey,
        order: bidOrderA,
        preOrder,
        maker: maker,
        marketPlace,
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
      order: toPubString(bidOrderA),
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
