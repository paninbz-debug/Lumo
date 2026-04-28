/**
 * Префикс для статических ассетов (фото в /public).
 * Когда сайт собран для GH Pages с `basePath: "/Lumo"`, его НЕ применяют
 * автоматически к произвольным <img src="/photos/..."> и `<Image src=...>`
 * с `images.unoptimized: true`. Поэтому префиксим вручную.
 *
 * NEXT_PUBLIC_BASE_PATH задан в next.config.ts → попадает в client bundle.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(src: string): string {
  if (!src) return src;
  if (/^(https?:|data:|blob:)/.test(src)) return src;
  if (BASE && src.startsWith(BASE)) return src; // already prefixed
  return BASE + src;
}
