import { Container } from "./container";

const AREAS = [
  {
    title: "Agentes de IA em produção",
    body: "Agentes verticais que executam tarefa real dentro da operação do cliente — não demo. O que quebra em escala, e o que fazer quando o modelo erra na frente do usuário.",
  },
  {
    title: "IA dentro de produto SaaS",
    body: "Copilot, assistente e geração dentro de um produto que já tem cliente pagando. Onde a IA vira funcionalidade que sustenta preço e onde vira enfeite.",
  },
  {
    title: "Automação de processo",
    body: "Fluxos que tiram trabalho repetitivo do time. Integração entre sistemas, orquestração e o desenho que faz a automação sobreviver ao primeiro mês.",
  },
  {
    title: "IA em educação corporativa",
    body: "Doze anos de LMS e LXP, agora com IA no meio: trilha adaptativa, tutor, avaliação automática e conteúdo gerado com curadoria.",
  },
  {
    title: "Construir, comprar ou integrar",
    body: "A decisão que define os próximos dois anos de roadmap. Quando usar API de terceiro, quando treinar, e quando a resposta é simplesmente não fazer.",
  },
  {
    title: "IA que escala sem estourar",
    body: "Arquitetura, escolha de modelo e controle de consumo. IA cobrada por uso precisa de desenho para crescer com o cliente, não contra ele.",
  },
];

export function Expertise() {
  return (
    <section id="especialidades" className="border-b border-border py-24">
      <Container>
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
            Especialidades
          </span>
          <h2 className="tracking-tighter-display mt-4 text-3xl font-semibold md:text-4xl">
            IA aplicada, do escopo ao contrato
          </h2>
          <p className="mt-4 text-muted">
            Não é teoria de consultor. É o que eu construí, coloquei em produção
            e vendi para empresa grande.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((area) => (
            <div
              key={area.title}
              className="bg-background p-7 transition-colors hover:bg-surface"
            >
              <h3 className="text-base font-medium">{area.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {area.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
