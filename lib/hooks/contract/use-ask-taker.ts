import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
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
  const { recordTransaction } = useTransactionRecord();
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

    const order = PublicKey.findProgramAddressSync(
      [Buffer.from("order"), seedAccount.publicKey.toBuffer()],
      program.programId,
    )[0];

    const userConfig = PublicKey.findProgramAddressSync(
      [Buffer.from("user_config"), authority!.toBuffer()],
      program.programId,
    )[0];

    // Ask Taker: 200 point -> 1000 USDC
    const txHash = await program.methods
      .createTaker(new BN(payPoint))
      .accounts({
        authority,
        systemConfig,
        userConfig,
        seedAccount: seedAccount.publicKey,
        order: order,
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

    await recordTransaction({
      txHash,
      note: "",
    });

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
