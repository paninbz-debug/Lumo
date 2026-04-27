import type { Metadata } from "next";
import { Unbounded, Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUMO — Премиум-студия применения жидкого металла | Партнёр AuraMetal",
  description:
    "Премиальное применение жидкого металла на стенах, фасадах и мебели. Латунь, медь, бронза, никель, алюминий. Москва, по предварительной записи. Партнёр AuraMetal.",
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
  },
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
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <Header />
          <main className="flex-1">{children}</main>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
