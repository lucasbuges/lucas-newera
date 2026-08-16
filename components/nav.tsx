import Link from "next/link";
import { Container } from "./container";
import { INSTAGRAM, INSTAGRAM_HANDLE, PHOTO_PROFILE } from "@/lib/config";

const LINKS = [
  { href: "#contratar", label: "Cardápio" },
  { href: "#palestras", label: "Palco" },
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
            <img
              src={PHOTO_PROFILE}
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 rounded-full object-cover"
            />
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

          <div className="flex items-center gap-3">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="hidden text-sm text-muted transition-colors hover:text-foreground sm:inline"
            >
              {INSTAGRAM_HANDLE}
            </a>
            <a
              href="#contratar"
              className="rounded-md bg-foreground px-3.5 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Contratar
            </a>
          </div>
        </nav>
      </Container>
    </header>
  );
}
