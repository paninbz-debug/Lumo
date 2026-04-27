import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.GH_PAGES === "1"
    ? "https://paninbz-debug.github.io/Lumo"
    : "https://lumo.studio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
