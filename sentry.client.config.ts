/**
 * Sentry — client-side init for the LUMO marketing site.
 *
 * Strategy (per RESEARCH_testing_bugfixing_2026 §2.1, §2.2):
 *   - Session Replay enabled at 10% baseline / 100% on error (privacy-first
 *     defaults mask all text by default, important for any RU B2B contact
 *     forms that may carry PII).
 *   - Performance tracing enabled with 10% sampling — enough to drive LCP/CLS
 *     p95 alerts without burning the free-tier quota.
 *   - Release tag wired to `NEXT_PUBLIC_SENTRY_RELEASE` (CI sets it from git
 *     SHA; falls back to "lumo@dev" for local).
 *   - Custom tag `route` is set per-page via the `withSentry` page wrapper.
 *
 * Activation: SENTRY_DSN must be set on Railway. Without DSN this no-ops
 *   (Sentry SDK is import-only safe).
 */

import * as Sentry from "@sentry/nextjs";

const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (DSN) {
  Sentry.init({
    dsn: DSN,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV ?? "production",
    release: process.env.NEXT_PUBLIC_SENTRY_RELEASE ?? "lumo@dev",

    // Performance — RUM (LCP, CLS, INP, FID) per spec §3.2
    tracesSampleRate: 0.1,
    // Session Replay — DOM video preceding errors (spec §2.1)
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Don't send Я.Метрика or 3rd-party noise
    ignoreErrors: [
      "ResizeObserver loop limit exceeded",
      "ResizeObserver loop completed with undelivered notifications.",
      /yandex\.ru\/metrika/,
    ],
    denyUrls: [/mc\.yandex\.ru/, /yastatic\.net/],

    // Per-DSN rate limit: ~170 events/day on free tier (5000/30) — guard
    // a hot-path bug from burning quota in 2 hours (spec §2.1).
    beforeSend(event) {
      // Drop noisy non-error performance pings
      if (event.type === "transaction" && Math.random() > 0.1) return null;
      return event;
    },
  });
}
