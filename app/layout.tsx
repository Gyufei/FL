import "./globals.css";
import { VideoFont } from "./fonts";

import { cn } from "@/lib/utils/common";
import JotaiProvider from "@/components/provider/jotai-provider";
import SWRConfigProvider from "@/components/provider/swr-config-provider";
import MainLayout from "@/app/main-layout";
import GlobalProvider from "@/components/provider/global-provider";
import { SolanaWalletProviders } from "@/components/provider/solana-wallets";

export const metadata = {
  title: "Poince",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(VideoFont.variable)}>
        <GlobalProvider>
          <JotaiProvider>
            <SolanaWalletProviders>
              <SWRConfigProvider>
                <MainLayout>{children}</MainLayout>
              </SWRConfigProvider>
            </SolanaWalletProviders>
          </JotaiProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
