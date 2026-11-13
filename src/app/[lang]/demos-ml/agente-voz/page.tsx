import type { Metadata } from "next";
import { soloSinPrefijo } from "@/lib/i18n/servidor";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { normalizarIdioma, type Idioma } from "@/lib/contact";
import { RUTA_DEMOS, hrefConIdioma } from "@/lib/enlaces";
import { obtenerEstadoDemo, type EstadoDemo } from "@/lib/demo-estado";
import { variablesAgenteVoz } from "@/lib/demo-agente-voz";
import { log } from "@/lib/log";
import { CALENDARIO_URL } from "@/content/data/site";
import { RUTA_AGENTE_VOZ, textosAgenteVoz } from "@/content/data/demo-agente-voz";
import { AgenteVozTracker } from "@/components/demos/AgenteVozTracker";
import { WidgetAgenteVoz } from "@/components/demos/WidgetAgenteVoz";
import { IdiomaDocumento } from "@/components/ui/IdiomaDocumento";
import { SelectorIdioma } from "@/components/ui/SelectorIdioma";

type Query = {
  lang?: string | string[];
  src?: string | string[];
  u?: string | string[];
  c?: string | string[];
};
type Props = { params: Promise<{ lang: string }>; searchParams: Promise<Query> };

const AGENT_ID_RE = /^[A-Za-z0-9_-]{1,64}$/;

function primero(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

/** Sin ?lang= es español. No se detecta el idioma del navegador. */
function idiomaDe(q: Query): Idioma {
  return normalizarIdioma(primero(q.lang));
}

/** El agente vive en la cuenta de ElevenLabs y puede cambiar: sale de la variable, nunca del código. */
function agentId(): string | null {
  const id = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim();
  return id && AGENT_ID_RE.test(id) ? id : null;
}

/** Bandera de Make y agente configurado. Si falta cualquiera de los dos, apagado. */
async function estado(): Promise<{ estado: EstadoDemo; agente: string | null }> {
  const agente = agentId();
  const e = await obtenerEstadoDemo({
    alApagar: (motivo) => {
      if (motivo === "bandera") return; // Apagado a propósito desde Make: no es un error.
      log.warn("demo_voz_estado_apagado", { motivo });
    },
  });
  if (e === "prendido" && !agente) {
    log.warn("demo_voz_estado_apagado", { motivo: "sin-agente" });
    return { estado: "apagado", agente: null };
  }
  return { estado: e, agente };
}

/** No listada: noindex en meta (aquí) y en cabecera (/demos-ml/:path* en next.config.ts). */
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  await soloSinPrefijo(params);
  const tx = textosAgenteVoz[idiomaDe(await searchParams)];
  return {
    ...pageMetadata({ title: tx.metaTitulo, description: tx.metaDescripcion, path: RUTA_AGENTE_VOZ }),
    robots: { index: false, follow: false },
  };
}

const BOTON_PRIMARIO =
  "flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-mundo-teal px-6 text-center text-lg font-bold text-mundo-dark transition-colors hover:bg-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-dark sm:w-auto";
const ENLACE =
  "inline-flex min-h-11 items-center gap-2 font-semibold text-mundo-blue underline underline-offset-4";

export default async function AgenteVozPage({ params, searchParams }: Props) {
  await soloSinPrefijo(params);
  const query = await searchParams;
  const idioma = idiomaDe(query);
  const tx = textosAgenteVoz[idioma];
  const src = primero(query.src);
  const { estado: e, agente } = await estado();
  const prendido = e === "prendido" && agente !== null;
  const hrefDemos = hrefConIdioma(RUTA_DEMOS, src, idioma);

  return (
    // pb-32: el widget flota abajo y no debe tapar el final del contenido.
    <main lang={idioma} className="flex-1 bg-gray-50 pb-32" data-demo-estado={prendido ? "prendido" : "apagado"}>
      <AgenteVozTracker idioma={idioma} />
      <IdiomaDocumento idioma={idioma} />

      <section className="bg-mundo-dark px-4 pb-6 pt-6 text-white sm:pb-12">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="inline-flex min-h-11 items-center" aria-label={tx.irAlSitio}>
              <Image src="/logo-mundologico-blanco.png" alt="Mundo Lógico" width={160} height={36} className="h-8 w-auto" priority />
            </Link>
            <SelectorIdioma
              ruta={RUTA_AGENTE_VOZ}
              idioma={idioma}
              src={src}
              etiqueta={tx.selectorIdioma}
              nombreIdioma={tx.nombreIdioma}
            />
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-mundo-teal sm:mt-8">{tx.etiqueta}</p>
          <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
            {prendido ? tx.titulo : tx.desactivado.titulo}
          </h1>
          {/* Prendido: la descripción va debajo del botón para que, en celular, aviso y botón quepan sin scroll. */}
          {!prendido && <p className="mt-4 text-lg text-white/85">{tx.desactivado.texto}</p>}
        </div>
      </section>

      <section className="px-4 py-6 sm:py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-8">
          {prendido && agente ? (
            <>
              <WidgetAgenteVoz
                agentId={agente}
                variables={variablesAgenteVoz(primero(query.u), primero(query.c), tx.genericos)}
                textos={tx}
                botonClase={BOTON_PRIMARIO}
              />
              <p className="mt-5 text-base leading-relaxed text-gray-700">{tx.descripcion}</p>
            </>
          ) : (
            <a
              href={CALENDARIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="demo-agente-voz-agendar"
              className={BOTON_PRIMARIO}
            >
              <CalendarDays aria-hidden className="size-5" />
              {tx.agendar}
            </a>
          )}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-6">
            <Link href={hrefDemos} data-cta="demo-agente-voz-volver" className={ENLACE}>
              <ArrowLeft aria-hidden className="size-4" />
              {prendido ? tx.volverDemos : tx.desactivado.volver}
            </Link>
            {prendido && (
              <a href={CALENDARIO_URL} target="_blank" rel="noopener noreferrer" data-cta="demo-agente-voz-agendar" className={ENLACE}>
                <CalendarDays aria-hidden className="size-4" />
                {tx.agendar}
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
