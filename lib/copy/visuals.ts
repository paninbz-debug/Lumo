/**
 * Визуальные плейсхолдеры (gradients + emoji + caption) для:
 * — gallery каждой коллекции
 * — before/after на applications
 * — process на /craft
 * — material samples на /material
 *
 * Все gradient'ы используют только палитру LUMO (warm/cool metallic).
 * После приёма реальных фото из шоурума заменяются на <Image> (TODO Phase 3).
 */

import type { CollectionId } from "./collections";

export const PLACEHOLDER_HINT = "Плейсхолдер · реальные фото из шоурума LUMO будут добавлены после съёмки";

// — collection galleries (6-8 placeholders each) —
const GR = {
  warmDeep: "linear-gradient(135deg, #b89968 0%, #856a45 60%, #2a1f15 100%)",
  warmMid: "linear-gradient(135deg, #c77d4a 0%, #b89968 50%, #856a45 100%)",
  warmLight: "linear-gradient(135deg, #d4a87a 0%, #b89968 60%, #6b5739 100%)",
  patina: "linear-gradient(135deg, #6e8a7a 0%, #4a6357 40%, #2d3b35 100%)",
  patinaCu: "linear-gradient(135deg, #8c7a52 0%, #5e8b75 50%, #2d4a3e 100%)",
  copper: "linear-gradient(135deg, #c77d4a 0%, #a35a30 50%, #6b3b1f 100%)",
  copperFire: "linear-gradient(135deg, #d68a4a 0%, #b87333 50%, #7a3f15 100%)",
  mercury: "linear-gradient(135deg, #c9d2d6 0%, #8b96a0 50%, #4a5560 100%)",
  mercuryDeep: "linear-gradient(135deg, #aab5bd 0%, #6c7783 50%, #2a3038 100%)",
  brushed: "linear-gradient(135deg, #d4dadd 0%, #a4adb3 50%, #6e7780 100%)",
  brushedAlu: "linear-gradient(135deg, #c1c7cc 0%, #8e959c 50%, #555a62 100%)",
} as const;

export type GalleryItem = { gradient: string; caption: string; emoji?: string };

export const COLLECTION_GALLERY: Record<CollectionId, GalleryItem[]> = {
  "deep-mirror": [
    { gradient: GR.warmMid, caption: "Парадный вход, ЖК класса А, Москва", emoji: "🏛️" },
    { gradient: GR.warmDeep, caption: "Лифтовой портал, бутик-отель", emoji: "🛗" },
    { gradient: GR.mercury, caption: "Колонна ресепшен, премиум-офис" },
    { gradient: GR.warmLight, caption: "Барная стойка, винотека" },
    { gradient: GR.warmMid, caption: "Мебельный портал в гостиной" },
    { gradient: GR.mercuryDeep, caption: "Зеркальная стена, ванная мастер" },
    { gradient: GR.warmDeep, caption: "Скульптурная вставка, шоурум" },
    { gradient: GR.warmMid, caption: "Дверь-портал, частный особняк" },
  ],
  "aged-patina": [
    { gradient: GR.patina, caption: "Камерная гостиная, медная стена 24 м²", emoji: "🪞" },
    { gradient: GR.patinaCu, caption: "Винная зона, патина бронзы" },
    { gradient: GR.copper, caption: "Каминный портал, медиа-стена" },
    { gradient: GR.patina, caption: "Библиотека, ниша под латуни" },
    { gradient: GR.copper, caption: "Спа-зона, верхний свет" },
    { gradient: GR.patinaCu, caption: "Архитектурный фасад, лофт SoHo" },
    { gradient: GR.patina, caption: "Хамам, тёплый светлый патина" },
    { gradient: GR.copper, caption: "Арт-объект, скульптура «волна»" },
  ],
  "brushed-daylight": [
    { gradient: GR.brushed, caption: "Кухонный фасад, частный особняк", emoji: "🍳" },
    { gradient: GR.brushedAlu, caption: "Потолочный кессон, open-space" },
    { gradient: GR.mercury, caption: "Фоновая стена, кабинет CEO" },
    { gradient: GR.brushed, caption: "Спальня мастер, фон за изголовьем" },
    { gradient: GR.brushedAlu, caption: "Комод-консоль, бутик-отель" },
    { gradient: GR.mercury, caption: "Архитектурный потолок, спортзал" },
    { gradient: GR.brushed, caption: "Двери в гардеробе" },
    { gradient: GR.brushedAlu, caption: "Стол-остров на кухне" },
  ],
  "liquid-mercury": [
    { gradient: GR.mercuryDeep, caption: "Скульптурная инсталляция, ритейл-зона", emoji: "💧" },
    { gradient: GR.mercury, caption: "Двери-порталы ультра-премиум" },
    { gradient: GR.mercuryDeep, caption: "Ресепшен флагмана бренда" },
    { gradient: GR.brushed, caption: "Лифтовой холл отеля" },
    { gradient: GR.mercury, caption: "Арт-стена, художественная галерея" },
    { gradient: GR.mercuryDeep, caption: "Скульптурный объект «Cloud»" },
    { gradient: GR.brushedAlu, caption: "Витринная сцена, ритейл премиум" },
    { gradient: GR.mercury, caption: "Архитектурный портал, лобби" },
  ],
  "copper-fire": [
    { gradient: GR.copperFire, caption: "Каминный портал, гостиная", emoji: "🔥" },
    { gradient: GR.copper, caption: "Винная зона, парадная" },
    { gradient: GR.copperFire, caption: "Парадный холл, ар-деко" },
    { gradient: GR.copper, caption: "Cigar-room, бутик-отель" },
    { gradient: GR.copperFire, caption: "Фасад мебели, ар-нуво" },
    { gradient: GR.copper, caption: "Колонна, ресторан гранд-стиля" },
    { gradient: GR.copperFire, caption: "Дверь-портал в кабинет" },
    { gradient: GR.copper, caption: "Декоративная вставка, медиа-зона" },
  ],
};

// — before / after for applications —
export const APPLICATION_BEFOREAFTER: Record<string, { before: string; after: string; beforeCaption: string; afterCaption: string }> = {
  walls: {
    before: "linear-gradient(135deg, #d4cfc4 0%, #a8a194 50%, #6e6657 100%)",
    after: GR.warmMid,
    beforeCaption: "Гладкая штукатурка под покраску, серо-бежевая",
    afterCaption: "Латунь Deep Mirror, P80 → P2000, Dialux Jaune",
  },
  "furniture-mdf": {
    before: "linear-gradient(135deg, #f0ebe0 0%, #c7bfb0 50%, #8a8170 100%)",
    after: GR.brushed,
    beforeCaption: "МДФ-фасад под белую эмаль, матовая глянц-3",
    afterCaption: "Алюминий Brushed Daylight, эпоксидный 2K-грунт",
  },
  kitchens: {
    before: "linear-gradient(135deg, #e6e1d6 0%, #b3ad9d 50%, #75705f 100%)",
    after: GR.brushedAlu,
    beforeCaption: "Кухонный фартук плитка, керамогранит «соты»",
    afterCaption: "Brushed Daylight никель, двойной 2K-полиуретан",
  },
  bathrooms: {
    before: "linear-gradient(135deg, #d8dde0 0%, #aab1b6 50%, #6c7378 100%)",
    after: GR.mercury,
    beforeCaption: "Серая плитка крупного формата, шов 2 мм",
    afterCaption: "Liquid Mercury нержавейка, сухая зона за умывальником",
  },
  horeca: {
    before: "linear-gradient(135deg, #b8b0a3 0%, #847b6d 50%, #4d4639 100%)",
    after: GR.copperFire,
    beforeCaption: "Гладкая штукатурка под покраску, тёмно-беж",
    afterCaption: "Copper Fire медь, полисилазан 9H+ для каминного портала",
  },
  facades: {
    before: "linear-gradient(135deg, #c4bfb4 0%, #94907f 50%, #524d3f 100%)",
    after: GR.warmDeep,
    beforeCaption: "Бетонная плита фасада, открытая структура",
    afterCaption: "Латунь Aged Patina, экстерьерный 2K-полиуретан UV+",
  },
};

// — process on /craft —
export const CRAFT_PROCESS: Array<{ gradient: string; caption: string; emoji: string }> = [
  { gradient: "linear-gradient(135deg, #b8b0a3 0%, #5e564a 50%, #2d2820 100%)", caption: "Подготовка: DTM-праймер, фотопротокол", emoji: "🧱" },
  { gradient: GR.warmMid, caption: "Нанесение: HVLP-краскопульт Festool, 65–90 % transfer", emoji: "💨" },
  { gradient: GR.brushedAlu, caption: "Шлифовка: Festool ETS 125, поперечная между шагами", emoji: "🔄" },
  { gradient: GR.warmLight, caption: "Полировка: фетр + Dialux Jaune, два прохода", emoji: "✨" },
  { gradient: "linear-gradient(135deg, #c9d2d6 0%, #6c7783 50%, #2a3038 100%)", caption: "Защита: 2K-полиуретан или полисилазан 9H+", emoji: "🛡️" },
];

// — material samples on /material —
export type MetalSwatch = {
  id: string;
  name: string;
  formula: string;
  gradient: string;
  epithets: string;
  associations: string;
  leadPhrase: string;
};

export const MATERIAL_METALS: MetalSwatch[] = [
  {
    id: "brass",
    name: "Латунь",
    formula: "Cu + Zn",
    gradient: "linear-gradient(135deg, #d4af72 0%, #b89968 50%, #7d6437 100%)",
    epithets: "тёплый, золотистый, медовый, янтарный, благородный, mid-century",
    associations: "Art Deco / Chrysler Building, викторианская гостиная, корабельная фурнитура",
    leadPhrase:
      "Латунь — единственный металл, который становится прекраснее с возрастом.",
  },
  {
    id: "bronze",
    name: "Бронза",
    formula: "Cu + Sn",
    gradient: "linear-gradient(135deg, #9c6b3a 0%, #6e4824 50%, #38220d 100%)",
    epithets: "глубокий, шоколадный, землистый, бархатный, скульптурный, церемониальный",
    associations: "античные скульптуры, дзэн-будды Камакура, олимпийские медали",
    leadPhrase:
      "Бронза — материал, в котором живут пять тысячелетий памяти.",
  },
  {
    id: "copper",
    name: "Медь",
    formula: "Cu",
    gradient: "linear-gradient(135deg, #c77d4a 0%, #a35a30 50%, #6b3b1f 100%)",
    epithets: "красно-оранжевый, огненный, закатный, антимикробный, дышащий, alchemical",
    associations: "Статуя Свободы, японские медные кровли, купола русских церквей",
    leadPhrase:
      "Медь — единственный металл, который становится зелёным, чтобы защитить себя.",
  },
  {
    id: "nickel",
    name: "Никель",
    formula: "Ni",
    gradient: "linear-gradient(135deg, #c9d2d6 0%, #8b96a0 50%, #4a5560 100%)",
    epithets: "серебристо-холодный, лунный, стальной, точный, гипоаллергенный, modernist",
    associations: "скандинавский минимализм, Apple aesthetics, швейцарская хирургия",
    leadPhrase:
      "Никель — холодная дисциплина серебра без его мягкости.",
  },
  {
    id: "aluminum",
    name: "Алюминий",
    formula: "Al",
    gradient: "linear-gradient(135deg, #d4dadd 0%, #a4adb3 50%, #6e7780 100%)",
    epithets: "лёгкий, серебристо-белый, нейтральный, авиационный, anodized, lunar",
    associations: "Apple Park, авиация и космос, Bauhaus / Streamline",
    leadPhrase:
      "Brushed Daylight: дневной свет, превращённый в металл.",
  },
];
