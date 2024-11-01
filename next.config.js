const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "preview-cdn.tadle.com",
      },
      {
        protocol: "https",
        hostname: "cdn.tadle.com",
      },
      {
        protocol: "https",
        hostname: "explorer-api.walletconnect.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: '"cdn-tadle.aggregation.top',
      },
    ],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  // experimental: {
  //   swcPlugins: [["@swc-jotai/react-refresh", {}]],
  // },
};

module.exports = withNextIntl(nextConfig);
