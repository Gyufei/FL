import React, { useEffect, useState } from "react";
import { useWallets, useSolanaWallets, usePrivy } from "@privy-io/react-auth";
import { useTranslations } from "next-intl";
import WalletTypeItem from "./wallet-type-item";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { ChainConfigs } from "@/lib/const/chain-configs";

export default function Wallet() {
  const t = useTranslations("Header");

  const [walletTypes, setWalletTypes] = useState<any[]>([]);

  const { wallets } = useWallets();
  const { wallets: solanaWallets } = useSolanaWallets();
  const { logout } = usePrivy();
  const { disconnect } = useChainWallet();

  useEffect(() => {
    if (wallets.length > 0 || solanaWallets.length > 0) {
      const chainWallets = wallets.filter(
        (w: any) =>
          w.chainId ===
          `eip155:${
            ChainConfigs[walletTypes[0]?.selectedChain || "eth"].network
          }`,
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
                  walletClientType: wallet.walletClientType,
                })),
          types: ["solana"],
        },
      ];
      if (JSON.stringify(walletTypes) !== JSON.stringify(newWalletTypes)) {
        setWalletTypes(newWalletTypes);
      }
    }
  }, [wallets, solanaWallets, walletTypes]);

  const handleChainSelect = (walletType: string, chain: string) => {
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
    disconnect();
    logout();
  };

  return (
    <>
      <div className="font-video mx-auto w-full max-w-md space-y-4 py-4 text-[14px] ">
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
