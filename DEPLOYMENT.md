# LUMO — Deployment guide

## Два режима сборки

`next.config.ts` переключается одной env-переменной:

| `GH_PAGES` | Output | Routes | API (`/api/lead`, `/api/og`) |
| --- | --- | --- | --- |
| `1` | static export → `out/` | 24 статические + slug | **не работают** (выдают 404) |
| _не задано_ | обычный SSR | те же + `/api/*` | ✅ |

GitHub Pages workflow (`.github/workflows/pages.yml`) вызывает `pnpm build` с `GH_PAGES=1` — там форма падает на сетевой ошибке и triggerит fallback-toast «Открыть Telegram». Для **реальной** работы заявок нужен SSR-хостинг.

## Вариант A — Vercel (рекомендуется для Next.js 16)

1. `vercel login` (одноразово).
2. `vercel link` в корне репо → выбрать существующий project или создать `lumo`.
3. Залить env-переменные:
   ```bash
   vercel env add RESEND_API_KEY production
   vercel env add LUMO_LEAD_TO production
   vercel env add LUMO_LEAD_FROM production
   vercel env add TELEGRAM_BOT_TOKEN production
   vercel env add LUMO_TG_CHAT_ID production
   ```
4. `vercel deploy --prod` → выдаст `https://lumo-<hash>.vercel.app`.
5. На GitHub: Settings → Integrations → Vercel → подключить repo `paninbz-debug/Lumo` для auto-deploy от `main`.
6. (опц.) Custom domain → Vercel project → Domains → `lumo.studio` или `lumo.ru`.

## Вариант B — Railway

1. В Railway dashboard: New Project → Deploy from GitHub → `paninbz-debug/Lumo`.
2. Variables → добавить те же 5 переменных, что и для Vercel.
3. Build command: `pnpm build` (без `GH_PAGES=1`!).
4. Start command: `pnpm start`.
5. Public URL → `https://lumo-<…>.up.railway.app`.

> Старый деплой `lumo-production-a4a7.up.railway.app` сейчас неактивен — проще создать project с нуля.

## Вариант C — оставить GH Pages

Тогда форма всегда падает в fallback и клиент идёт в Telegram вручную. На MVP-stage это терпимо, но _Phase 3 цель_ — реальные заявки.

## Чек-лист после переключения с GH Pages на Vercel/Railway

- [ ] Удалить `output: 'export'` из `next.config.ts` (или просто не задавать `GH_PAGES`)
- [ ] В `app/layout.tsx` обновить `BASE_URL` для `metadataBase` на новый домен
- [ ] В `app/sitemap.ts` и `app/robots.ts` — то же
- [ ] Удалить `.github/workflows/pages.yml` (или оставить для backup-зеркала)
- [ ] CNAME-файл `public/CNAME` — удалить (уезжает на новый хост)
- [ ] Проверить отправку формы: `curl -X POST https://<host>/api/lead -H 'Content-Type: application/json' -d '{"name":"тест","contact":"@test","source":"home-final-cta"}'` → должен вернуться `{ok:true,managed:true}`
- [ ] Проверить OG: открыть `https://<host>/api/og?title=Тест` → 1200×630 PNG

## Получить Telegram chat_id

1. `@BotFather` → `/newbot` → имя `lumo_studio_leads_bot` (или любое).
2. Бот выдаст `TELEGRAM_BOT_TOKEN`.
3. Создать чат / канал. Добавить туда бота.
4. Отправить боту любое сообщение (если личка) **или** в канал.
5. `curl 'https://api.telegram.org/bot<TOKEN>/getUpdates' | jq '.result[].message.chat.id'` — взять последний chat.id.

## Получить RESEND_API_KEY

1. Зарегистрироваться на https://resend.com (free 3 000 писем/месяц).
2. API Keys → Create → скопировать `re_xxx`.
3. Domains → Add Domain → следовать DNS-инструкциям. На время верификации можно использовать `LUMO_LEAD_FROM=LUMO <onboarding@resend.dev>` (ограничение: только на ваш собственный e-mail).

## Локальный dev

```bash
cp .env.example .env.local
# заполнить значения
pnpm dev
# открыть http://localhost:3000
# отправить тестовую заявку через FinalCTA
# в терминале pnpm dev должен быть лог отправки
```

Без `.env.local` форма работает в режиме «managed=false» — UI показывает мягкий fallback.
