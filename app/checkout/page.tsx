import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout-form";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Pagar mentoria, conselho, palestra ou workshop com PIX, Bitcoin ou Ethereum.",
};

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <Container className="py-24">
          <p className="text-sm text-muted">Carregando checkout…</p>
        </Container>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
