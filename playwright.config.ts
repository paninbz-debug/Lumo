import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for LUMO. Sprint 15 — testing & observability.
 *
 * Strategy (per RESEARCH_testing_bugfixing_2026 §1.1, §3.4):
 *   E2E covers ONE happy path of the marketing landing — from hero
 *   render through magnetic CTA click and final lead form submit.
 *   Everything else lives in unit/integration tests (Vitest).
 *
 * Run modes:
 *   pnpm test:e2e            – local, against `next dev` (auto-spawned)
 *   pnpm test:e2e:critical   – tagged @critical only (CI smoke)
 *   PLAYWRIGHT_BASE_URL=https://lumo-production-a4a7.up.railway.app pnpm test:e2e
 *                            – synthetic monitor against prod
 */

const PORT = process.env.PORT ?? "3300";
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${PORT}`;
const isExternal = !BASE_URL.includes("127.0.0.1") && !BASE_URL.includes("localhost");

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    /* Defeat Я.Метрика hits in tests — spec §3.6 */
    extraHTTPHeaders: { "X-Test-Run": "playwright" },
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    {
      name: "chromium-mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
  /* Spin up `next dev` automatically when running locally; skip for synthetic. */
  webServer: isExternal
    ? undefined
    : {
        command: `pnpm exec next dev --turbopack -H 127.0.0.1 -p ${PORT}`,
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        stdout: "ignore",
        stderr: "pipe",
      },
});
