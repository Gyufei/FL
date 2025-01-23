"use client";

import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";

export default function ProjectOptions({
  status,
  onStatusChange,
}: {
  status: string;
  onStatusChange: (status: string) => void;
}) {
  if (!status) return null;
  if (status === "init")
    return (
      <div className="mx-auto max-w-md space-y-6 text-[14px]">
        <WithWalletConnectBtn
          onClick={() => {
            onStatusChange("registered");
          }}
        >
          <button className="flex w-[320px] items-center justify-center space-x-2 rounded-full bg-[#E0FF62] px-4 py-3 text-[16px]">
            <span>Register +</span>
          </button>
        </WithWalletConnectBtn>
      </div>
    );
  return (
    <div className="fixed bottom-0 left-0 z-10 flex w-full max-w-md items-center justify-between bg-white px-6 pb-3 text-[14px] sm:absolute sm:left-auto sm:w-[320px] sm:px-0 sm:pb-0">
      <div className="space-y-1">
        <p className="text-[16px] text-[#2D2E33]">
          {status !== "finished" ? "xxx" : 51920191}
        </p>
        <p className="text-[12px] text-[#99A0AF]">tldBack</p>
      </div>
      <button
        className="flex w-[160px] items-center justify-center space-x-2 rounded-full bg-[#E0FF62] px-4 py-3 text-[16px] disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => {
          onStatusChange("claimed");
        }}
        disabled={status !== "finished"}
      >
        <span>{status !== "Claimed" ? "Claim" : "Claimed"}</span>
      </button>
    </div>
  );
}
