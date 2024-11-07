import React, { useEffect, useState } from "react";
import { useWallets, useSolanaWallets, usePrivy } from "@privy-io/react-auth";
import { useTranslations } from "next-intl";
import WalletTypeItem from "./wallet-type-item";
import { useAccount } from "wagmi";
export default function Wallet() {
  const t = useTranslations("Header");

  const [walletTypes, setWalletTypes] = useState<any[]>([]);

  const { wallets } = useWallets();
  const { wallets: solanaWallets } = useSolanaWallets();
  const { logout } = usePrivy();

  const { address } = useAccount();

  useEffect(() => {
    if (wallets.length > 0 || solanaWallets.length > 0) {
      const chainWallets = wallets.filter((w: any) =>
        walletTypes[0]?.selectedChain === "bnb"
          ? w.type !== "ethereum"
          : w.type === "ethereum",
      );
      const newWalletTypes = [
        {
          name: "Evm",
          icon: "/icons/op.svg",
          chainList: ["eth", "bnb"],
          selectedChain: walletTypes[0]?.selectedChain || "eth",
          addresses:
            chainWallets.length < 1
              ? [{}]
              : chainWallets.map((wallet) => ({
                  ...wallet,
                  linked: address === wallet.address,
                })),
          types: ["ethereum"],
        },
        {
          name: "Solana",
          icon: "/icons/solana-black.svg",
          addresses:
            solanaWallets.length < 1
              ? [{}]
              : solanaWallets.map((wallet) => ({
                  ...wallet,
                  linked: address === wallet.address,
                  walletClientType: wallet.walletClientType,
                })),
          types: ["solana"],
        },
      ];
      if (JSON.stringify(walletTypes) !== JSON.stringify(newWalletTypes)) {
        setWalletTypes(newWalletTypes);
      }
    }
  }, [wallets, solanaWallets, walletTypes, address]);

  const handleChainSelect = (walletType: string, chain: string) => {
    console.log(
      "🚀 ~ handleChainSelect ~ walletType, chain:",
      walletType,
      chain,
    );
    const newWalletTypes = walletTypes.map((wallet) => {
      if (wallet.name === walletType) {
        return {
          ...wallet,
          selectedChain: chain,
        };
      }
      return wallet;
    });
    setWalletTypes(newWalletTypes);
  };

  const handleLogout = () => {
    wallets.forEach((wallet) => wallet.disconnect());
    logout();
  };

  return (
    <>
      <div className="font-video mx-auto w-full max-w-md space-y-4 p-4 text-[14px] ">
        {walletTypes.map((walletType, walletIndex) => (
          <WalletTypeItem
            key={walletIndex}
            walletType={walletType}
            updateSelectedChain={handleChainSelect}
          />
        ))}
      </div>
      <div className="mt-10 w-full">
        <button
          onClick={handleLogout}
          className="flex h-12 w-full items-center justify-center rounded-2xl border border-red bg-white text-red hover:bg-red hover:text-white"
        >
          {t("btn-SignOut")}
        </button>
      </div>
    </>
  );
}
