import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DraftBanner } from "@/components/draft-banner";
import { LenisProvider } from "@/components/lenis-provider";
import { DRAFT_MODE } from "@/lib/copy/draft-mode";
import { Toaster } from "sonner";
import "./globals.css";

// Phase 3 — self-hosted WOFF2 with cyrillic+latin subsets in /public/fonts/.
// Single weight per family (the one we actually render); CSS will fall back to
// the variable family for any non-loaded weights.
const unbounded = localFont({
  src: "../public/fonts/Unbounded-Bold.woff2",
  weight: "700",
  variable: "--font-unbounded",
  display: "swap",
});

const cormorant = localFont({
  src: [
    { path: "../public/fonts/CormorantGaramond-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/CormorantGaramond-BoldItalic.woff2", weight: "700", style: "italic" },
    { path: "../public/fonts/CormorantGaramond-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "../public/fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Inter-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const mono = localFont({
  src: "../public/fonts/JetBrainsMono-Regular.woff2",
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

const BASE_URL =
  process.env.GH_PAGES === "1"
    ? "https://paninbz-debug.github.io/Lumo"
    : "https://lumo.studio";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "LUMO — Премиум-студия применения жидкого металла | Партнёр AuraMetal",
    template: "%s",
  },
  description:
    "Atelier LUMO — мастерская применения жидкого металла на стенах, фасадах и мебели. Латунь, медь, бронза, никель, алюминий. Москва, по предварительной записи. Партнёр AuraMetal.",
  keywords: [
    "жидкий металл",
    "AuraMetal",
    "LUMO",
    "премиум интерьер",
    "латунь на стенах",
    "медное покрытие",
    "бронза в интерьере",
    "Москва",
  ],
  openGraph: {
    title: "LUMO — жидкий металл, нанесённый как ремесло",
    description: "Разница не в банке. Разница в руках.",
    locale: "ru_RU",
    type: "website",
    siteName: "LUMO",
    images: [
      {
        url: "/api/og?title=Жидкий металл, нанесённый как ремесло&subtitle=Разница не в банке. Разница в руках.",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMO — жидкий металл, нанесённый как ремесло",
    description: "Разница не в банке. Разница в руках.",
    images: [
      "/api/og?title=Жидкий металл, нанесённый как ремесло&subtitle=Разница не в банке. Разница в руках.",
    ],
  },
  // Phase 3.6 — пока DRAFT_MODE включён, ничего не индексируем.
  // После своей фотосессии и снятия флага вернётся {index:true, follow:true}.
  robots: DRAFT_MODE
    ? { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } }
    : { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${unbounded.variable} ${cormorant.variable} ${inter.variable} ${mono.variable}`}
    >
      {DRAFT_MODE && (
        <head>
          {/* Global noindex while DRAFT_MODE — applies to every route regardless
             of its own metadata.robots override. */}
          <meta name="robots" content="noindex, nofollow, nocache, noarchive" />
        </head>
      )}
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <LenisProvider>
            <a href="#main-content" className="skip-to-content">Перейти к содержимому</a>
            <DraftBanner />
            <Header />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
            <Toaster
              position="bottom-right"
              theme="dark"
              toastOptions={{
                style: {
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-strong)",
                  fontFamily: "var(--font-inter), sans-serif",
                },
              }}
            />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
