import type { NextConfig } from "next";

const isPages = process.env.GH_PAGES === "1";

const nextConfig: NextConfig = {
  // Three deploy modes:
  //   GH_PAGES=1 → static export (current Phase 1)
  //   default   → 'standalone' (Railway/Docker; minimal runtime artefact)
  //   vercel    → undefined (Vercel auto-detects)
  output: isPages ? "export" : "standalone",
  basePath: isPages ? "/Lumo" : undefined,
  trailingSlash: isPages || undefined,
  images: { unoptimized: true },
  // expose to client bundle so lib/asset-path.ts can prefix /photos/* manually
  // (Next 16 + images.unoptimized:true does NOT auto-prefix <Image src="/foo.jpg">).
  env: { NEXT_PUBLIC_BASE_PATH: isPages ? "/Lumo" : "" },
};

export default nextConfig;
