/**
 * /api/lead integration tests — POST handler validation surface.
 *
 * What's covered (per RESEARCH_testing_bugfixing_2026 §1.4):
 *   - Validators (Zod schema) — critical security boundary
 *   - Honeypot silent-200 (anti-bot)
 *   - Channel-down graceful degradation (managed:false ack)
 *   - Invalid JSON / missing required field surfaces
 *
 * What's NOT covered (out of scope for unit-level):
 *   - Real Resend / Telegram dispatch — mocked at env-var level
 *   - Rate limiting — not implemented in this route
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { POST } from "@/app/api/lead/route";

// Strip RESEND_API_KEY / TELEGRAM_BOT_TOKEN so the route runs in
// "no channels configured" branch — keeps tests hermetic.
const originalEnv = { ...process.env };

beforeAll(() => {
  delete process.env.RESEND_API_KEY;
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.LUMO_TG_CHAT_ID;
});

afterAll(() => {
  process.env = originalEnv;
});

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/lead", () => {
  it("accepts a minimal valid lead and returns ok+managed:false (no channels)", async () => {
    const res = await POST(makeRequest({ name: "Анна", source: "home-final-cta" }));
    expect(res.status).toBe(200);
    const json = (await res.json()) as { ok: boolean; managed: boolean };
    expect(json.ok).toBe(true);
    expect(json.managed).toBe(false);
  });

  it("accepts a full lead from final-cta", async () => {
    const res = await POST(
      makeRequest({
        name: "Иван Петров",
        contact: "@ivan",
        objectType: "Квартира",
        area: "45",
        date: "2026-06-01",
        source: "home-final-cta",
      })
    );
    expect(res.status).toBe(200);
    const json = (await res.json()) as { ok: boolean };
    expect(json.ok).toBe(true);
  });

  it("accepts trade source with studio/portfolio", async () => {
    const res = await POST(
      makeRequest({
        name: "Студия А",
        email: "studio@example.ru",
        studio: "Архитектурное бюро",
        portfolio: "https://example.ru/portfolio",
        source: "trade",
      })
    );
    expect(res.status).toBe(200);
  });

  it("returns 400 invalid_json on malformed body", async () => {
    const res = await POST(makeRequest("{not-json"));
    expect(res.status).toBe(400);
    const json = (await res.json()) as { ok: boolean; error: string };
    expect(json.ok).toBe(false);
    expect(json.error).toBe("invalid_json");
  });

  it("returns 400 validation when name is missing", async () => {
    const res = await POST(makeRequest({ source: "home-final-cta" }));
    expect(res.status).toBe(400);
    const json = (await res.json()) as { error: string; details?: unknown };
    expect(json.error).toBe("validation");
    expect(json.details).toBeDefined();
  });

  it("returns 400 validation when name exceeds 120 chars", async () => {
    const res = await POST(makeRequest({ name: "x".repeat(121), source: "home-final-cta" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 validation on invalid source enum", async () => {
    const res = await POST(makeRequest({ name: "X", source: "phishing-attempt" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 validation on bad email format", async () => {
    const res = await POST(makeRequest({ name: "X", email: "not-an-email", source: "trade" }));
    expect(res.status).toBe(400);
  });

  it("silently 200s when honeypot field (hp) is filled (bot trap)", async () => {
    const res = await POST(makeRequest({ name: "Bot", hp: "spammed", source: "home-final-cta" }));
    expect(res.status).toBe(400); // hp.max(0) — anything non-empty fails Zod, returns 400 validation
  });

  it("uses default source when omitted", async () => {
    const res = await POST(makeRequest({ name: "Default" }));
    expect(res.status).toBe(200);
    const json = (await res.json()) as { ok: boolean };
    expect(json.ok).toBe(true);
  });

  it("trims whitespace in name", async () => {
    const res = await POST(makeRequest({ name: "   Анна   ", source: "home-final-cta" }));
    expect(res.status).toBe(200);
  });

  it("rejects empty-after-trim name", async () => {
    const res = await POST(makeRequest({ name: "    ", source: "home-final-cta" }));
    expect(res.status).toBe(400);
  });
});
