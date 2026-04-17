import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@keystrum/synth", "@keystrum/layout"],
  images: { unoptimized: true },
};

export default nextConfig;
