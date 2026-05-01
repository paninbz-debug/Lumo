/**
 * Sentry — edge runtime (middleware, /api/og). Lighter sampling than server
 * because the edge surface is mostly cached.
 */

import * as Sentry from "@sentry/nextjs";

const DSN = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;

if (DSN) {
  Sentry.init({
    dsn: DSN,
    environment: process.env.RAILWAY_ENVIRONMENT ?? "production",
    release: process.env.SENTRY_RELEASE ?? process.env.NEXT_PUBLIC_SENTRY_RELEASE ?? "lumo@dev",
    tracesSampleRate: 0.1,
  });
}
