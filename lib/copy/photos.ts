/**
 * Phase 3.5 — временные изображения с Unsplash (License: free for commercial use,
 * https://unsplash.com/license). После собственной фотосессии LUMO эти файлы
 * заменяются на свои.
 *
 * Каждая запись хранит:
 *   src         — путь относительно /public
 *   caption     — текст подписи на сайте (стилизация под объект)
 *   unsplashId  — оригинальный photo-ID для credits page
 */

export type Photo = {
  src: string;
  caption: string;
  unsplashId: string;
  tag?: string;
};

export type PhotoSet = Record<string, Photo[]>;

// — Collection galleries (8 photos each)
export const COLLECTION_PHOTOS: PhotoSet = {
  "deep-mirror": [
    { src: "/photos/collections/deep-mirror/dm_01.jpg", caption: "Парадный вход, ЖК класса А", unsplashId: "1758426637810-0c191dd0ec31" },
    { src: "/photos/collections/deep-mirror/dm_02.jpg", caption: "Полированный лифтовой портал", unsplashId: "1729227886182-f5da39c315a4" },
    { src: "/photos/collections/deep-mirror/dm_03.jpg", caption: "Колонна ресепшен, премиум-офис", unsplashId: "1737917900899-ca535fe23aa9" },
    { src: "/photos/collections/deep-mirror/dm_04.jpg", caption: "Барная стойка, винотека", unsplashId: "1744998988552-de3882a28bd4" },
    { src: "/photos/collections/deep-mirror/dm_05.jpg", caption: "Мебельный портал, гостиная", unsplashId: "1634738301525-1bfe908fcc53" },
    { src: "/photos/collections/deep-mirror/dm_06.jpg", caption: "Зеркальная стена, мастер-санузел", unsplashId: "1757377125373-26d255339ced" },
    { src: "/photos/collections/deep-mirror/dm_07.jpg", caption: "Скульптурная вставка, шоурум", unsplashId: "1624007666785-8cccc435557e" },
    { src: "/photos/collections/deep-mirror/dm_08.jpg", caption: "Дверь-портал, частный особняк", unsplashId: "1718545776878-73100a700f44" },
    { src: "/photos/collections/deep-mirror/dm-extra_01.jpg", caption: "Полированный объём, бронзовая скульптура", unsplashId: "1606407940022-45533fea3f" },
    { src: "/photos/collections/deep-mirror/dm-extra_02.jpg", caption: "Зеркальный мебельный портал", unsplashId: "1702314876402-8f64d97030" },
    { src: "/photos/collections/deep-mirror/dm-extra_03.jpg", caption: "Фрагмент полировки до P2000", unsplashId: "1628681464827-b672d207bd" },
    { src: "/photos/collections/deep-mirror/dm-extra_04.jpg", caption: "Изгиб полированного объёма", unsplashId: "1606407940763-8e752f5879" },
  ],
  "aged-patina": [
    { src: "/photos/collections/aged-patina/ap_01.jpg", caption: "Камерная гостиная, медная стена 24 м²", unsplashId: "1764983266623-364aa9edad95" },
    { src: "/photos/collections/aged-patina/ap_02.jpg", caption: "Винная зона, патина бронзы", unsplashId: "1764983252633-7b40243f69d5" },
    { src: "/photos/collections/aged-patina/ap_03.jpg", caption: "Каминный портал, медиа-стена", unsplashId: "1764983264007-521aad03fad2" },
    { src: "/photos/collections/aged-patina/ap_04.jpg", caption: "Библиотека, ниша под латунь", unsplashId: "1764983253649-7e4e5b53be7f" },
    { src: "/photos/collections/aged-patina/ap_05.jpg", caption: "Спа-зона, верхний свет", unsplashId: "1766326252352-481e7f1386a2" },
    { src: "/photos/collections/aged-patina/ap_06.jpg", caption: "Архитектурный фасад, лофт SoHo", unsplashId: "1764983255396-4c4545e93cfb" },
    { src: "/photos/collections/aged-patina/ap_07.jpg", caption: "Хамам, тёплый светлый патина", unsplashId: "1715759819843-c723e46f9902" },
    { src: "/photos/collections/aged-patina/ap_08.jpg", caption: "Арт-объект, скульптура «Волна»", unsplashId: "1764983432341-6a9e2803ef09" },
  ],
  "brushed-daylight": [
    { src: "/photos/collections/brushed-daylight/bd_01.jpg", caption: "Кухонный фасад, частный особняк", unsplashId: "1728485842714-8a20bd66e3e3" },
    { src: "/photos/collections/brushed-daylight/bd_02.jpg", caption: "Потолочный кессон, open-space", unsplashId: "1589464126341-3372cd24c4fe" },
    { src: "/photos/collections/brushed-daylight/bd_03.jpg", caption: "Фоновая стена, кабинет CEO", unsplashId: "1626844702949-d8dfb8bf82f0" },
    { src: "/photos/collections/brushed-daylight/bd_04.jpg", caption: "Спальня мастер, фон за изголовьем", unsplashId: "1609206065077-bfd08f18af8e" },
    { src: "/photos/collections/brushed-daylight/bd_05.jpg", caption: "Комод-консоль, бутик-отель", unsplashId: "1612476949119-9b765ed87945" },
    { src: "/photos/collections/brushed-daylight/bd_06.jpg", caption: "Архитектурный потолок, спортзал", unsplashId: "1633309340199-98d11f5c4e71" },
    { src: "/photos/collections/brushed-daylight/bd_07.jpg", caption: "Двери в гардеробной", unsplashId: "1572033841928-aa79aeee2316" },
    { src: "/photos/collections/brushed-daylight/bd_08.jpg", caption: "Стол-остров на кухне", unsplashId: "1572284950175-7119b9429464" },
    { src: "/photos/collections/brushed-daylight/bd-extra_01.jpg", caption: "Anodized-финиш фасада, скандинавский минимализм", unsplashId: "1591361802285-7e4678e537" },
    { src: "/photos/collections/brushed-daylight/bd-extra_02.jpg", caption: "Алюминиевая поверхность в скользящем свете", unsplashId: "1503233324503-20adf3c8a4" },
    { src: "/photos/collections/brushed-daylight/bd-extra_03.jpg", caption: "Брашированный никель, деталь", unsplashId: "1684483165545-baaa4d88f9" },
    { src: "/photos/collections/brushed-daylight/bd-extra_04.jpg", caption: "Архитектурный фасад с однонаправленной штриховкой", unsplashId: "1595786229272-e9a02a3309" },
  ],
  "liquid-mercury": [
    { src: "/photos/collections/liquid-mercury/lm_01.jpg", caption: "Скульптурная инсталляция, ритейл-зона", unsplashId: "1684025349621-1e5fc8816cc1" },
    { src: "/photos/collections/liquid-mercury/lm_02.jpg", caption: "Двери-порталы ультра-премиум", unsplashId: "1759939593236-e2878571452f" },
    { src: "/photos/collections/liquid-mercury/lm_03.jpg", caption: "Ресепшен флагмана бренда", unsplashId: "1764885518664-528632626153" },
    { src: "/photos/collections/liquid-mercury/lm_04.jpg", caption: "Лифтовой холл отеля", unsplashId: "1641714314063-f02ac292cff7" },
    { src: "/photos/collections/liquid-mercury/lm_05.jpg", caption: "Арт-стена, художественная галерея", unsplashId: "1773085266737-80352d201112" },
    { src: "/photos/collections/liquid-mercury/lm_06.jpg", caption: "Скульптурный объект «Cloud»", unsplashId: "1764505879000-e75c1249285e" },
    { src: "/photos/collections/liquid-mercury/lm_07.jpg", caption: "Витринная сцена, ритейл премиум", unsplashId: "1744997553871-f01c475570a7" },
    { src: "/photos/collections/liquid-mercury/lm_08.jpg", caption: "Архитектурный портал, лобби", unsplashId: "1605643556957-0c8edc5bb03c" },
    { src: "/photos/collections/liquid-mercury/lm-extra_01.jpg", caption: "Хромированный отражающий объём", unsplashId: "1773574060837-1a7a9c1dfe" },
    { src: "/photos/collections/liquid-mercury/lm-extra_02.jpg", caption: "Сюрреалистическая зеркальная сфера", unsplashId: "1765118489122-6705b7c9f7" },
  ],
  "copper-fire": [
    { src: "/photos/collections/copper-fire/cf_01.jpg", caption: "Каминный портал, гостиная", unsplashId: "1603364579808-49a50ff42ea2" },
    { src: "/photos/collections/copper-fire/cf_02.jpg", caption: "Винная зона, парадная", unsplashId: "1759840529015-c54dfd772076" },
    { src: "/photos/collections/copper-fire/cf_03.jpg", caption: "Парадный холл, ар-деко", unsplashId: "1571168136613-46401b03904e" },
    { src: "/photos/collections/copper-fire/cf_04.jpg", caption: "Cigar-room, бутик-отель", unsplashId: "1759840526972-e39a03991e7c" },
    { src: "/photos/collections/copper-fire/cf_05.jpg", caption: "Фасад мебели, ар-нуво", unsplashId: "1773169263939-65a471960c1e" },
    { src: "/photos/collections/copper-fire/cf_06.jpg", caption: "Колонна, ресторан гранд-стиля", unsplashId: "1655917080884-538d83e1de11" },
    { src: "/photos/collections/copper-fire/cf_07.jpg", caption: "Дверь-портал в кабинет", unsplashId: "1773215665369-e80b4ae00ebe" },
    { src: "/photos/collections/copper-fire/cf_08.jpg", caption: "Декоративная вставка, медиа-зона", unsplashId: "1566335627875-a4dda3706486" },
    { src: "/photos/collections/copper-fire/cf-extra_01.jpg", caption: "Медный fond с тёплым свечением", unsplashId: "1764253414255-2f5b3511a0" },
    { src: "/photos/collections/copper-fire/cf-extra_02.jpg", caption: "Полированная медь, янтарный регистр", unsplashId: "1773067752070-e1d3923caf" },
    { src: "/photos/collections/copper-fire/cf-extra_03.jpg", caption: "Медь под мягким архитектурным светом", unsplashId: "1766591463271-f8103f1b77" },
    { src: "/photos/collections/copper-fire/cf-extra_04.jpg", caption: "Медный portal с бликами", unsplashId: "1557298935-e8f14e8e3a1f" },
  ],
};

// — Application photos (5 each)
export const APPLICATION_PHOTOS: PhotoSet = {
  walls: [
    { src: "/photos/applications/walls/walls_01.jpg", caption: "Акцентная стена в гостиной", unsplashId: "1592401526914-7e5d94a8d6fa" },
    { src: "/photos/applications/walls/walls_02.jpg", caption: "Лофт с медной стеной", unsplashId: "1701789575034-9cd42d2dfd0a" },
    { src: "/photos/applications/walls/walls_03.jpg", caption: "Стена за ТВ-зоной", unsplashId: "1646592474167-16137d4da628" },
    { src: "/photos/applications/walls/walls_04.jpg", caption: "Стена в премиум-апартаментах", unsplashId: "1758972581344-85dd3ccb10db" },
    { src: "/photos/applications/walls/walls_05.jpg", caption: "Стена-портал у изголовья", unsplashId: "1615971677499-5467cbab01c0" },
    { src: "/photos/applications/walls/walls-extra_01.jpg", caption: "Парадный холл с акцентной стеной", unsplashId: "1708107243243-557a2cad3c" },
    { src: "/photos/applications/walls/walls-extra_02.jpg", caption: "Лифтовой холл премиум-объекта", unsplashId: "1610477633852-109ff3106e" },
    { src: "/photos/applications/walls/walls-extra_03.jpg", caption: "Парадный портал между зон", unsplashId: "1610477633837-3405a17ee5" },
  ],
  "furniture-mdf": [
    { src: "/photos/applications/furniture-mdf/furn_01.jpg", caption: "Премиум-серия мебельных фасадов", unsplashId: "1742731829910-1d5e02be7481" },
    { src: "/photos/applications/furniture-mdf/furn_02.jpg", caption: "Барная стойка с MDF-фасадом", unsplashId: "1775391096192-2717495f60d9" },
    { src: "/photos/applications/furniture-mdf/furn_03.jpg", caption: "Гардеробная серия, латунь", unsplashId: "1724873292656-16673fce82b2" },
    { src: "/photos/applications/furniture-mdf/furn_04.jpg", caption: "Кабинетный портал, бронза", unsplashId: "1695542957477-5f5e3baf4800" },
    { src: "/photos/applications/furniture-mdf/furn_05.jpg", caption: "Витринная мебельная серия", unsplashId: "1695335751654-6f83e0a46edf" },
  ],
  kitchens: [
    { src: "/photos/applications/kitchens/kit_01.jpg", caption: "Премиум-кухня с медным фартуком", unsplashId: "1693027317425-56b5a58aa974" },
    { src: "/photos/applications/kitchens/kit_02.jpg", caption: "Кухня класса А, латунь", unsplashId: "1771371854543-bb274762389e" },
    { src: "/photos/applications/kitchens/kit_03.jpg", caption: "Кухонный остров с MDF", unsplashId: "1769326541248-5e09a8ace25b" },
    { src: "/photos/applications/kitchens/kit_04.jpg", caption: "Открытая кухня в лофте", unsplashId: "1769326541179-1c496f7c5104" },
    { src: "/photos/applications/kitchens/kit_05.jpg", caption: "Кухня-бистро, нержавейка", unsplashId: "1769326541210-86e9d3204496" },
    { src: "/photos/applications/kitchens/kit-extra_01.jpg", caption: "Металлический фартук в кухне", unsplashId: "1723810733743-2b95373cc5" },
    { src: "/photos/applications/kitchens/kit-extra_02.jpg", caption: "Кухня с латунным акцентом", unsplashId: "1698653222124-063435c87e" },
    { src: "/photos/applications/kitchens/kit-extra_03.jpg", caption: "Кухонный остров с металлическим финишем", unsplashId: "1721201338236-ea96d48be1" },
  ],
  bathrooms: [
    { src: "/photos/applications/bathrooms/bath_01.jpg", caption: "Стена за умывальником", unsplashId: "1749766878223-6ceae855b28b" },
    { src: "/photos/applications/bathrooms/bath_02.jpg", caption: "Premium-санузел, латунь", unsplashId: "1765745518752-68a2893007" },
    { src: "/photos/applications/bathrooms/bath_03.jpg", caption: "Сухая зона ванной, никель", unsplashId: "1765745520336-88acf0b84fe4" },
    { src: "/photos/applications/bathrooms/bath_04.jpg", caption: "Потолочный акцент, ванная мастер", unsplashId: "1765766556463-180500e61ea8" },
    { src: "/photos/applications/bathrooms/bath_05.jpg", caption: "Стена-портал у джакузи", unsplashId: "1765745518673-b562b7304a53" },
  ],
  horeca: [
    { src: "/photos/applications/horeca/hor_01.jpg", caption: "Барная стойка ресторана", unsplashId: "1774192621035-20d11389f781" },
    { src: "/photos/applications/horeca/hor_02.jpg", caption: "Лифтовой холл бутик-отеля", unsplashId: "1759038085935-b2f14c2c04a7" },
    { src: "/photos/applications/horeca/hor_03.jpg", caption: "Парадный ресепшен ресторана", unsplashId: "1775342885658-1fe496d294a3" },
    { src: "/photos/applications/horeca/hor_04.jpg", caption: "Винный погреб, патина", unsplashId: "1761085590866-e94c99818636" },
    { src: "/photos/applications/horeca/hor_05.jpg", caption: "Спа-зона спа-отеля", unsplashId: "1759038086995-fb21d7c4dc56" },
    { src: "/photos/applications/horeca/hor-extra_01.jpg", caption: "Бар-стойка отеля с тёплым подсветом", unsplashId: "1723465302725-ff46b3e165" },
    { src: "/photos/applications/horeca/hor-extra_02.jpg", caption: "Парадный ресепшен бутик-отеля", unsplashId: "1744782996368-dc5b7e697f" },
    { src: "/photos/applications/horeca/hor-extra_03.jpg", caption: "Винный бар с латунными элементами", unsplashId: "1674654658736-bbede04981" },
  ],
  facades: [
    { src: "/photos/applications/facades/fac_01.jpg", caption: "Архитектурный фасад премиум-объекта", unsplashId: "1695809584503-69ee6dd2b7fb" },
    { src: "/photos/applications/facades/fac_02.jpg", caption: "Cor-ten фасад, лофт", unsplashId: "1742496754784-b4c09f9f731c" },
    { src: "/photos/applications/facades/fac_03.jpg", caption: "MDF-фасад премиум-серии", unsplashId: "1711873318272-ea1fd95ea950" },
    { src: "/photos/applications/facades/fac_04.jpg", caption: "Внешняя архитектурная вставка", unsplashId: "1712418159934-eb5fcad1a996" },
    { src: "/photos/applications/facades/fac_05.jpg", caption: "Фасад с патиной", unsplashId: "1589095093845-93a387ebc7ee" },
  ],
};

// — 5-stage craft process (one photo per stage)
export const CRAFT_PHOTOS: Photo[] = [
  { src: "/photos/craft/craft_01.jpg", caption: "Подготовка: DTM-праймер и фотопротокол", unsplashId: "1745845289797-913815100704" },
  { src: "/photos/craft/craft_02.jpg", caption: "Нанесение: HVLP-краскопульт Festool", unsplashId: "1714589214569-f235c49f691f" },
  { src: "/photos/craft/craft_03.jpg", caption: "Шлифовка: Festool ETS, поперечные ходы", unsplashId: "1649778652130-d97cae092e1a" },
  { src: "/photos/craft/craft_04.jpg", caption: "Полировка: фетр + Dialux Jaune", unsplashId: "1761544775976-0c81b00e81d3" },
  { src: "/photos/craft/craft_05.jpg", caption: "Защита: 2K-полиуретан или полисилазан 9H+", unsplashId: "1692091192613-20b1c3791677" },
];

export const HERO_PHOTO: Photo = {
  src: "/photos/hero/hero_01.jpg",
  caption: "Премиум-интерьер с металлическим финишем",
  unsplashId: "1773136609391-3358a47b6b74",
};

export function unsplashLink(id: string) {
  // Unsplash permalinks have form /photos/<slug>; we don't know slug, but
  // the photo ID alone redirects to the correct page.
  return `https://unsplash.com/photos/${id}`;
}

export function allPhotos(): Photo[] {
  const out: Photo[] = [HERO_PHOTO, ...CRAFT_PHOTOS];
  for (const arr of Object.values(COLLECTION_PHOTOS)) out.push(...arr);
  for (const arr of Object.values(APPLICATION_PHOTOS)) out.push(...arr);
  return out;
}
