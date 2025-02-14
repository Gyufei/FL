import localFont from "next/font/local";

export const AeonikFont = localFont({
  src: [
    {
      path: "../public/fonts/Aeonik-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Aeonik-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Aeonik-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Aeonik-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Aeonik-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Aeonik-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-aeonik",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Roboto",
    "Segoe UI",
    "Ubuntu",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});
