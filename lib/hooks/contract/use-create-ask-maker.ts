import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./use-accounts";
import { ISettleMode } from "@/app/marketplace/create-offer/settle-mode-select";

export function useCreateAskMaker({
  marketplaceStr: marketplaceStr,
}: {
  marketplaceStr: string;
}) {
  const { program } = useTadleProgram();
  const { getAccounts } = useAccounts();

  const { recordTransaction } = useTransactionRecord();

  const writeAction = async ({
    sellPointAmount,
    receiveTokenAmount,
    breachFee,
    taxForSub,
    settleMode,
    note,
  }: {
    sellPointAmount: number;
    receiveTokenAmount: number;
    breachFee: number;
    taxForSub: number;
    settleMode: ISettleMode,
    note: string;
  }) => {
    const {
      tokenProgram,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      userUsdcTokenAccount,
      usdcTokenMint,
      seedAccount,
      associatedTokenProgram,
      poolTokenAuthority,
      poolUsdcTokenAccount
    } = await getAccounts();

    const marketPlace = new PublicKey(marketplaceStr);

    const walletABaseTokenBalance = PublicKey.findProgramAddressSync(
      [
        Buffer.from("token_balance"),
        usdcTokenMint.toBuffer(),
        authority!.toBuffer()
      ],
      program.programId
    )[0];

    const walletAPointTokenBalance = PublicKey.findProgramAddressSync(
      [
        Buffer.from("point_token_balance"),
        marketPlace.toBuffer(),
        authority!.toBuffer()
      ],
      program.programId
    )[0];

    const maker = PublicKey.findProgramAddressSync(
      [Buffer.from("marker"), seedAccount.publicKey.toBuffer()],
      program.programId,
    )[0];

    const stockA = PublicKey.findProgramAddressSync(
      [
        Buffer.from("stock"),
        seedAccount.publicKey.toBuffer()
      ],
      program.programId
    )[0];

    const offerA = PublicKey.findProgramAddressSync(
      [
        Buffer.from("offer"),
        seedAccount.publicKey.toBuffer()
      ],
      program.programId
    )[0];

    const settleModeArg = {
      [settleMode]: {}
    }

    const txHash = await program.methods
      .createMaker(
        new BN(sellPointAmount),
        new BN(receiveTokenAmount * LAMPORTS_PER_SOL),
        new BN(breachFee),
        new BN(taxForSub),
        {
          ask: {},
        },
        settleModeArg,
      )
      .accounts({
        authority,
        seedAccount: seedAccount.publicKey,
        marketPlace,
        systemConfig,
        maker,
        stock: stockA,
        offer: offerA,
        userTokenAccount: userUsdcTokenAccount,
        poolTokenAuthority,
        tokenMint: usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        associatedTokenProgram,
        poolTokenProgram: tokenProgram,
        systemProgram,
      }).remainingAccounts([
        {
          pubkey: walletABaseTokenBalance,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: poolUsdcTokenAccount,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: walletAPointTokenBalance,
          isSigner: false,
          isWritable: true
        },
      ]).signers([seedAccount])
      .rpc();

    await recordTransaction({
      txHash,
      note,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
