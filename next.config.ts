import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
      },
    ],
  },
};

export default nextConfig;
