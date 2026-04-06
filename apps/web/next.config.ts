import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  typedRoutes: true,

  transpilePackages: ["@workspace/ui"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  experimental: {
    // Add large packages here for tree-shaking optimization
    // optimizePackageImports: [],
  },
};

export default nextConfig;
