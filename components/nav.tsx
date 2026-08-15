import Link from "next/link";
import { Container } from "./container";

const LINKS = [
  { href: "#ofertas", label: "Como trabalho" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#trajetoria", label: "Quem fala" },
  { href: "#escrita", label: "Conteúdo" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <Container>
        <nav className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-sm font-medium tracking-tight"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-foreground text-[11px] font-semibold text-background">
              L
            </span>
            Lucas Moraes
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contato"
            className="rounded-md bg-foreground px-3.5 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            Conversar
          </a>
        </nav>
      </Container>
    </header>
  );
}
