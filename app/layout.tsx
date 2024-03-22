import "./globals.css";
import { VideoFont } from "./fonts";

import { cn } from "@/lib/utils/common";
import JotaiProvider from "@/components/provider/jotai-provider";
import SWRConfigProvider from "@/components/provider/swr-config-provider";
import MainLayout from "@/app/main-layout";
import GlobalProvider from "@/components/provider/global-provider";
import { SolanaWalletProviders } from "@/components/provider/solana-wallets";

export const metadata = {
  title: {
    template: "%s | Tadle Market",
    default: "Tadle Market",
  },
  description: "The First Pre SuperMarket",
  metadataBase: new URL(`https://${process.env.VERCEL_DOMAIN}`),
  openGraph: {
    title: "Tadle Market",
    description: "The First Pre SuperMarket",
    url: `https://${process.env.VERCEL_DOMAIN}`,
    siteName: "Tadle Market",
    images: "/img/GGzCP6QaAAAm9Ye.png",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/img/favs/favicon-32x32.png" },
      { url: "/img/favs/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/img/shortcut-icon.png",
    apple: [
      { url: "/img/favs/apple-touch-icon.png" },
      {
        url: "/img/favs/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/img/favs/apple-touch-icon-precomposed.png",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Tadle Market",
    description: "The First Pre SuperMarket",
    creator: "@TadleMarket",
    images: ["/img/GGzCP6QaAAAm9Ye.png"],
  },
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
