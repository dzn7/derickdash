import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
          <aside className="border-r border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="px-4 py-4 border-b border-white/10">
              <h1 className="text-lg font-semibold">Edienai Dashboard</h1>
              <p className="text-xs text-white/60">Painel do Proprietário</p>
            </div>
            <nav className="p-3 space-y-1 text-sm">
              <a className="block rounded px-3 py-2 hover:bg-white/5" href="/">Visão Geral</a>
              <a className="block rounded px-3 py-2 hover:bg-white/5" href="/products">Produtos</a>
              <a className="block rounded px-3 py-2 hover:bg-white/5" href="/complements">Complementos</a>
              <a className="block rounded px-3 py-2 hover:bg-white/5" href="/crediarios">Crediários</a>
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
