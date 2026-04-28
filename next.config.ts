import type { NextConfig } from "next";

const isPages = process.env.GH_PAGES === "1";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages.
  // Removed when we move to Vercel/Railway in Phase 2 (real /api/lead route).
  output: isPages ? "export" : undefined,
  basePath: isPages ? "/Lumo" : undefined,
  trailingSlash: isPages || undefined,
  images: { unoptimized: true },
  // expose to client bundle so lib/asset-path.ts can prefix /photos/* manually
  // (Next 16 + images.unoptimized:true does NOT auto-prefix <Image src="/foo.jpg">).
  env: { NEXT_PUBLIC_BASE_PATH: isPages ? "/Lumo" : "" },
};

export default nextConfig;
