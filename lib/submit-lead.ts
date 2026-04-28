import { toast } from "sonner";

export type LeadSource = "home-final-cta" | "contacts" | "trade";

const TELEGRAM_FALLBACK = "https://t.me/lumo_studio";

/**
 * Унифицированный submit для всех форм заявок. Делает POST на /api/lead.
 * При network/server-fail — показывает toast с прямой ссылкой на Telegram,
 * чтобы клиент мог достучаться даже если бэкенд лежит.
 */
export async function submitLead(form: HTMLFormElement, source: LeadSource): Promise<boolean> {
  const fd = new FormData(form);
  const payload: Record<string, string> = { source };
  fd.forEach((v, k) => {
    if (typeof v === "string" && v.trim().length) payload[k] = v.trim();
  });

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`status ${res.status} ${detail.slice(0, 120)}`);
    }
    const data = (await res.json()) as { ok?: boolean; managed?: boolean };
    if (!data.ok) throw new Error("server returned not-ok");
    if (data.managed === false) {
      // Бэкенд жив, но каналы не настроены — на dev/preview без env
      toast.success("Заявка принята. Менеджер ответит за 1 час.", {
        description: "Уведомления о канале связи ещё подключаются.",
      });
    } else {
      toast.success("Заявка принята.", {
        description: "Менеджер ответит за 1 час в рабочее время.",
      });
    }
    form.reset();
    return true;
  } catch (err) {
    console.warn("[submit-lead] failed", err);
    toast.error("Не удалось отправить заявку.", {
      description: "Напишите нам напрямую в Telegram — ответим быстрее.",
      action: {
        label: "Открыть Telegram",
        onClick: () => window.open(TELEGRAM_FALLBACK, "_blank", "noopener"),
      },
      duration: 12000,
    });
    return false;
  }
}
