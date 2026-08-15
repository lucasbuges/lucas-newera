import { Container } from "./container";
import { INSTAGRAM, EMAIL, LINKEDIN } from "@/lib/config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-sm text-subtle">
            © {year} Lucas Moraes. Feito em São Paulo.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-foreground"
            >
              Instagram
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="text-muted transition-colors hover:text-foreground"
            >
              E-mail
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
