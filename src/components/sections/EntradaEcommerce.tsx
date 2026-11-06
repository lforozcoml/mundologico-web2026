import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { RUTA, entrada } from "@/content/data/ecommerce-shopify";

/** Franja delgada del home hacia /productos/ecommerce-shopify. La página la muestra solo con PUBLICADO. */
export function EntradaEcommerce() {
  return (
    <section aria-labelledby="entrada-ecommerce-titulo" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-gray-50 p-8 md:flex-row md:items-center md:justify-between md:gap-10 md:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-mundo-blue/10 text-mundo-blue">
              <ShoppingBag aria-hidden className="size-6" />
            </span>
            <div>
              <p className="mb-1 text-[13px] font-bold uppercase tracking-widest text-mundo-blue">{entrada.home.eyebrow}</p>
              <h2 id="entrada-ecommerce-titulo" className="mb-2 text-2xl font-black leading-tight text-mundo-dark md:text-3xl">
                {entrada.home.titulo}
              </h2>
              <p className="max-w-2xl text-[16px] leading-relaxed text-gray-600">{entrada.home.texto}</p>
            </div>
          </div>
          <Link
            href={RUTA}
            data-cta="home-banda-ecommerce"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-mundo-dark px-7 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-mundo-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-blue"
          >
            {entrada.anclaje}
          </Link>
        </div>
      </div>
    </section>
  );
}
