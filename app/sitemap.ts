import type { MetadataRoute } from "next";
import { COLLECTIONS_LIST } from "@/lib/copy/collections";
import { APPLICATIONS_LIST } from "@/lib/copy/applications";

export const dynamic = "force-static";

const BASE_URL =
  process.env.GH_PAGES === "1"
    ? "https://paninbz-debug.github.io/Lumo"
    : "https://lumo.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/material",
    "/pricing",
    "/collections",
    "/applications",
    "/craft",
    "/trade",
    "/journal",
    "/contacts",
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${BASE_URL}${r}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1.0 : 0.8,
    })),
    ...COLLECTIONS_LIST.map((c) => ({
      url: `${BASE_URL}/collections/${c.id}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...APPLICATIONS_LIST.map((a) => ({
      url: `${BASE_URL}/applications/${a.id}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
