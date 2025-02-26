"use client";

import { Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

interface NetworkInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MonadTestnetInfoDialog({
  open,
  onOpenChange,
}: NetworkInfoDialogProps) {
  const t = useTranslations("monad-module");

  const networkInfo = {
    "Network Name": "Monad Testnet",
    "Chain ID": "10143",
    "RPC URL": "https://testnet-rpc.monad.xyz/",
    "Block Explorer URL": "http://testnet.monadexplorer.com/",
    "Currency Symbol": "MON",
  };

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    toast.success("Copied");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="z-50 max-w-[384px] rounded-2xl border-none bg-white p-8"
        showClose={false}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-8 w-8 hover:bg-[#f3f4f6]"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4 text-[#6b7280]" />
        </Button>
        <div className="flex flex-col space-y-4">
          <div className="mb-2 text-center text-2xl font-bold">
            {t("lb-MonadTestnetInfo")}
          </div>
          {Object.entries(networkInfo).map(([label, value]) => (
            <div key={label} className="">
              <label className="mb-2 block text-sm font-medium">{label}</label>
              <div className="flex items-center justify-between rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3">
                <span className="font-medium">{value}</span>
                <button
                  className="h-6 w-6 rounded-sm p-1 transition-colors hover:bg-[#f3f4f6]"
                  onClick={() => handleCopy(value)}
                >
                  <Copy className={`h-4 w-4 text-[#6b7280]`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
