import type { Metadata } from "next";
import { Phone, MessageCircle, Send, Mail, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/reveal";
import { FinalCta } from "@/components/sections/final-cta";
import { CONTACTS_PAGE } from "@/lib/copy/contacts";
import { draftRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Контакты — Москва, по предварительной записи | LUMO",
  description:
    "Шоурум в Москве по предварительной записи. WhatsApp, Telegram, e-mail. Менеджер ответит за 1 час в рабочее время.",
  robots: draftRobots,
  alternates: { canonical: "/contacts" },
};

const CHANNEL_ICONS = {
  phone: Phone,
  telegram: Send,
  whatsapp: MessageCircle,
  email: Mail,
} as const;

export default function ContactsPage() {
  return (
    <>
      <PageHero
        label={CONTACTS_PAGE.hero.label}
        title={CONTACTS_PAGE.hero.title}
        lead={CONTACTS_PAGE.hero.lead}
      />

      <section className="py-16 md:py-24">
        <div className="container-lumo grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          <Reveal className="md:col-span-5">
            <div className="rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] p-7">
              <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                Шоурум
              </div>
              <h2 className="mt-4 font-[family-name:var(--font-unbounded)] font-medium text-[22px] md:text-[26px] text-[color:var(--text-primary)]">
                Москва, по записи
              </h2>
              <ul className="mt-6 space-y-4 text-[14px] text-[color:var(--text-secondary)]">
                <li className="flex items-start gap-3">
                  <MapPin size={18} aria-hidden className="mt-0.5 shrink-0 text-[color:var(--accent-brass)]" />
                  <span>
                    {CONTACTS_PAGE.showroom.address}
                    {CONTACTS_PAGE.showroom.addressTodo && (
                      <span className="ml-2 font-[family-name:var(--font-mono)] text-[10px] text-[color:var(--text-muted)]">
                        [TODO]
                      </span>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={18} aria-hidden className="mt-0.5 shrink-0 text-[color:var(--accent-brass)]" />
                  <span>{CONTACTS_PAGE.showroom.hours}</span>
                </li>
                <li className="text-[color:var(--text-muted)] text-[13px]">
                  {CONTACTS_PAGE.showroom.metro}
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal className="md:col-span-7" delay={0.05}>
            <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Каналы связи
            </div>
            <h2 className="mt-4 font-[family-name:var(--font-unbounded)] font-medium text-[22px] md:text-[26px] text-[color:var(--text-primary)]">
              Где нас можно найти
            </h2>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CONTACTS_PAGE.channels.map((c) => {
                const Icon = CHANNEL_ICONS[c.kind as keyof typeof CHANNEL_ICONS] ?? Phone;
                const Tag = c.url ? "a" : "div";
                return (
                  <li key={c.label}>
                    <Tag
                      href={c.url}
                      target={c.url?.startsWith("http") ? "_blank" : undefined}
                      rel={c.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] px-5 py-4 hover:border-[color:var(--accent-brass)] transition-colors"
                    >
                      <Icon size={18} aria-hidden className="text-[color:var(--accent-brass)]" />
                      <span className="text-[14px] text-[color:var(--text-primary)]">
                        {c.label}
                      </span>
                      {c.todo && (
                        <span className="ml-auto font-[family-name:var(--font-mono)] text-[10px] text-[color:var(--text-muted)]">
                          [TODO]
                        </span>
                      )}
                    </Tag>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[color:var(--text-muted)] leading-relaxed max-w-[640px]">
              Реальные номера и адрес шоурума будут опубликованы при готовности
              физической площадки. До этого момента — связь по WhatsApp / Telegram
              и встреча по адресу проекта.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
