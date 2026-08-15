import { Container } from "./container";

const SERVICES = [
  {
    title: "Receita recorrente que se sustenta",
    body: "Precificação, retenção e unit economics. A maior parte das empresas não tem problema de venda — tem problema de cliente que entra e some antes de pagar o custo de aquisição.",
    points: ["Modelo de preço por valor", "Coorte e ativação", "Margem bruta real"],
  },
  {
    title: "Vendas enterprise",
    body: "Ciclo longo, procurement, jurídico, contrato plurianual. Vendi para empresas de tecnologia, educação, energia e mercado financeiro — e aprendi onde esse funil trava.",
    points: ["Entrada em grandes contas", "Negociação e renovação", "Expansão dentro da base"],
  },
  {
    title: "IA aplicada a produto",
    body: "Onde IA vira receita e onde vira só conta de infraestrutura. A diferença raramente é técnica — é de escopo e de precificação.",
    points: ["Escopo do que vale construir", "Custo por uso sob controle", "Do piloto ao contrato"],
  },
];

export function Work() {
  return (
    <section id="trabalho" className="border-b border-border py-24">
      <Container>
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
            Trabalho
          </span>
          <h2 className="tracking-tighter-display mt-4 text-3xl font-semibold md:text-4xl">
            Três frentes, e todas terminam em caixa
          </h2>
          <p className="mt-4 text-muted">
            Não faço diagnóstico bonito. Trabalho no número que muda a conta do
            fim do mês.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="flex flex-col bg-background p-7 transition-colors hover:bg-surface"
            >
              <h3 className="text-base font-medium leading-snug">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {service.body}
              </p>
              <ul className="mt-6 space-y-2 border-t border-border pt-5">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2.5 text-sm text-subtle"
                  >
                    <span className="h-1 w-1 rounded-full bg-subtle" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
