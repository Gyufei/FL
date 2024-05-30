import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./help/use-tx-status";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./help/use-accounts";
import { ISettleMode } from "@/lib/types/maker-detail";

export function useCreateOffer({
  marketplaceStr: marketplaceStr,
  offerType
}: {
  marketplaceStr: string;
  offerType: "bid" | "ask";
}) {
  const { program } = useTadleProgram();
  const { getAccounts, getWalletBalanceAccount } = useAccounts();

  const { recordTransaction } = useTransactionRecord();

  const writeAction = async ({
    pointAmount,
    tokenAmount,
    breachFee,
    taxForSub,
    settleMode,
    note,
  }: {
    pointAmount: number;
    tokenAmount: number;
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
    } = await getAccounts(program.programId);

    const marketPlace = new PublicKey(marketplaceStr);

    const {
      walletBaseTokenBalance: walletABaseTokenBalance,
      walletPointTokenBalance: walletAPointTokenBalance
    } = await getWalletBalanceAccount(program.programId, authority!, marketPlace)

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

    const txHash = await program.methods
      .createOffer(
        new BN(pointAmount),
        new BN(tokenAmount * LAMPORTS_PER_SOL),
        new BN(breachFee),
        new BN(taxForSub),
        {
          [offerType]: {},
        },
        {
          [settleMode]: {}
        }
      )
      .accounts({
        authority,
        seedAccount: seedAccount.publicKey,
        marketPlace,
        systemConfig,
        maker,
        stock: stockA,
        offer: offerA,
        poolTokenAuthority,
        tokenMint: usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        associatedTokenProgram,
        systemProgram,
      }).remainingAccounts([
        {
          pubkey: userUsdcTokenAccount,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: poolUsdcTokenAccount,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: walletABaseTokenBalance,
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
