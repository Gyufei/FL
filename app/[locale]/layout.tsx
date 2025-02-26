import "react-modern-drawer/dist/index.css";
import "@/app/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { AeonikFont } from "@/app/fonts";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import { cn } from "@/lib/utils/common";
import JotaiProvider from "@/components/provider/jotai-provider";
import SWRConfigProvider from "@/components/provider/swr-config-provider";
import MainLayout from "@/app/[locale]/_page-layout/main-layout";
import { isProduction } from "@/lib/PathMap";
import WalletModalProvider from "@/components/provider/wallet-modal-provider";
import { redirect } from "next/navigation";
import { locales } from "../../i18n";

export const metadata = {
  title: {
    template: "%s | Tadle Marketplace",
    default: "Tadle Marketplace",
  },
  description: "Predict it. Trade it. Own it.",
  metadataBase: new URL(`https://${process.env.VERCEL_DOMAIN}`),
  openGraph: {
    title: "Tadle Marketplace",
    description: "Predict it. Trade it. Own it.",
    url: `https://${process.env.VERCEL_DOMAIN}`,
    siteName: "Tadle Market",
    images: "https://tadle.com/img/UjXLk9pSW552Wq3jVMIQU.png",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "https://tadle.com/img/favs/favicon-32x32.png" },
      {
        url: "https://tadle.com/img/favs/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      { url: "https://tadle.com/img/favs/apple-touch-icon.png" },
      {
        url: "https://tadle.com/img/favs/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "https://tadle.com/img/favs/apple-touch-icon-precomposed.png",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Tadle Marketplace",
    description: "Predict it. Trade it. Own it.",
    creator: "@tadle_com",
    images: ["https://tadle.com/img/UjXLk9pSW552Wq3jVMIQU.png"],
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (locale && !locales.includes(locale as any)) {
    redirect("/en/not-found");
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={cn(AeonikFont.variable)}>
        <JotaiProvider>
          <WalletModalProvider>
            <SWRConfigProvider>
              <NextIntlClientProvider messages={messages}>
                <MainLayout>{children}</MainLayout>
              </NextIntlClientProvider>
            </SWRConfigProvider>
          </WalletModalProvider>
        </JotaiProvider>
      </body>
      <GoogleAnalytics gaId={isProduction ? "G-FN03SV9KCF" : "G-1PQBDX806E"} />
      {/* <GoogleTagManager
        gtmId={isProduction ? "GTM-TPXPN9FF" : "GTM-MRM39HBK"}
      /> */}
    </html>
  );
}
