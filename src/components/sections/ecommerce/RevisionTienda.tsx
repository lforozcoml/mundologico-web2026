import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { CALENDARIO_URL } from "@/content/data/site";
import { revision } from "@/content/data/ecommerce-shopify";
import { RevisionFrentes } from "@/components/sections/ecommerce/RevisionFrentes";
import { PlanTreintaSesentaNoventa } from "@/components/sections/ecommerce/PlanTreintaSesentaNoventa";

/** Sección Revisión de tienda. El id "revision" es el destino del CTA secundario del hero. */
export function RevisionTienda() {
  return (
    <section id="revision" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-4 max-w-3xl text-3xl font-black leading-tight text-mundo-dark md:text-4xl">
          {revision.titulo}
        </h2>
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-gray-600">{revision.intro}</p>

        <RevisionFrentes />

        <div className="mt-16">
          <h3 className="mb-3 text-2xl font-black text-mundo-dark">{revision.recibesTitulo}</h3>
          <p className="mb-8 max-w-2xl text-[17px] leading-relaxed text-gray-600">{revision.recibesTexto}</p>
          <PlanTreintaSesentaNoventa />

          <p className="mt-6 flex items-start gap-2 text-[14px] leading-relaxed text-gray-600">
            <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-mundo-blue" />
            {revision.nota}
          </p>

          <p className="mt-3 flex flex-wrap items-center gap-x-2 text-[14px] leading-relaxed text-gray-600">
            ¿Hay mucho trabajo manual detrás de tu tienda?
            <Link
              href="/productos#automatizacion"
              data-cta="ecommerce-a-automatizacion"
              className="inline-flex min-h-11 items-center gap-1.5 rounded font-semibold text-mundo-blue underline underline-offset-4 hover:text-mundo-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-blue"
            >
              Ver cómo automatizamos procesos
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </p>

          <div className="mt-10">
            <a
              href={CALENDARIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center rounded-full bg-mundo-dark px-7 text-base font-semibold text-white transition-colors hover:bg-mundo-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-blue"
            >
              {revision.cta}
            </a>
            <p className="mt-3 text-[15px] text-gray-600">{revision.apoyo}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
