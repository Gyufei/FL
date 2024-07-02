import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./help/use-accounts";
import { ISettleMode } from "@/lib/types/maker-detail";
import { useBuildTransaction } from "./help/use-build-transaction";

export function useCreateOffer({
  marketplaceStr: marketplaceStr,
  offerType
}: {
  marketplaceStr: string;
  offerType: "bid" | "ask";
}) {
  const { program } = useTadleProgram();
  const { getAccounts, getWalletBalanceAccount } = useAccounts();

  const { buildTransaction } = useBuildTransaction();
  const { recordTransaction } = useTransactionRecord();

  const writeAction = async ({
    pointAmount,
    tokenAmount,
    collateralRate,
    taxForSub,
    settleMode,
    note,
    isSol,
  }: {
    pointAmount: number;
    tokenAmount: number;
    collateralRate: number;
    taxForSub: number;
    settleMode: ISettleMode,
    note: string;
    isSol: boolean;
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
      poolUsdcTokenAccount,
      poolSolTokenAccount,
      userSolTokenAccount,
      wsolTokenMint
    } = await getAccounts(program.programId);

    const marketPlace = new PublicKey(marketplaceStr);

    const {
      walletBaseTokenBalance: walletABaseTokenBalance,
      walletPointTokenBalance: walletAPointTokenBalance
    } = await getWalletBalanceAccount(program.programId, authority!, marketPlace, isSol)

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

    console.log(Object.entries({
        authority,
        seedAccount: seedAccount.publicKey,
        marketPlace,
        systemConfig,
        maker,
        stock: stockA,
        offer: offerA,
        poolTokenAuthority,
        tokenMint: isSol ? wsolTokenMint : usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        associatedTokenProgram,
        systemProgram,
        pubkey1: isSol ? userSolTokenAccount : userUsdcTokenAccount,
        pubkey2: isSol ? poolSolTokenAccount : poolUsdcTokenAccount,
        pubkey3: walletABaseTokenBalance,
        pubkey4: walletAPointTokenBalance,
    }).map((v) => 
      ({ [v[0]]: v[1]?.toBase58() })
    ))

    const methodTransaction = await program.methods
      .createOffer(
        new BN(pointAmount),
        new BN(tokenAmount),
        new BN(collateralRate),
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
        tokenMint: isSol ? wsolTokenMint : usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        associatedTokenProgram,
        systemProgram,
      }).remainingAccounts([
        {
          pubkey: isSol ? userSolTokenAccount : userUsdcTokenAccount,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: isSol ? poolSolTokenAccount : poolUsdcTokenAccount,
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
      ])
      // .signers([seedAccount]).rpc()
      .transaction();

    const txHash = await buildTransaction(methodTransaction, program, [seedAccount], authority!);

    await recordTransaction({
      txHash,
      note,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
