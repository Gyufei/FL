import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./help/use-accounts";
import { SolanaZeroed } from "@/lib/constant";

export function useSettleAskMaker({
  marketplaceStr,
  makerStr,
  offerStr,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
}) {
  const { program } = useTadleProgram();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts, getWalletBalanceAccount } = useAccounts();

  const writeAction = async ({
    settleAmount,
    stockArr,
    isDirect,
  }: {
    settleAmount: number
    stockArr: Array<{
      stock_account: string,
      offer: string,
      authority: string,
    }>,
    isDirect: boolean,
  }) => {
    const {
      tokenProgram,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      userPointsTokenAccount,
      poolPointsTokenAccount,
      pointTokenMint,
      associatedTokenProgram,
      poolTokenAuthority,
    } = await getAccounts(program.programId);

    const wsolTmpTokenAccount = PublicKey.findProgramAddressSync(
      [Buffer.from("wsol_tmp_token_account"), authority!.toBuffer()],
      program.programId,
    )[0];

    const marketPlace = new PublicKey(marketplaceStr);
    const offerA = new PublicKey(offerStr);
    const maker = new PublicKey(makerStr);

    const {
      walletBaseTokenBalance: walletABaseTokenBalance,
      // walletPointTokenBalance: walletAPointTokenBalance
    } = await getWalletBalanceAccount(program.programId, authority!, marketPlace)

    const stockAccountP = await Promise.all(stockArr.map(async (s: {
      stock_account: string,
      offer: string,
      authority: string,
    }) => {
      const stock = new PublicKey(s.stock_account);
      const stockAuth = new PublicKey(s.authority);

      const stockArr = [
        {
          pubkey: stock,
          isSigner: false,
          isWritable: true
        },
      ]

      if (isDirect) {
        const offer = s.offer ? new PublicKey(s.offer) : new PublicKey(SolanaZeroed);
        stockArr.push({
          pubkey: offer,
          isSigner: false,
          isWritable: true
        })
      }

      const {
        walletBaseTokenBalance,
        walletPointTokenBalance,
      } = await getWalletBalanceAccount(program.programId, stockAuth, marketPlace)

      return [
        ...stockArr,
        {
          pubkey: walletBaseTokenBalance,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: walletPointTokenBalance,
          isSigner: false,
          isWritable: true
        },
      ]
    }))

    const stockAccounts = stockAccountP.flat();

    const txHash = await program.methods
      .settleAskMaker(new BN(settleAmount))
      .accounts({
        manager: authority,
        authority,
        systemConfig,
        userBaseTokenBalance: walletABaseTokenBalance,
        maker,
        offer: offerA,
        marketPlace,
        poolTokenAuthority,
        wsolTmpTokenAccount,
        pointTokenMint,
        tokenProgram,
        tokenProgram2022,
        pointTokenProgram: tokenProgram,
        associatedTokenProgram,
        systemProgram,
      }).remainingAccounts([
        {
          pubkey: userPointsTokenAccount,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: poolPointsTokenAccount,
          isSigner: false,
          isWritable: true
        },
        ...stockAccounts,
      ])
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
