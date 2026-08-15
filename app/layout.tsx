import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE = "https://lucasmoraes.tech";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Lucas Moraes — Conselheiro de IA",
    template: "%s · Lucas Moraes",
  },
  description:
    "Construí os agentes, o copilot e a automação que rodam dentro de iFood, Bradesco, Itaú e mais de 3.000 empresas. Conselho de IA, mentoria 1x1 e in company.",
  openGraph: {
    title: "Lucas Moraes — Conselheiro de IA",
    description:
      "IA em produção, não em piloto. Conselho de IA, mentoria 1x1 e in company.",
    url: SITE,
    siteName: "Lucas Moraes",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Moraes — Conselheiro de IA",
    description:
      "IA em produção, não em piloto. Conselho de IA, mentoria 1x1 e in company.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
