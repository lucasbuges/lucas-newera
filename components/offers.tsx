import { Container } from "./container";
import { EMAIL } from "@/lib/config";

type Offer = {
  id: string;
  name: string;
  who: string;
  body: string;
  includes: string[];
  format: string;
  featured?: boolean;
};

const OFFERS: Offer[] = [
  {
    id: "1x1",
    name: "Mentoria 1x1",
    who: "Founder e líder de produto",
    body: "Para quem está colocando IA dentro do produto e precisa de alguém que já fez isso chegar em cliente grande. Direto no problema da semana.",
    includes: [
      "Encontros quinzenais de 1 hora",
      "Acesso direto entre as sessões",
      "Revisão de arquitetura e escopo",
      "Roadmap de IA para 90 dias",
    ],
    format: "Recorrente · online",
  },
  {
    id: "incompany",
    name: "Mentoria In Company",
    who: "Times de produto, tech e vendas",
    body: "Formação prática para o time inteiro sair do piloto e entregar IA em produção. Feito sobre o contexto real da empresa, não sobre caso genérico.",
    includes: [
      "Diagnóstico de maturidade em IA",
      "Trilhas para produto, tech e vendas",
      "Workshops de agentes e automação",
      "Plano de implantação com dono e prazo",
    ],
    format: "Programa de 8 a 12 semanas",
  },
  {
    id: "conselho",
    name: "Conselheiro de IA",
    who: "Conselho e C-level",
    body: "Assento consultivo recorrente na estratégia de IA e tecnologia. Participo da decisão com responsabilidade sobre o resultado, não com apresentação de slide.",
    includes: [
      "Reunião mensal de conselho",
      "Decisão de construir, comprar ou integrar",
      "Avaliação de arquitetura e de risco",
      "Governança e uso responsável de IA",
      "Disponibilidade para o C-level",
    ],
    format: "Contrato anual · 3 vagas",
    featured: true,
  },
];

export function Offers() {
  return (
    <section id="ofertas" className="border-b border-border py-24">
      <Container>
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
            Como trabalho
          </span>
          <h2 className="tracking-tighter-display mt-4 text-3xl font-semibold md:text-4xl">
            Três formatos, uma entrega
          </h2>
          <p className="mt-4 text-muted">
            Todos terminam no mesmo lugar: IA rodando em produção, com usuário
            de verdade do outro lado.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {OFFERS.map((offer) => (
            <article
              key={offer.id}
              className={`relative flex flex-col rounded-xl border p-7 transition-colors ${
                offer.featured
                  ? "border-border-strong bg-surface"
                  : "border-border bg-background hover:bg-surface"
              }`}
            >
              {offer.featured && (
                <span className="absolute -top-2.5 left-7 rounded-full bg-foreground px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-background">
                  Programa principal
                </span>
              )}

              <h3 className="text-lg font-medium tracking-tight">
                {offer.name}
              </h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-subtle">
                {offer.who}
              </p>

              <p className="mt-5 text-sm leading-relaxed text-muted">
                {offer.body}
              </p>

              <ul className="mt-7 flex-1 space-y-3 border-t border-border pt-6">
                {offer.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 shrink-0 text-subtle"
                      aria-hidden="true"
                    >
                      <path
                        d="M3.5 8.5l3 3 6-7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="leading-snug text-muted">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 border-t border-border pt-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
                  {offer.format}
                </p>
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(offer.name)}`}
                  className={`mt-4 flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-all ${
                    offer.featured
                      ? "bg-foreground text-background hover:opacity-85"
                      : "border border-border-strong hover:bg-surface-hover"
                  }`}
                >
                  Aplicar
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
