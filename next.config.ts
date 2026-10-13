import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "192.168.1.24",
    "192.168.1.24:3000",
    "192.168.1.33",
    "192.168.1.33:3000",
    "localhost:3000",
    "localhost",
  ],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
