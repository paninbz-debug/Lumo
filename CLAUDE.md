# LUMO — CLAUDE.md

Премиум-сайт liquid-metal изделий (вазы, лампы, объекты).

## Engineering principles (Karpathy 4) — applied to every change

1. **Ground every change in tests.** No commit without a test. Bugs — failing test first.
2. **Composition > inheritance.** Small, focused components. No deep hierarchies.
3. **Explicit > implicit.** Names and types reveal intent. No "magic".
4. **One change at a time.** One commit = one logical edit.

Reference: `~/Downloads/_Vault/01-regulations/research/RESEARCH_top_claude_code_sites_2026.md` §8.3 + global skill `dpa-baseline`.

## Стек

- Next.js 16 (App Router) + React 19
- TypeScript strict
- Tailwind 4 + shadcn-style components
- Framer Motion 12 (entrance / scroll-reveals)
- Lenis (smooth-scroll, marketing-only)
- next/font/local: Unbounded (display) + Cormorant Garamond (serif italic) + Inter (body) + JetBrains Mono
- Resend (lead-form email)
- Telegram Bot (lead notifications)
- next-themes (dark default)
- sonner (toasts)
- Radix Slot, Base UI

Деплой: GH Pages (`out/` static export, `GH_PAGES=1`) ИЛИ Vercel/Railway (SSR).

## Структура

```
app/
  layout.tsx            # шрифты, ThemeProvider, SmoothScroll, Header/Footer
  page.tsx              # главная (image-led home)
  globals.css           # design tokens
  api/lead/route.ts     # POST → Resend + Telegram (только в SSR mode)
  api/og/route.ts       # OG-image generator (SSR only)
  ...slug routes
components/
  smooth-scroll.tsx     # Lenis wrapper (marketing-only — не использовать в дашбордах)
  header.tsx, footer.tsx
  theme-provider.tsx
  draft-banner.tsx
  ...
lib/
  copy/draft-mode.ts    # DRAFT_MODE flag (toggle перед own photoshoot)
public/
  fonts/                # self-hosted woff2 (latin+cyrillic subsets)
```

## Правила

1. **DRAFT_MODE** в `lib/copy/draft-mode.ts` — пока `true` — на всех страницах `<meta robots="noindex">`. Снимать ТОЛЬКО после собственной фотосессии (см. `~/Downloads/_Vault/03-clients/.../LUMO photoshoot`).
2. **Smooth-scroll** через `components/smooth-scroll.tsx` (Lenis) — обёрнут root в `app/layout.tsx`. Lumo — pure marketing, можно. НЕ копировать в дашбордные сервисы.
3. **GH_PAGES=1** для GitHub Pages → static export, форма падает на сети и triggerит fallback-toast в Telegram. Для реальных лидов — Vercel/Railway (см. `DEPLOYMENT.md`).
4. **Шрифты — local woff2**, не Google fonts. Subsets: latin+cyrillic. Single weight per family.
5. **Бренд** — premium liquid metal. Dark-by-default. Палитра — brass/gold accent на deep neutral. Reference сайты: anthropic.com, linear.app (см. `[[DESIGN_SYSTEM_dpa_services]]` §15).
6. Иконки — `lucide-react` only.

## Lead-flow

`POST /api/lead` (только SSR) → Resend mail to `LUMO_LEAD_TO` + Telegram message via `TELEGRAM_BOT_TOKEN` to `LUMO_TG_CHAT_ID`. См. `app/api/lead/route.ts`.

Env (production):
- `RESEND_API_KEY`
- `LUMO_LEAD_TO`, `LUMO_LEAD_FROM`
- `TELEGRAM_BOT_TOKEN`, `LUMO_TG_CHAT_ID`

## Локально

```bash
pnpm install
pnpm dev          # http://localhost:3300
pnpm build        # SSR build
GH_PAGES=1 pnpm build   # static export → out/
pnpm check-draft  # проверка DRAFT_MODE флага
```

## Деплой

См. `DEPLOYMENT.md` — три варианта (Vercel / Railway / GH Pages).

## Связанные регламенты

- `[[DESIGN_SYSTEM_dpa_services]]` — §14.3 (Lenis), §15 (reference-сайты anthropic/linear)
- `[[VIBECODER_ANTIPATTERNS]]` — §2 (component libs cap), §11 (npm prefix)
- `[[CARTE_BLANCHE]]` — карт-бланш в скоупе
- `~/Downloads/_Vault/02-services/lumo/index.md` — operational SSOT

@AGENTS.md
