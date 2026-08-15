import { Container } from "./container";
import { INSTAGRAM, AUDIENCE } from "@/lib/config";

const THEMES = [
  "Por que o piloto de IA funciona e a versão em produção não",
  "Agente vertical: o que ele resolve que um chatbot não resolve",
  "Construir, comprar ou integrar — como decidir sem refazer em um ano",
  "O que segurança e jurídico perguntam antes de aprovar IA na empresa",
];

export function Writing() {
  return (
    <section id="escrita" className="border-b border-border py-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
              Conteúdo
            </span>
            <h2 className="tracking-tighter-display mt-4 text-3xl font-semibold md:text-4xl">
              IA sem hype e sem manual
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-muted">
              {AUDIENCE} de pessoas acompanham. Falo de inteligência artificial
              aplicada de verdade: o que funciona em produção, o que só funciona
              em demonstração, e o que aprendi colocando agentes na frente de
              cliente grande.
            </p>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-md border border-border-strong px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface-hover"
            >
              @lucasmoraes.ai
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5.5 3h7.5v7.5M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <ul className="space-y-px self-start overflow-hidden rounded-xl border border-border bg-border">
            {THEMES.map((theme, i) => (
              <li
                key={theme}
                className="flex items-start gap-4 bg-background p-6 transition-colors hover:bg-surface"
              >
                <span className="font-mono text-xs text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed">{theme}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
