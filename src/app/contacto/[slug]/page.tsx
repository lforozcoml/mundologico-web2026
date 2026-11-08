import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Globe, MessageCircle, Phone, UserPlus } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { IDIOMAS, normalizarIdioma, type Idioma } from "@/lib/contact";
import { CALENDARIO_URL } from "@/content/data/site";
import { derivados, getTarjeta, tarjetas } from "@/content/data/tarjeta";
import { textosTarjeta } from "@/content/data/tarjeta-textos";
import { TarjetaTracker, type TarjetaAccion } from "@/components/ui/TarjetaTracker";
import { IdiomaDocumento } from "@/components/ui/IdiomaDocumento";
import { TarjetaCaptura } from "@/components/sections/TarjetaCaptura";

export const dynamicParams = false;

type Query = { lang?: string | string[]; src?: string | string[] };
type Props = { params: Promise<{ slug: string }>; searchParams: Promise<Query> };

function primero(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

/** Sin ?lang= es español. No se detecta el idioma del navegador. */
function idiomaDe(q: Query): Idioma {
  return normalizarIdioma(primero(q.lang));
}

/** Enlace del selector: conserva src y pone lang solo para inglés. */
function hrefIdioma(ruta: string, q: Query, idioma: Idioma): string {
  const params = new URLSearchParams();
  const src = primero(q.src);
  if (src && /^[a-z0-9_-]{1,32}$/i.test(src)) params.set("src", src);
  if (idioma !== "es") params.set("lang", idioma);
  const query = params.toString();
  return query ? `${ruta}?${query}` : ruta;
}

export function generateStaticParams() {
  return tarjetas.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const tarjeta = getTarjeta((await params).slug);
  if (!tarjeta) return {};
  const d = derivados(tarjeta);
  const tx = textosTarjeta[idiomaDe(await searchParams)];
  const description =
    tarjeta.tipo === "persona"
      ? tx.descripcionPersona(d.nombreVisible, tarjeta.empresa)
      : tx.descripcionEmpresa(tarjeta.empresa);
  return {
    ...pageMetadata({ title: d.nombreVisible, description, path: d.ruta }),
    ...(tarjeta.indexable ? {} : { robots: { index: false, follow: false } }),
  };
}

type Boton = {
  accion: Exclude<TarjetaAccion, "guardar" | "correo">;
  label: string;
  href: string;
  icon: typeof Phone;
  externo: boolean;
};

export default async function TarjetaPage({ params, searchParams }: Props) {
  const tarjeta = getTarjeta((await params).slug);
  if (!tarjeta) notFound();
  const d = derivados(tarjeta);
  const query = await searchParams;
  const idioma = idiomaDe(query);
  const tx = textosTarjeta[idioma];

  const secundarios: Boton[] = [
    { accion: "llamar", label: tx.llamar, href: d.telHref, icon: Phone, externo: false },
    { accion: "whatsapp", label: tx.whatsapp, href: d.whatsappHref, icon: MessageCircle, externo: true },
    { accion: "web", label: tx.web, href: tarjeta.url, icon: Globe, externo: true },
  ];

  return (
    <main lang={idioma} className="flex-1 bg-mundo-dark text-white flex items-start justify-center px-4 pt-8 pb-28 sm:items-center">
      <TarjetaTracker slug={tarjeta.slug} />
      <IdiomaDocumento idioma={idioma} />
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex min-h-11 items-center" aria-label={tx.irAlSitio}>
            <Image src="/logo-mundologico-blanco.png" alt="Mundo Lógico" width={160} height={36} className="h-8 w-auto" priority />
          </Link>
          <nav aria-label={tx.selectorIdioma}>
            <ul className="flex gap-1 rounded-full border border-white/25 p-1">
              {IDIOMAS.map((opcion) => (
                <li key={opcion}>
                  <Link
                    href={hrefIdioma(d.ruta, query, opcion)}
                    lang={opcion}
                    hrefLang={opcion}
                    aria-label={tx.nombreIdioma[opcion]}
                    aria-current={opcion === idioma ? "true" : undefined}
                    replace
                    scroll={false}
                    className={`flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-bold uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-teal ${
                      opcion === idioma ? "bg-white text-mundo-dark" : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {opcion}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <h1 className="text-4xl font-black leading-tight">{d.nombreVisible}</h1>
        {tarjeta.tipo === "persona" && (
          <p className="mt-2 text-lg text-white/80">
            {tarjeta.cargo ? `${tarjeta.cargo} · ${tarjeta.empresa}` : tarjeta.empresa}
          </p>
        )}
        <p className="mt-1 text-base text-mundo-teal font-medium">{tx.lema}</p>

        <a
          href={d.vcfHref}
          download={d.archivoVcf}
          data-tarjeta-accion="guardar"
          className="mt-8 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-lg font-bold text-mundo-dark hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-teal"
        >
          <UserPlus aria-hidden className="size-5" />
          {tx.guardar}
        </a>

        <ul className="mt-4 grid gap-3">
          {secundarios.map(({ accion, label, href, icon: Icon, externo }) => (
            <li key={accion}>
              <a
                href={href}
                data-tarjeta-accion={accion}
                {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/30 px-6 text-base font-semibold text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-teal"
              >
                <Icon aria-hidden className="size-5" />
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={CALENDARIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-tarjeta-accion="agendar"
          className="mt-3 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-mundo-teal px-6 text-lg font-bold text-mundo-dark transition-colors hover:bg-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <CalendarDays aria-hidden className="size-5" />
          {tx.agendar}
        </a>

        {/* key: al cambiar de idioma se vuelve a montar con su widget de Turnstile en ese idioma. */}
        <TarjetaCaptura key={idioma} slug={tarjeta.slug} idioma={idioma} whatsappHref={d.whatsappHref} email={tarjeta.email} />

        <p className="mt-6 text-center">
          <a
            href={d.emailHref}
            data-tarjeta-accion="correo"
            className="inline-flex min-h-11 items-center text-base text-white/80 underline-offset-4 hover:underline"
          >
            {tarjeta.email}
          </a>
        </p>
      </div>
    </main>
  );
}
