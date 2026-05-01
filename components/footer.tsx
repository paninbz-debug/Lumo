import Link from "next/link";
import { FOOTER, NAV } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative mt-40 border-t border-[color:var(--border)] bg-[color:var(--bg-elevated)]">
      <div className="container-lumo py-24 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
        <div className="md:col-span-1">
          <div className="font-[family-name:var(--font-unbounded)] font-black text-2xl tracking-[0.2em] text-[color:var(--text-primary)]">
            LUMO
          </div>
          <p className="mt-4 text-sm text-[color:var(--text-secondary)] leading-relaxed max-w-xs">
            Atelier — применение жидкого металла. Партнёр AuraMetal.
          </p>
          <div className="mt-7 space-y-2 font-[family-name:var(--font-mono)] text-[13px] text-[color:var(--text-secondary)]">
            <div>{FOOTER.contacts.city}</div>
            <div>
              {FOOTER.contacts.phone}
              {FOOTER.contacts.phoneTodo && (
                <span className="ml-2 text-[color:var(--text-muted)]">[TODO]</span>
              )}
            </div>
            <div>
              <a
                href={`mailto:${FOOTER.contacts.email}`}
                className="hover:text-[color:var(--accent-brass)] transition-colors"
              >
                {FOOTER.contacts.email}
              </a>
              {FOOTER.contacts.emailTodo && (
                <span className="ml-2 text-[color:var(--text-muted)]">[TODO]</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-5">
            Меню
          </div>
          <ul className="space-y-3">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--accent-brass)] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-5">
            Соцсети
          </div>
          <ul className="space-y-3">
            <li>
              <a
                href={FOOTER.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--accent-brass)] transition-colors"
              >
                Telegram
                {FOOTER.social.todo && (
                  <span className="ml-2 text-[color:var(--text-muted)] font-[family-name:var(--font-mono)] text-[11px]">
                    [TODO]
                  </span>
                )}
              </a>
            </li>
            <li>
              <a
                href={FOOTER.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--accent-brass)] transition-colors"
              >
                Instagram
                {FOOTER.social.todo && (
                  <span className="ml-2 text-[color:var(--text-muted)] font-[family-name:var(--font-mono)] text-[11px]">
                    [TODO]
                  </span>
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--border)]">
        <div className="container-lumo py-6 grid grid-cols-1 md:grid-cols-12 gap-3 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.05em] text-[color:var(--text-muted)]">
          <div className="md:col-span-8 leading-relaxed">
            Фото на сайте — временные иллюстрации (Unsplash, free for commercial use). Объекты на&nbsp;кадрах не выполнены студией LUMO. После собственной фотосессии заменим.{" "}
            <Link
              href="/credits"
              className="underline decoration-dotted underline-offset-4 hover:text-[color:var(--accent-brass)] transition-colors"
            >
              Атрибуция и&nbsp;источники
            </Link>
          </div>
          <div className="md:col-span-4 md:text-right">
            <span className="block">{FOOTER.legal}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
