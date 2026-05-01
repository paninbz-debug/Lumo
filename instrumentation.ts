/**
 * Next.js instrumentation hook — fans out Sentry init per runtime.
 * Required by @sentry/nextjs to bind the right config (server vs edge).
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  } else if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}
