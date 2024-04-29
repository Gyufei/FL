import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./use-accounts";

export function useSettleBidTaker({
  marketplaceStr,
  makerStr,
  orderStr,
  preOrderStr,
}: {
  marketplaceStr: string;
  makerStr: string;
  orderStr: string;
  preOrderStr: string;
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
    const order = new PublicKey(orderStr);
    const maker = new PublicKey(makerStr);
    const preOrder = new PublicKey(preOrderStr);

    const txHash = await program.methods
      .settleBidTaker()
      .accounts({
        authority: authority,
        systemConfig,
        maker,
        order,
        preOrder,
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
        pointTokenProgram: tokenProgram,
        associatedTokenProgram,
      })
      .signers([])
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
