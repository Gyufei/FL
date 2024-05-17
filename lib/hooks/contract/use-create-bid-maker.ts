import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./use-accounts";
import { ISettleMode } from "@/app/marketplace/create-offer/settle-mode-select";

export function useCreateBidMaker({
  marketplaceStr,
}: {
  marketplaceStr: string;
}) {
  const { program } = useTadleProgram();
  const { getAccounts } = useAccounts();
  const { recordTransaction } = useTransactionRecord();

  const writeAction = async ({
    payTokenAmount,
    receivePointAmount,
    breachFee,
    taxForSub,
    settleMode,
    note,
  }: {
    payTokenAmount: number;
    receivePointAmount: number;
    breachFee: number;
    taxForSub: number;
    settleMode: ISettleMode,
    note: string;
  }) => {
    if (!marketplaceStr || !payTokenAmount || !receivePointAmount) {
      return;
    }

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

    const settleModeArg = {
      [settleMode]: {}
    }

    // 5000 usdc => 1000 points
    // settle_breach_fee: 50% => 5000
    // each_trade_tax: 3% => 300
    const txHash = await program.methods
      .createMaker(
        new BN(receivePointAmount),
        new BN(payTokenAmount * LAMPORTS_PER_SOL),
        new BN(breachFee),
        new BN(taxForSub),
        {
          bid: {},
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
      ])
      .signers([seedAccount])
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
