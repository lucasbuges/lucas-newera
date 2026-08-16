import { Container } from "./container";
import {
  EMAIL,
  INSTAGRAM,
  INSTAGRAM_HANDLE,
  WHATSAPP_DISPLAY,
} from "@/lib/config";
import { whatsappHref } from "@/lib/whatsapp";

export function Contact() {
  return (
    <section id="contato" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[320px] w-[720px] -translate-x-1/2 translate-y-1/3 rounded-full bg-white/[0.05] blur-[120px]" />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="tracking-tighter-display text-4xl font-semibold md:text-5xl">
            Ou só me chama
          </h2>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted">
            Dúvida antes de escolher no cardápio? Me conta o contexto. Respondo
            se faz sentido — inclusive quando a resposta é não.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappHref("Vim do site. Quero falar sobre contratação.")}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              WhatsApp · {WHATSAPP_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-md border border-border-strong px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface-hover"
            >
              {EMAIL}
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-border-strong px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface-hover"
            >
              {INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
