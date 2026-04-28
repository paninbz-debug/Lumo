import type { Metadata } from "next";
import { DRAFT_MODE } from "@/lib/copy/draft-mode";

/**
 * Spread в metadata каждой страницы — гарантирует, что override metadata.title
 * на sub-странице не сбрасывает unsafe defaults (особенно robots в DRAFT_MODE).
 */
export const draftRobots: Metadata["robots"] = DRAFT_MODE
  ? { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } }
  : { index: true, follow: true };
