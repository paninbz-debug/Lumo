/**
 * Sentry — server-side init (Next.js Node runtime).
 *
 * Captures /api/lead 5xx errors for the alert rule "5xx rate > 1% over 5m".
 * tracesSampleRate is higher here than client because server-side traces are
 * cheaper (no replay) and we want full visibility on lead-form errors.
 */

import * as Sentry from "@sentry/nextjs";

const DSN = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;

if (DSN) {
  Sentry.init({
    dsn: DSN,
    environment: process.env.RAILWAY_ENVIRONMENT ?? process.env.NODE_ENV ?? "production",
    release: process.env.SENTRY_RELEASE ?? process.env.NEXT_PUBLIC_SENTRY_RELEASE ?? "lumo@dev",

    tracesSampleRate: 0.5,

    // Per spec §2.2 — tag every event with the route for grouping.
    initialScope: {
      tags: {
        runtime: "node",
        service: "lumo-web",
      },
    },
  });
}
