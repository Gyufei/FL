"use client";
import Header from "@/app/[locale]/_page-layout/_header";
import GlobalActionTip from "@/components/share/global-action-tip";
import { useEffect } from "react";
import ReferralDialog from "../dashboard/referral/referral-dialog";
import NP from "number-precision";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    localStorage.removeItem("cluster");
    localStorage.removeItem("gRPC");
    localStorage.removeItem("cRPC");
    localStorage.removeItem("globalRpcs");
    localStorage.removeItem("customRpcs");
    localStorage.removeItem("access_token");
    localStorage.removeItem("privy:token");
  }, []);
  const pathname = usePathname();
  NP.enableBoundaryChecking(false);

  const isOverflowHidden =
    pathname.includes("/gems") || pathname.includes("/points");

  return (
    <div
      className={`h-screen w-screen ${
        isOverflowHidden ? "overflow-y-hidden" : "overflow-y-auto"
      } overflow-x-hidden bg-white`}
    >
      <div className="flex w-full flex-col justify-between">
        <div className="relative mx-auto w-full">
          <Header />
          {children}
        </div>
      </div>

      <GlobalActionTip />
      <ReferralDialog />
      <Toaster position="bottom-center" />
    </div>
  );
}
