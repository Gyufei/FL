"use client";
import Header from "@/app/[locale]/_page-layout/_header";
import GlobalActionTip from "@/components/share/global-action-tip";
import { useEffect } from "react";

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
  }, []);

  return (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-white">
      <div className="flex w-full flex-col justify-between">
        <div className="relative mx-auto w-full">
          <Header />
          {children}
        </div>
      </div>

      <GlobalActionTip />
    </div>
  );
}
