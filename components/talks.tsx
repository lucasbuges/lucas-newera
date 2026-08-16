import { Container } from "./container";
import { INSTAGRAM, STAGE_PHOTOS, TALK_THEMES } from "@/lib/config";

export function Talks() {
  return (
    <section id="palestras" className="border-b border-border py-24">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
              Palco
            </span>
            <h2 className="tracking-tighter-display mt-4 text-3xl font-semibold md:text-4xl">
              O que eu falo no palco
            </h2>
            <p className="mt-4 text-muted">
              Temas de quem colocou IA em produção. Preço e contratação da
              palestra e do workshop ficam no{" "}
              <a href="#contratar" className="text-foreground underline-offset-4 hover:underline">
                cardápio
              </a>
              .
            </p>
          </div>
          <a
            href="/#contratar"
            className="inline-flex shrink-0 rounded-md border border-border-strong px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-hover"
          >
            Ver palestra e workshop
          </a>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h3 className="text-lg font-medium tracking-tight">Temas</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Escolha um, ou peça um recorte para a audiência.
            </p>
          </div>
          <ul className="space-y-px overflow-hidden rounded-xl border border-border bg-border">
            {TALK_THEMES.map((theme, i) => (
              <li
                key={theme}
                className="flex items-start gap-4 bg-background p-5 transition-colors hover:bg-surface"
              >
                <span className="font-mono text-xs text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed">{theme}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {STAGE_PHOTOS.map((photo) => (
            <a
              key={photo.src}
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="photo-fade overflow-hidden rounded-xl border border-border"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={480}
                height={600}
                className="aspect-[4/5] w-full object-cover"
              />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
