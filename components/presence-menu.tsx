"use client";

import { useMemo, useState } from "react";
import {
  OFFERS,
  offerCheckoutHref,
  type Offer,
  type OfferGroup,
} from "@/lib/config";
import { formatBRL } from "@/lib/whatsapp";
import { Container } from "./container";

const GROUPS: { id: OfferGroup; label: string; note: string }[] = [
  {
    id: "continuo",
    label: "Contínuo",
    note: "Presença mensal. Relação, não projeto.",
  },
  {
    id: "evento",
    label: "Evento",
    note: "Uma data. Palco ou sala.",
  },
];

function priceFor(offer: Offer, fullDay: boolean) {
  if (offer.id === "workshop" && fullDay && offer.amountAlt) {
    return { amount: offer.amountAlt, cadence: offer.cadenceAlt || offer.cadence };
  }
  return { amount: offer.amount, cadence: offer.cadence };
}

function MenuRow({
  offer,
  index,
  active,
  fullDay,
  onSelect,
}: {
  offer: Offer;
  index: number;
  active: boolean;
  fullDay: boolean;
  onSelect: () => void;
}) {
  const { amount, cadence } = priceFor(offer, fullDay);
  const seatsLeft =
    offer.seats != null ? offer.seats.total - offer.seats.taken : null;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group w-full border-b border-border px-1 py-5 text-left transition-colors ${
        active ? "bg-surface" : "hover:bg-surface/60"
      }`}
    >
      <div className="flex items-baseline gap-3">
        <span className="w-7 shrink-0 font-mono text-[11px] text-subtle">
          {String(index).padStart(2, "0")}
        </span>
        <span
          className={`min-w-0 flex-1 text-lg tracking-tight sm:text-xl ${
            active ? "font-medium text-foreground" : "text-muted group-hover:text-foreground"
          }`}
        >
          {offer.name}
          {offer.featured && (
            <span className="ml-2 align-middle font-mono text-[10px] uppercase tracking-widest text-subtle">
              principal
            </span>
          )}
        </span>
        <span
          className="hidden h-px min-w-8 flex-1 border-b border-dotted border-border-strong sm:block"
          aria-hidden
        />
        <span className="shrink-0 text-right">
          <span className="text-base font-medium tracking-tight sm:text-lg">
            {formatBRL(amount)}
          </span>
          <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-widest text-subtle">
            {cadence}
          </span>
        </span>
      </div>
      {seatsLeft != null && (
        <p className="mt-2 pl-10 font-mono text-[11px] uppercase tracking-widest text-subtle">
          {seatsLeft} de {offer.seats!.total} vagas em 2026
        </p>
      )}
    </button>
  );
}

export function PresenceMenu() {
  const [selectedId, setSelectedId] = useState(OFFERS[3]?.id ?? OFFERS[0].id);
  const [fullDay, setFullDay] = useState(false);

  const selected = useMemo(
    () => OFFERS.find((o) => o.id === selectedId) ?? OFFERS[0],
    [selectedId],
  );

  const priced = priceFor(selected, fullDay);
  let row = 1;

  return (
    <section id="contratar" className="border-b border-border py-24">
      <Container>
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
            Cardápio de presença
          </span>
          <h2 className="tracking-tighter-display mt-4 text-3xl font-semibold md:text-4xl">
            Escolha o prato. Pague. A gente começa.
          </h2>
          <p className="mt-4 text-muted">
            Sem proposta eterna. Preço aberto, checkout em PIX, Bitcoin ou
            Ethereum. Depois do pagamento, kickoff no WhatsApp.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            {GROUPS.map((group) => {
              const items = OFFERS.filter((o) => o.group === group.id);
              return (
                <div key={group.id} className="mb-10 last:mb-0">
                  <div className="mb-2 flex items-end justify-between gap-4 border-b border-border pb-3">
                    <h3 className="font-mono text-[11px] uppercase tracking-widest text-subtle">
                      {group.label}
                    </h3>
                    <p className="text-xs text-subtle">{group.note}</p>
                  </div>
                  <div>
                    {items.map((offer) => {
                      const index = row++;
                      return (
                        <MenuRow
                          key={offer.id}
                          offer={offer}
                          index={index}
                          active={selected.id === offer.id}
                          fullDay={fullDay}
                          onSelect={() => setSelectedId(offer.id)}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl border border-border-strong bg-surface p-7">
              <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
                {selected.who}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                {selected.name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {selected.body}
              </p>

              {selected.id === "workshop" && (
                <div className="mt-6 flex rounded-md border border-border p-1">
                  <button
                    type="button"
                    onClick={() => setFullDay(false)}
                    className={`flex-1 rounded px-3 py-2 text-xs font-medium transition-colors ${
                      !fullDay
                        ? "bg-foreground text-background"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    Meio período · {formatBRL(selected.amount)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFullDay(true)}
                    className={`flex-1 rounded px-3 py-2 text-xs font-medium transition-colors ${
                      fullDay
                        ? "bg-foreground text-background"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    Dia inteiro · {formatBRL(selected.amountAlt || 0)}
                  </button>
                </div>
              )}

              <ul className="mt-7 space-y-3 border-t border-border pt-6">
                {selected.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                    <span className="leading-snug text-muted">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-end justify-between gap-4 border-t border-border pt-6">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
                    Total
                  </p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">
                    {formatBRL(priced.amount)}
                  </p>
                  <p className="mt-1 text-xs text-subtle">{priced.cadence}</p>
                </div>
              </div>

              <a
                href={offerCheckoutHref(selected.id, fullDay)}
                className="mt-6 flex w-full items-center justify-center rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                Contratar — {formatBRL(priced.amount)}
              </a>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
