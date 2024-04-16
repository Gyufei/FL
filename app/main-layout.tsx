"use client";
import Header from "@/app/_page-layout/_header";
import GlobalActionTip from "../components/share/global-action-tip";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-white">
      <div
        className="flex w-full flex-col justify-between"
        style={{
          maxWidth: isHome ? "1440px" : "unset",
          margin: isHome ? "0 auto" : "unset",
        }}
      >
        <div className="relative mx-auto w-full">
          <Header />
          {children}
        </div>
      </div>

      <GlobalActionTip />
    </div>
  );
}
