import type { NextConfig } from "next";

const isPages = process.env.GH_PAGES === "1";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages.
  // Removed when we move to Vercel/Railway in Phase 2 (real /api/lead route).
  output: isPages ? "export" : undefined,
  basePath: isPages ? "/Lumo" : undefined,
  trailingSlash: isPages || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
