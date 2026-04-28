import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * /api/lead — приём заявок с FinalCTA / Contacts / Trade форм.
 * Под капотом — Resend (e-mail) + Telegram bot. Оба опциональны:
 * если соответствующие env-переменные не выставлены, канал просто
 * пропускается, остальное работает. Это нужно, чтобы PR-превью на
 * Vercel или локальный dev не падали в ошибке.
 *
 * Required env (production):
 *   RESEND_API_KEY        — re_xxx (https://resend.com)
 *   LUMO_LEAD_TO          — на какой адрес слать письма (panin.bz@gmail.com)
 *   LUMO_LEAD_FROM        — от какого адреса слать (lumo@verified-domain.ru)
 *   TELEGRAM_BOT_TOKEN    — токен бота
 *   LUMO_TG_CHAT_ID       — chat_id для уведомлений
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  contact: z.string().trim().min(1).max(200).optional(),
  source: z.enum(["home-final-cta", "contacts", "trade"]).default("home-final-cta"),
  // Optional fields — depend on source
  objectType: z.string().max(80).optional(),
  area: z.string().max(40).optional(),
  date: z.string().max(40).optional(),
  studio: z.string().max(120).optional(),
  portfolio: z.string().max(300).optional(),
  email: z.string().email().max(200).optional(),
  phone: z.string().max(60).optional(),
  yearsInTrade: z.string().max(10).optional(),
  objectsPerYear: z.string().max(10).optional(),
  // Honeypot — should be empty if not bot
  hp: z.string().max(0).optional(),
});

export type LeadPayload = z.infer<typeof LeadSchema>;

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&#39;"
  );
}

function escapeMd(s: string) {
  return s.replace(/[_*[\]()~`>#+=|{}.!\\-]/g, "\\$&");
}

function renderEmail(payload: LeadPayload) {
  const lines: string[] = [
    `<p><b>Источник:</b> ${escapeHtml(payload.source)}</p>`,
    `<p><b>Имя:</b> ${escapeHtml(payload.name)}</p>`,
  ];
  if (payload.contact) lines.push(`<p><b>Контакт:</b> ${escapeHtml(payload.contact)}</p>`);
  if (payload.objectType) lines.push(`<p><b>Тип объекта:</b> ${escapeHtml(payload.objectType)}</p>`);
  if (payload.area) lines.push(`<p><b>Площадь:</b> ${escapeHtml(payload.area)} м²</p>`);
  if (payload.date) lines.push(`<p><b>Дата готовности:</b> ${escapeHtml(payload.date)}</p>`);
  if (payload.studio) lines.push(`<p><b>Бюро:</b> ${escapeHtml(payload.studio)}</p>`);
  if (payload.portfolio) lines.push(`<p><b>Портфолио:</b> ${escapeHtml(payload.portfolio)}</p>`);
  if (payload.email) lines.push(`<p><b>Email:</b> ${escapeHtml(payload.email)}</p>`);
  if (payload.phone) lines.push(`<p><b>Телефон:</b> ${escapeHtml(payload.phone)}</p>`);
  if (payload.yearsInTrade) lines.push(`<p><b>Лет в индустрии:</b> ${escapeHtml(payload.yearsInTrade)}</p>`);
  if (payload.objectsPerYear) lines.push(`<p><b>Проектов/год:</b> ${escapeHtml(payload.objectsPerYear)}</p>`);
  return lines.join("\n");
}

function renderTelegram(payload: LeadPayload) {
  const lines: string[] = [
    "🎯 *Новая заявка LUMO*",
    "",
    `*Источник:* ${escapeMd(payload.source)}`,
    `*Имя:* ${escapeMd(payload.name)}`,
  ];
  if (payload.contact) lines.push(`*Контакт:* ${escapeMd(payload.contact)}`);
  if (payload.objectType) lines.push(`*Тип:* ${escapeMd(payload.objectType)}`);
  if (payload.area) lines.push(`*Площадь:* ${escapeMd(payload.area)} м²`);
  if (payload.date) lines.push(`*Дата:* ${escapeMd(payload.date)}`);
  if (payload.studio) lines.push(`*Бюро:* ${escapeMd(payload.studio)}`);
  if (payload.portfolio) lines.push(`*Портфолио:* ${escapeMd(payload.portfolio)}`);
  if (payload.email) lines.push(`*Email:* ${escapeMd(payload.email)}`);
  if (payload.phone) lines.push(`*Телефон:* ${escapeMd(payload.phone)}`);
  return lines.join("\n");
}

async function sendEmail(payload: LeadPayload): Promise<{ ok: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LUMO_LEAD_TO ?? "panin.bz@gmail.com";
  const from = process.env.LUMO_LEAD_FROM ?? "LUMO <onboarding@resend.dev>";
  if (!apiKey) return { ok: false, reason: "RESEND_API_KEY not set" };

  // Lazy-import so build doesn't break if package is unused at call site.
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const subject = `Заявка LUMO — ${payload.objectType ?? payload.source}`;
  const { error } = await resend.emails.send({ from, to, subject, html: renderEmail(payload) });
  return error ? { ok: false, reason: String(error.message ?? error) } : { ok: true };
}

async function sendTelegram(payload: LeadPayload): Promise<{ ok: boolean; reason?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.LUMO_TG_CHAT_ID;
  if (!token || !chatId) return { ok: false, reason: "Telegram env not set" };
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: renderTelegram(payload),
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    return { ok: false, reason: `tg ${res.status}: ${body.slice(0, 160)}` };
  }
  return { ok: true };
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const payload = parsed.data;

  // Honeypot — silent 200 if filled (bot)
  if (payload.hp && payload.hp.length > 0) {
    return NextResponse.json({ ok: true, channels: { honeypot: true } });
  }

  const [emailRes, tgRes] = await Promise.all([sendEmail(payload), sendTelegram(payload)]);

  // If neither channel is configured, we still ack the user but log a warning
  // for ops (visible in Vercel/Railway logs). The form's UI fallback (sonner
  // toast + direct Telegram link) handles "managed: false" states gracefully.
  const managed = emailRes.ok || tgRes.ok;
  if (!managed) {
    console.warn("[lead] no channel configured", { emailRes, tgRes, source: payload.source });
  }

  return NextResponse.json({
    ok: true,
    managed,
    channels: { email: emailRes, telegram: tgRes },
  });
}
