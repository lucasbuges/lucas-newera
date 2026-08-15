import { Container } from "./container";

const STATS = [
  { value: "+3.000", label: "empresas usando o que eu construí" },
  { value: "7", label: "produtos de software levados ao mercado" },
  { value: "12", label: "anos construindo tecnologia B2B" },
  { value: "24,7 mil", label: "pessoas acompanhando no Instagram" },
];

export function TrackRecord() {
  return (
    <section id="trajetoria" className="border-b border-border py-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_420px] lg:gap-20">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
              Quem fala
            </span>
            <h2 className="tracking-tighter-display mt-4 text-3xl font-semibold md:text-4xl">
              Construí a IA antes de falar sobre ela
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              <p>
                Fundei uma plataforma de IA e educação corporativa e passei doze
                anos nela. Sete produtos no mercado: LMS, LXP, agentes verticais,
                copilot, chat e automação — rodando em produção dentro de iFood,
                Bradesco, Itaú e mais de três mil empresas.
              </p>
              <p>
                Isso significa ter passado por tudo que separa uma demo de um
                contrato: segurança, jurídico, procurement, integração com
                sistema legado, consumo sob controle e time treinado para
                operar.
              </p>
              <p>
                Sou também mentor de IA na{" "}
                <span className="text-foreground">JD Business Academy</span> e
                conselheiro de empresas que estão decidindo onde apostar em
                inteligência artificial.
              </p>
            </div>
          </div>

          <div className="grid gap-px self-start overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-background p-7">
                <div className="tracking-tighter-display text-3xl font-semibold">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm leading-snug text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
