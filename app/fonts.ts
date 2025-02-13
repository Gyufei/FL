import localFont from "next/font/local";

export const AeonikFont = localFont({
  src: [
    {
      path: "../public/fonts/AeonikTRIAL-Light.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/AeonikTRIAL-Regular.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/AeonikTRIAL-Bold.otf",
      weight: "700",
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
