import type { MetadataRoute } from "next";
import { DRAFT_MODE } from "@/lib/copy/draft-mode";

export const dynamic = "force-static";

const BASE_URL =
  process.env.GH_PAGES === "1"
    ? "https://paninbz-debug.github.io/Lumo"
    : "https://lumo.studio";

export default function robots(): MetadataRoute.Robots {
  if (DRAFT_MODE) {
    // Полный no-index пока сайт на временных фото.
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
