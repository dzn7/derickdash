import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Owner Dashboard",
  description: "Edienai - Owner Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-dvh grid grid-cols-[240px_1fr]">
          <aside className="border-r border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="px-4 py-4 border-b border-white/10">
              <h1 className="text-lg font-semibold">Edienai Dashboard</h1>
              <p className="text-xs text-white/60">Painel do Proprietário</p>
            </div>
            <nav className="p-3 space-y-1 text-sm">
              <Link className="flex items-center gap-2 rounded px-3 py-2 hover:bg-white/5" href="/">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/80" aria-hidden>
                  <path d="M3 12l9-9 9 9"/><path d="M9 21V9h6v12"/>
                </svg>
                Visão Geral
              </Link>
              <Link className="flex items-center gap-2 rounded px-3 py-2 hover:bg-white/5" href="/products">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/80" aria-hidden>
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
                Produtos
              </Link>
              <Link className="flex items-center gap-2 rounded px-3 py-2 hover:bg-white/5" href="/complements">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/80" aria-hidden>
                  <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.51-1 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.63 0 1.2.25 1.62.66"/>
                </svg>
                Complementos
              </Link>
              <Link className="flex items-center gap-2 rounded px-3 py-2 hover:bg-white/5" href="/crediarios">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/80" aria-hidden>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Crediários
              </Link>
            </nav>
          </aside>
          <main className="p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
