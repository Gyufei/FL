import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import MonadTestnetInfoDialog from "./monad-testnet-Info-dialog";

export default function MonadTestnetDialog() {
  const t = useTranslations("monad-module");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddTestnetClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button className="relative flex items-center justify-center rounded-lg p-2 hover:bg-[#f3f4f6] data-[state=open]:bg-[#f3f4f6]">
            <Image
              src="/icons/monad.svg"
              alt="Monad"
              width={20}
              height={20}
              className="rounded-full"
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-[220px] rounded-lg border-[#e5e7eb] bg-white p-0 text-base"
        >
          <div className="border-b border-[#e5e7eb] px-4 py-3 font-medium">
            {t("lb-MonadTestnet")}
          </div>
          <div className="py-2">
            <div
              className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-[var(--color-theme-light)] hover:text-[var(--color-theme)]"
              onClick={handleAddTestnetClick}
            >
              {t("btn-AddTestnetToWallet")}
            </div>
            <a
              href="https://testnet.monad.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--color-theme-light)] hover:text-[var(--color-theme)]"
            >
              <Image
                src="/icons/stopcock.svg"
                alt="stopcock"
                width={16}
                height={16}
                className="rounded-full"
              />
              {t("btn-$MONFaucet")}
            </a>
          </div>
        </PopoverContent>
      </Popover>
      <MonadTestnetInfoDialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
