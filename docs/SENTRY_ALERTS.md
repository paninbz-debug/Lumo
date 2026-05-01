# LUMO — Sentry alert rules

Источник: `RESEARCH_testing_bugfixing_2026.md` §2.1 + Sprint 15 LUMO scope.

> Эти правила настраиваются в Sentry UI (`Alerts → Create Alert`), они **не**
> кодируются в репо. Если DSN ещё не выпущен — создать проект `lumo-web` в
> Sentry organization (`one-per-app` policy, спека §2.1), скопировать DSN в
> Railway env: `SENTRY_DSN` + `NEXT_PUBLIC_SENTRY_DSN`. После деплоя alerts —
> по списку ниже.

## Активация в одном проекте Sentry

```
Project name:    lumo-web
Platform:        Next.js
Environment:     production / preview / development
Release:         {SENTRY_RELEASE} = {git short sha}
DSN env vars:    SENTRY_DSN, NEXT_PUBLIC_SENTRY_DSN
Rate limit:      170 events/day per DSN (free tier ÷ 30)
```

---

## Alert 1 — Server 5xx rate

**Rule type:** Issue Alert · `event.error_5xx_rate`

```
Condition:   error_rate > 1.0% in any 5-minute window
Filter:      transaction:"/api/*"  AND  level:error  AND  environment:production
Action:      Telegram (LUMO ops chat) + email panin.bz@gmail.com
Cooldown:    30 минут (don't re-fire on the same incident)
```

**Why:** `/api/lead` is the only billable customer path; 5xx = lost lead.
**MTTA target:** 5 минут.
**Recovery:** auto-revert via Railway one-click rollback (spec §2.6 — Revert > forward-fix).

## Alert 2 — Frontend perf p95 LCP/CLS regression

**Rule type:** Metric Alert · Performance metrics

```
Condition A:   p95(measurements.lcp)  > 2500 ms  on production for 10m
Condition B:   p95(measurements.cls)  > 0.1               for 10m
Filter:        transaction:"/" OR transaction:/collections* OR transaction:/applications*
Action:        Telegram alert (no email — perf regressions are not "deal-flow"-critical)
```

**Why:** Premium-brand spec (RESEARCH_premium_brand_2026_lumo §9.13) calls
"тяжёлый bundle / scroll-jank" anti-premium. Sentry RUM (Web Vitals) is the
free, in-stack monitor for this — Datadog RUM is санкционно-проблематичен
для РФ-аудитории (spec §3.2).

**Baseline targets** (Apr 2026 measured on Railway prod):
- LCP p95 ≤ 2.5s on `/`
- CLS p95 ≤ 0.1
- INP p95 ≤ 200ms

If breached **and** the regression coincides with a recent release tag,
hot-revert via `git revert HEAD && git push` (one click).

## Alert 3 — Broken-link / CTA monitor

**Rule type:** Synthetic — Better Stack uptime monitor (or cron-job.org if free
tier preferred). NOT a Sentry rule, runs out-of-band.

```
Monitor URL:        https://lumo-production-a4a7.up.railway.app/
Probe:              GET 200, body must contain "Заказать выкрас"
Interval:           5 минут
Locations:          Frankfurt + Stockholm (closest non-РФ PoPs per spec §3.1)
Notification:       Telegram via bot @lumo_ops_bot
Escalation:         after 3 consecutive failures
```

Plus 3 deep-link checks (cron-job.org daily):
- `/contacts` returns 200
- `/collections/deep-mirror` returns 200
- `/api/lead` POST with name="probe" returns 200 ok:true

This catches:
- 404'd CTAs after a route refactor (e.g. someone renaming `/contacts` → `/contact`)
- DNS / cert expiry on Railway custom domain
- Catastrophic build failures that produced a deployable but broken bundle

---

## Custom tags emitted on every event (spec §2.2)

| Tag | Source | Use |
|---|---|---|
| `route` | Next.js pathname (set in `app/layout.tsx` via `Sentry.setTag`) | "all errors on /collections/*" |
| `release` | git short SHA from CI / Railway build | "errors after release abc123" |
| `environment` | `RAILWAY_ENVIRONMENT` / `NODE_ENV` | filter prod vs preview |
| `service` | constant `"lumo-web"` | one tag if/when we add lumo-api |

**Anti-pattern reminder:** never set `Sentry.setUser({ email })` on the lumo
marketing site — there is no logged-in user. Use anonymous fingerprint (set
by SDK) and let server-side `/api/lead` events carry only the `source` tag.

## Postmortem trigger

Any SEV-1 / SEV-2 incident on this site (defined in `docs/POSTMORTEM_TEMPLATE.md`)
must produce a 1-page blameless postmortem within 24 часов — see template.
