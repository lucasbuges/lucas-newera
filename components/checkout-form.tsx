"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getOffer, PAYMENT, SITE_NAME } from "@/lib/config";
import {
  buildPaymentPayload,
  fetchCryptoAmount,
  PAY_METHODS,
  qrImageUrl,
  type PayMethod,
} from "@/lib/payments";
import { formatBRL, whatsappHref } from "@/lib/whatsapp";
import { Container } from "./container";
import { PayMethodIcon } from "./pay-method-icon";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      disabled={!value}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }}
      className="rounded-md border border-border-strong px-3 py-1.5 text-xs font-medium transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
    >
      {copied ? "Copiado" : "Copiar"}
    </button>
  );
}

export function CheckoutForm() {
  const search = useSearchParams();
  const offerId = search.get("offer");
  const variant = search.get("variant");
  const offer = getOffer(offerId);

  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<PayMethod>("pix");
  const [cryptoAmount, setCryptoAmount] = useState<string | null>(null);
  const [cryptoError, setCryptoError] = useState<string | null>(null);
  const [cryptoLoading, setCryptoLoading] = useState(false);

  const order = useMemo(() => {
    if (!offer) return null;
    const fullDay = offer.id === "workshop" && variant === "full";
    const amount =
      fullDay && offer.amountAlt ? offer.amountAlt : offer.amount;
    const cadence =
      fullDay && offer.cadenceAlt ? offer.cadenceAlt : offer.cadence;
    return {
      title: offer.name,
      subtitle: fullDay ? "Dia inteiro" : offer.who,
      cadence,
      amount,
      lines: offer.includes.slice(0, 4),
    };
  }, [offer, variant]);

  const paymentTarget = useMemo(() => {
    if (method === "pix") return PAYMENT.pixKey;
    if (method === "btc") return PAYMENT.btcAddress;
    return PAYMENT.ethAddress;
  }, [method]);

  const keysReady = Boolean(paymentTarget);

  const paymentPayload = useMemo(() => {
    if (!order || !keysReady) return null;
    if (method !== "pix" && cryptoLoading) return null;
    return buildPaymentPayload({
      method,
      pixKey: PAYMENT.pixKey,
      pixName: PAYMENT.pixName,
      pixCity: PAYMENT.pixCity,
      btcAddress: PAYMENT.btcAddress,
      ethAddress: PAYMENT.ethAddress,
      amountBrl: order.amount,
      cryptoAmount,
      label: SITE_NAME,
    });
  }, [order, keysReady, method, cryptoLoading, cryptoAmount]);

  useEffect(() => {
    if (!order || method === "pix") {
      setCryptoAmount(null);
      setCryptoError(null);
      return;
    }
    let cancelled = false;
    setCryptoLoading(true);
    setCryptoError(null);
    fetchCryptoAmount(order.amount, method)
      .then((result) => {
        if (!cancelled) setCryptoAmount(result.formatted);
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setCryptoAmount(null);
          setCryptoError(
            error instanceof Error ? error.message : "Erro na cotação",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setCryptoLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [method, order]);

  const whatsappText = useMemo(() => {
    if (!order) return "";
    return [
      `Checkout — ${SITE_NAME}`,
      company.trim() ? `Empresa: ${company.trim()}` : null,
      email.trim() ? `E-mail: ${email.trim()}` : null,
      "",
      `Oferta: ${order.title}`,
      order.subtitle,
      `Total: ${formatBRL(order.amount)} ${order.cadence}`,
      "",
      `Pagamento: ${method.toUpperCase()}`,
      method === "pix"
        ? `PIX Copia e Cola gerado com valor ${formatBRL(order.amount)}`
        : `${method.toUpperCase()}: ${paymentTarget}`,
      method !== "pix" && cryptoAmount
        ? `Valor estimado: ${cryptoAmount} ${method.toUpperCase()}`
        : null,
      "",
      "Já enviei o pagamento. Pode confirmar e marcar o kickoff?",
    ]
      .filter((line) => line !== null)
      .join("\n");
  }, [company, email, order, method, paymentTarget, cryptoAmount]);

  if (!order) {
    return (
      <Container className="py-24">
        <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
          Checkout
        </p>
        <h1 className="tracking-tighter-display mt-3 text-3xl font-semibold sm:text-4xl">
          Escolha uma oferta.
        </h1>
        <p className="mt-4 text-muted">
          O cardápio de presença está na home.
        </p>
        <a
          href="/#contratar"
          className="mt-8 inline-flex rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background"
        >
          Ver cardápio
        </a>
      </Container>
    );
  }

  return (
    <Container className="py-16 sm:py-24">
      <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
        Checkout
      </p>
      <h1 className="tracking-tighter-display mt-3 text-3xl font-semibold sm:text-4xl">
        Pagar com PIX, Bitcoin ou Ethereum.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Depois do pagamento, avisa no WhatsApp. Eu confirmo e a gente marca o
        kickoff.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <section className="rounded-xl border border-border p-6">
            <h2 className="text-sm font-medium tracking-tight">Pedido</h2>
            <p className="mt-4 text-2xl font-semibold tracking-tight">
              {order.title}
            </p>
            <p className="mt-1 text-sm text-subtle">{order.subtitle}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {order.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mt-6 flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-sm text-subtle">Total</span>
              <span className="text-right">
                <span className="text-xl font-semibold">
                  {formatBRL(order.amount)}
                </span>
                <span className="mt-1 block text-xs text-subtle">
                  {order.cadence}
                </span>
              </span>
            </p>
          </section>

          <section className="rounded-xl border border-border p-6">
            <h2 className="text-sm font-medium tracking-tight">Seus dados</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-muted">Empresa</span>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Opcional"
                  className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none placeholder:text-subtle focus:border-border-strong"
                />
              </label>
              <label className="block text-sm">
                <span className="text-muted">E-mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Opcional"
                  className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none placeholder:text-subtle focus:border-border-strong"
                />
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-border p-6">
            <h2 className="text-sm font-medium tracking-tight">
              Forma de pagamento
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {PAY_METHODS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setMethod(option.id)}
                  className={`rounded-xl border px-4 py-4 text-left transition-colors ${
                    method === option.id
                      ? "border-border-strong bg-surface"
                      : "border-border hover:bg-surface"
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground">
                    <PayMethodIcon method={option.id} className="h-4 w-4" />
                  </span>
                  <p className="mt-3 font-medium tracking-tight">
                    {option.label}
                  </p>
                  <p className="mt-1 text-xs text-subtle">{option.hint}</p>
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="rounded-xl border border-border-strong bg-surface p-6 lg:sticky lg:top-20 lg:self-start">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground">
              <PayMethodIcon method={method} className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-sm font-medium tracking-tight">
                Pagar com {method === "pix" ? "PIX" : method.toUpperCase()}
              </h2>
              <p className="mt-0.5 text-sm text-muted">
                {formatBRL(order.amount)}
                {method !== "pix" && cryptoAmount
                  ? ` ≈ ${cryptoAmount} ${method.toUpperCase()}`
                  : ""}
              </p>
            </div>
          </div>

          {method !== "pix" && cryptoLoading && (
            <p className="mt-4 text-sm text-subtle">Buscando cotação…</p>
          )}
          {cryptoError && (
            <p className="mt-4 text-sm text-muted">{cryptoError}</p>
          )}

          {paymentPayload ? (
            <div className="mt-6 space-y-4">
              <img
                src={qrImageUrl(paymentPayload.qrData)}
                alt={`QR Code ${method.toUpperCase()}`}
                width={220}
                height={220}
                className="mx-auto rounded-lg bg-white p-3"
              />
              <p className="text-center text-xs text-subtle">
                {method === "pix"
                  ? "Escaneie no app do banco — valor já vem no QR"
                  : "Escaneie na carteira"}
              </p>
              <div>
                <p className="text-xs uppercase tracking-widest text-subtle">
                  {paymentPayload.copyLabel}
                </p>
                <div className="mt-2 flex items-start gap-2">
                  <p className="max-h-24 flex-1 overflow-y-auto break-all font-mono text-xs leading-relaxed">
                    {paymentPayload.copyValue}
                  </p>
                  <CopyButton value={paymentPayload.copyValue} />
                </div>
                {paymentPayload.secondaryValue &&
                  paymentPayload.secondaryLabel && (
                    <div className="mt-3">
                      <p className="text-xs uppercase tracking-widest text-subtle">
                        {paymentPayload.secondaryLabel}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2">
                        <p className="break-all font-mono text-xs">
                          {paymentPayload.secondaryValue}
                          {method !== "pix" ? ` ${method.toUpperCase()}` : ""}
                        </p>
                        <CopyButton value={paymentPayload.secondaryValue} />
                      </div>
                    </div>
                  )}
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm text-subtle">Preparando QR Code…</p>
          )}

          <a
            href={whatsappHref(whatsappText)}
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex w-full items-center justify-center rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            Já paguei — avisar no WhatsApp
          </a>
          <a
            href="/#contratar"
            className="mt-3 flex w-full items-center justify-center text-xs text-subtle transition-opacity hover:opacity-80"
          >
            Voltar ao cardápio
          </a>
        </aside>
      </div>
    </Container>
  );
}
