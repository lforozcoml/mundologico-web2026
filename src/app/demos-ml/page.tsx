import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ClipboardList } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { MENSAJE_DEMOS, interesDesdeParam, normalizarIdioma, type Idioma } from "@/lib/contact";
import { RUTA_DEMOS, hrefConIdioma } from "@/lib/enlaces";
import { CALENDARIO_URL, partnerBadges, site } from "@/content/data/site";
import { demosVisibles } from "@/content/data/demos";
import { textosDemos } from "@/content/data/demos-textos";
import { DemosTracker } from "@/components/demos/DemosTracker";
import { TarjetaDemo } from "@/components/demos/TarjetaDemo";
import { IdiomaDocumento } from "@/components/ui/IdiomaDocumento";
import { PartnerBadge } from "@/components/ui/PartnerBadge";
import { SelectorIdioma } from "@/components/ui/SelectorIdioma";
import { TarjetaCaptura } from "@/components/sections/TarjetaCaptura";

/** Slug que se suma a la fuente del lead ("rueda-2026-11 / demos-ml"). Está en PAGINAS_CAPTURA. */
const PAGINA = "demos-ml";

type Query = { lang?: string | string[]; src?: string | string[]; interes?: string | string[] };
type Props = { searchParams: Promise<Query> };

function primero(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

/** Sin ?lang= es español. No se detecta el idioma del navegador. */
function idiomaDe(q: Query): Idioma {
  return normalizarIdioma(primero(q.lang));
}

/** No listada: noindex en meta (aquí) y en cabecera (next.config.ts). No va en el sitemap ni en robots.txt. */
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const tx = textosDemos[idiomaDe(await searchParams)];
  return {
    ...pageMetadata({ title: tx.metaTitulo, description: tx.metaDescripcion, path: RUTA_DEMOS }),
    robots: { index: false, follow: false },
  };
}

const BOTON_PRIMARIO =
  "flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-mundo-teal px-6 text-center text-lg font-bold text-mundo-dark transition-colors hover:bg-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-dark sm:w-auto";
const BOTON_SECUNDARIO =
  "flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-mundo-dark px-6 text-center text-base font-bold text-mundo-dark transition-colors hover:bg-mundo-dark hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-blue sm:w-auto";

export default async function DemosPage({ searchParams }: Props) {
  const query = await searchParams;
  const idioma = idiomaDe(query);
  const tx = textosDemos[idioma];
  const src = primero(query.src);
  const interes = interesDesdeParam(primero(query.interes));
  const visibles = demosVisibles();

  // El formulario de la home solo existe en español: en inglés el Diagnóstico se pide
  // en el bloque de captura de esta misma página, con el interés ya elegido.
  const hrefDiagnostico =
    idioma === "es"
      ? hrefConIdioma("/", src, "es", { interes: "diagnostico" }, "#contacto")
      : hrefConIdioma(RUTA_DEMOS, src, idioma, { interes: "diagnostico" }, "#captura");

  return (
    <main lang={idioma} className="flex-1 bg-gray-50 pb-28 sm:pb-0">
      <DemosTracker idioma={idioma} />
      <IdiomaDocumento idioma={idioma} />

      <section className="bg-mundo-dark px-4 pb-12 pt-6 text-white sm:pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="inline-flex min-h-11 items-center" aria-label={tx.irAlSitio}>
              <Image src="/logo-mundologico-blanco.png" alt="Mundo Lógico" width={160} height={36} className="h-8 w-auto" priority />
            </Link>
            <SelectorIdioma
              ruta={RUTA_DEMOS}
              idioma={idioma}
              src={src}
              etiqueta={tx.selectorIdioma}
              nombreIdioma={tx.nombreIdioma}
            />
          </div>
          <p className="mt-10 text-sm font-bold uppercase tracking-widest text-mundo-teal">{tx.hero.etiqueta}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">{tx.hero.titulo}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{tx.hero.subtitulo}</p>
        </div>
      </section>

      <section aria-labelledby="demos-lista" className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 id="demos-lista" className="sr-only">
            {tx.listaTitulo}
          </h2>
          {/* flex y no grid: con uno o dos demos activos quedan centrados. */}
          <ul className="flex flex-wrap justify-center gap-6">
            {visibles.map((demo) => (
              <li key={demo.id} className="flex w-full md:w-[calc(50%-0.75rem)] md:max-w-md lg:w-[calc(33.333%-1rem)]">
                <TarjetaDemo demo={demo} idioma={idioma} src={src} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="demos-cta" className="bg-white px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 id="demos-cta" className="text-2xl font-black text-mundo-dark sm:text-3xl">
            {tx.cta.titulo}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-gray-700">{tx.cta.texto}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={CALENDARIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-demo-cta="agendar"
              data-cta="demos-agendar"
              className={BOTON_PRIMARIO}
            >
              <CalendarDays aria-hidden className="size-5" />
              {tx.cta.agendar}
            </a>
            <Link href={hrefDiagnostico} data-demo-cta="diagnostico" data-cta="demos-diagnostico" className={BOTON_SECUNDARIO}>
              <ClipboardList aria-hidden className="size-5" />
              {tx.cta.diagnostico}
            </Link>
          </div>
          <p className="mt-4 text-base leading-relaxed text-gray-600">{tx.cta.explicacion}</p>
        </div>
      </section>

      <section aria-labelledby="demos-confianza" className="px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="demos-confianza" className="text-lg font-bold text-mundo-dark">
            {tx.confianza.titulo}
          </h2>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-4">
            {partnerBadges.map((badge) => (
              <li key={badge.src}>
                <PartnerBadge badge={badge} className="flex min-h-11 items-center" imgClassName="h-16 w-auto" />
              </li>
            ))}
          </ul>
          <Link
            href="/casos"
            data-cta="demos-casos"
            className="mt-5 inline-flex min-h-11 items-center font-semibold text-mundo-blue underline underline-offset-4"
          >
            {tx.confianza.casos}
          </Link>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-xl rounded-3xl bg-mundo-dark px-4 pb-5 pt-1">
          {/* key: al cambiar de idioma se vuelve a montar con Turnstile en ese idioma. */}
          <TarjetaCaptura
            key={`${idioma}-${interes ?? ""}`}
            slug={PAGINA}
            idioma={idioma}
            whatsappHref={`https://wa.me/${site.contacto.telefono.replace(/\D/g, "")}`}
            email={site.contacto.email}
            ubicacion="demos"
            titulo={tx.captura.titulo}
            nota={interes ? tx.captura.notaDiagnostico : undefined}
            plegado
            abiertoInicial={interes !== null}
            interes={interes ?? undefined}
            mensajeBase={MENSAJE_DEMOS}
            enlaceDemos={false}
          />
        </div>
      </section>

      {/* Solo en móvil. El pb-28 del main evita que tape contenido. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur sm:hidden">
        <a
          href={CALENDARIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-demo-cta="agendar"
          data-cta="demos-agendar-fijo"
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-mundo-teal px-6 text-base font-bold text-mundo-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-dark"
        >
          <CalendarDays aria-hidden className="size-5" />
          {tx.botonFijo}
        </a>
      </div>
    </main>
  );
}
