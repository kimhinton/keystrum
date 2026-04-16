import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@keystrum/synth", "@keystrum/layout"],
};

export default nextConfig;
