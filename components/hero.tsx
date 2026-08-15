import { Container } from "./container";

const CLIENTS = ["iFood", "Bradesco", "Itaú", "Samba Mobile", "CCEE", "ZUP"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="grid-backdrop pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[130px]" />

      <Container className="relative">
        <div className="rise flex flex-col items-start pt-24 pb-16 md:pt-32">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            3 vagas de conselho em 2026
          </span>

          <h1 className="tracking-tighter-display max-w-4xl text-5xl font-semibold leading-[1.04] md:text-[64px]">
            Conselheiro de IA.
            <br />
            <span className="text-subtle">
              IA em produção,
              <br className="hidden sm:block" /> não em piloto.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
            Construí os agentes, o copilot e a automação que rodam dentro de{" "}
            <span className="text-foreground">iFood</span>,{" "}
            <span className="text-foreground">Bradesco</span>,{" "}
            <span className="text-foreground">Itaú</span> e mais de 3.000
            empresas. Hoje sento no conselho e com times que precisam tirar IA
            do slide e colocar dentro do produto.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#ofertas"
              className="rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Como posso ajudar
            </a>
            <a
              href="#contato"
              className="rounded-md border border-border-strong px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface-hover"
            >
              Falar comigo
            </a>
          </div>
        </div>

        <div className="relative border-t border-border py-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
            IA que eu construí, rodando em produção
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-4">
            {CLIENTS.map((client) => (
              <span
                key={client}
                className="text-lg font-medium tracking-tight text-subtle transition-colors hover:text-muted"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
