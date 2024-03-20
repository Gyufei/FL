import { useEffect } from "react";
import useTadleProgram from "../use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransaction } from "../api/use-transaction";
import { useAccounts } from "./use-accounts";

export function useSettleBidMaker({
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
      programAuthority,
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
    const bidOrder = new PublicKey(orderStr);
    const bidMaker = new PublicKey(makerStr);
    const bidMakerOrder = new PublicKey(preOrderStr);

    const time_now = Math.ceil(new Date().getTime() / 1000) - 10 - 86400;
    await program.methods
      .updateMarketPlace(
        pointTokenMint,
        new BN(10 * LAMPORTS_PER_SOL),
        new BN(time_now),
        new BN(86400),
      )
      .accounts({
        authority: programAuthority.publicKey,
        systemConfig,
        marketPlace,
      })
      .signers([programAuthority])
      .rpc();

    const txHash = await program.methods
      .settleBidMaker()
      .accounts({
        authority: authority,
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
        systemProgram,
      })
      .remainingAccounts([
        {
          pubkey: bidOrder,
          isSigner: false,
          isWritable: true,
        },
      ])
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
