/**
 * EXTERNAL_PHOTOS — фото, добавленные вручную Данилом для personal review
 * (visual reference из премиум-каталогов: De Castelli, VeroMetal, Boca do Lobo,
 * Promemoria, Sculpt Nouveau, Modern Masters, Brillux, и т.п.).
 *
 * AGENT-ASSIST НЕ скачивает фото с premium-брендов автоматически:
 *   - De Castelli ToS: «may not use it freely» (явный запрет вне их сайта)
 *   - Все остальные: стандартный «© All rights reserved» = тот же запрет
 *
 * Если Данилу нужны кадры с brand-сайтов для personal review:
 *   1. Открыть нужную галерею бренда вручную
 *   2. Right-click → Save image as → public/photos/external/<brand>/<descriptive>.jpg
 *   3. Прогнать через `magick "$f" -strip -auto-orient -quality 82 -resize "1600x1600>" "$f"`
 *   4. Добавить запись в массив EXTERNAL_PHOTOS ниже
 *   5. Привязать (если нужно) к коллекции/применению через targetCollection / targetApplication
 *
 * После своей фотосессии LUMO — массив очищается полностью, директория
 * public/photos/external/ удаляется, DRAFT_MODE → false.
 */

import type { CollectionId } from "./collections";
import type { ApplicationId } from "./applications";

export type Brand =
  | "decastelli"
  | "verometal"
  | "bocadolobo"
  | "promemoria"
  | "sculpt-nouveau"
  | "modern-masters"
  | "brillux"
  | "ideal-work";

export type ExternalPhoto = {
  src: string;
  caption: string;
  brand: Brand;
  /** URL of the original page where Данил saw this photo */
  sourceUrl: string;
  /** Optional: which collection/application page this photo decorates */
  targetCollection?: CollectionId;
  targetApplication?: ApplicationId;
};

export const BRAND_INFO: Record<Brand, { name: string; site: string; portfolioUrl: string }> = {
  decastelli: {
    name: "De Castelli",
    site: "https://www.decastelli.com",
    portfolioUrl: "https://www.decastelli.com/en/projects",
  },
  verometal: {
    name: "VeroMetal",
    site: "https://www.verometal.com",
    portfolioUrl: "https://www.verometal.com/en/projects",
  },
  bocadolobo: {
    name: "Boca do Lobo",
    site: "https://www.bocadolobo.com",
    portfolioUrl: "https://www.bocadolobo.com/en/inspiration-and-ideas/",
  },
  promemoria: {
    name: "Promemoria",
    site: "https://www.promemoria.com",
    portfolioUrl: "https://www.promemoria.com",
  },
  "sculpt-nouveau": {
    name: "Sculpt Nouveau",
    site: "https://www.sculptnouveau.com",
    portfolioUrl: "https://www.sculptnouveau.com",
  },
  "modern-masters": {
    name: "Modern Masters Metal Effects",
    site: "https://www.modernmasters.com",
    portfolioUrl: "https://www.modernmasters.com",
  },
  brillux: {
    name: "Brillux",
    site: "https://www.brillux.com",
    portfolioUrl: "https://www.brillux.com/en",
  },
  "ideal-work": {
    name: "Ideal Work",
    site: "https://www.idealwork.com",
    portfolioUrl: "https://www.idealwork.com",
  },
};

/**
 * Изначально массив пустой. Данил добавляет вручную после сохранения файла:
 *
 *   {
 *     src: "/photos/external/decastelli/lift-portal-bronze.jpg",
 *     caption: "Лифтовой портал, бронза",
 *     brand: "decastelli",
 *     sourceUrl: "https://www.decastelli.com/en/projects/<...>",
 *     targetCollection: "deep-mirror",
 *   },
 */
export const EXTERNAL_PHOTOS: ExternalPhoto[] = [];

export function externalForCollection(id: CollectionId): ExternalPhoto[] {
  return EXTERNAL_PHOTOS.filter((p) => p.targetCollection === id);
}

export function externalForApplication(id: ApplicationId): ExternalPhoto[] {
  return EXTERNAL_PHOTOS.filter((p) => p.targetApplication === id);
}

export function externalByBrand(brand: Brand): ExternalPhoto[] {
  return EXTERNAL_PHOTOS.filter((p) => p.brand === brand);
}

export function brandsWithPhotos(): Brand[] {
  const set = new Set<Brand>(EXTERNAL_PHOTOS.map((p) => p.brand));
  return Array.from(set);
}
