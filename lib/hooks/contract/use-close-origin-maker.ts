import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./use-accounts";

export function useCloseOriginMaker({
  makerStr,
  orderStr,
}: {
  makerStr: string;
  orderStr: string;
}) {
  const { program } = useTadleProgram();
  const { getAccounts } = useAccounts();

  const { recordTransaction } = useTransactionRecord();

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

    const maker = new PublicKey(makerStr);
    const order = new PublicKey(orderStr);

    const txHash = await program.methods
      .closeOriginMaker()
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
      txHash,
      note: "",
    });

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
