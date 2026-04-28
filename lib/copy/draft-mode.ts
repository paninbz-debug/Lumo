/**
 * DRAFT_MODE flag — пока сайт показывается с временными фото с Unsplash
 * (или вручную добавленными Данилом из брендовых каталогов для personal review).
 *
 * Когда включён:
 *   - <meta name="robots" content="noindex,nofollow"> на каждой странице
 *   - DraftBanner в верху сайта
 *   - /robots.txt блокирует gallery routes
 *   - footer-disclaimer ссылается на /credits
 *
 * Чтобы выключить (после собственной фотосессии LUMO):
 *   1. Заменить файлы в public/photos/* на собственные
 *   2. DRAFT_MODE = false
 *   3. Удалить public/photos/external/* если был
 *   4. Обновить /credits — убрать Unsplash + external sections
 */
export const DRAFT_MODE = true;

export const DRAFT_BANNER = {
  short:
    "DRAFT — фото временные. Не для публикации.",
  full:
    "Сайт в draft-режиме. Фото — временные иллюстрации (Unsplash + ручные референсы для personal review). Реальные кадры — после собственной фотосессии LUMO.",
};
