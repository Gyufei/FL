import Image from "next/image";
import { Wallet, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { WalletReadyState } from "@solana/wallet-adapter-base";

export default function WalletSelectDialog({
  onSelected,
}: {
  onSelected: () => void;
}) {
  const { wallets, select } = useWallet();

  const showWallets = wallets.filter(
    (w: Wallet) => w.adapter.name !== "MetaMask",
  );

  const [hoverWallet, setHoverWallet] = useState<string | null>(null);

  const handleMouseEnter = (w: Wallet) => {
    setHoverWallet(w.adapter.name);
  };

  const handleMouseLeave = () => {
    setHoverWallet(null);
  };

  function goToWallet(w: Wallet) {
    window.open(w.adapter.url, "_blank");
  }

  function handleConnect(w: Wallet) {
    if (w.readyState !== WalletReadyState.Installed) {
      goToWallet(w);
    } else {
      select(w.adapter.name);
      onSelected();
    }
  }

  return (
    <div className="mt-4">
      <div className="mx-4 mb-1 text-sm text-black">Choose Wallet</div>
      {showWallets.map((wallet) => (
        <div
          onClick={() => handleConnect(wallet)}
          onMouseEnter={() => handleMouseEnter(wallet)}
          onMouseLeave={handleMouseLeave}
          className="flex cursor-pointer items-center justify-between rounded-2xl p-4 hover:bg-[#fafafa]"
          key={wallet.adapter.name}
        >
          <div className="flex items-center space-x-3">
            <Image
              src={wallet.adapter.icon}
              alt="wallet"
              width={24}
              height={24}
              className="c-image-shadow"
            />
            <span className="text-sm font-semibold leading-[17px]">
              {wallet.adapter.name}
            </span>
          </div>

          {wallet.readyState !== WalletReadyState.Installed && (
            <div
              data-state={hoverWallet === wallet.adapter.name}
              className="flex cursor-pointer items-center justify-center rounded-full border border-black px-[12px] py-[2px] text-black data-[state=true]:border-yellow data-[state=true]:bg-yellow"
              onClick={() => goToWallet(wallet)}
            >
              <div className="text-sm leading-5 text-black">Install</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
