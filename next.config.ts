
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Ensure Next.js uses the project directory as the workspace root
  outputFileTracingRoot: __dirname,
  // Silence turbopack root warnings and align dev/build roots
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;