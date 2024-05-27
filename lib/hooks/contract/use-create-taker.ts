import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./use-accounts";

export function useCreateTaker({
  marketplaceStr,
  offerStr,
  makerStr,
  offerAuthorityStr,
  originOfferStr,
}: {
  marketplaceStr: string;
  offerStr: string;
  makerStr: string;
  offerAuthorityStr: string,
  originOfferStr: string
}) {
  const { program } = useTadleProgram();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts, getWalletBalanceAccount } = useAccounts();

  const writeAction = async ({ pointAmount }: { pointAmount: number }) => {
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
      userConfig: userBConfig,
    } = await getAccounts(program.programId);

    const marketPlace = new PublicKey(marketplaceStr);
    const offerA = new PublicKey(offerStr);
    const maker = new PublicKey(makerStr);
    const originOffer = new PublicKey(originOfferStr);

    const {
      walletBaseTokenBalance: walletBBaseTokenBalance,
      walletPointTokenBalance: walletBPointTokenBalance
    } = await getWalletBalanceAccount(program.programId, authority!, marketPlace)

    const offerAuthority = new PublicKey(offerAuthorityStr);

    const {
      walletBaseTokenBalance: walletABaseTokenBalance,
    } = await getWalletBalanceAccount(program.programId, offerAuthority, marketPlace)

    const stockB = PublicKey.findProgramAddressSync(
      [
        Buffer.from("stock"),
        seedAccount.publicKey.toBuffer()
      ],
      program.programId
    )[0];

    // Bid Taker: 1000 USDC -> 200 point
    const txHash = await program.methods
      .createTaker(new BN(pointAmount))
      .accounts({
        authority: authority,
        systemConfig,
        originMarkerBaseTokenBalance: walletABaseTokenBalance,
        preOfferBaseTokenBalance: walletABaseTokenBalance,
        seedAccount: seedAccount.publicKey,
        stock: stockB,
        preOffer: offerA,
        originOffer: originOffer,
        maker,
        marketPlace,
        poolTokenAccount: poolUsdcTokenAccount,
        tokenMint: usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
      }).remainingAccounts([
        {
          pubkey: walletBBaseTokenBalance,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: walletBPointTokenBalance,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: userBConfig,
          isSigner: false,

          isWritable: true
        },
        {
          pubkey: userUsdcTokenAccount,
          isSigner: false,
          isWritable: true
        }
      ])
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
