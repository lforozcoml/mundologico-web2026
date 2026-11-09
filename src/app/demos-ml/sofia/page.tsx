import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { normalizarIdioma, type Idioma } from "@/lib/contact";
import { RUTA_DEMOS, hrefConIdioma } from "@/lib/enlaces";
import { obtenerEstadoDemo, type EstadoDemo } from "@/lib/demo-estado";
import { variablesSofia } from "@/lib/demo-sofia";
import { log } from "@/lib/log";
import { CALENDARIO_URL } from "@/content/data/site";
import { RUTA_SOFIA, textosSofia } from "@/content/data/demo-sofia";
import { SofiaTracker } from "@/components/demos/SofiaTracker";
import { WidgetSofia } from "@/components/demos/WidgetSofia";
import { IdiomaDocumento } from "@/components/ui/IdiomaDocumento";
import { SelectorIdioma } from "@/components/ui/SelectorIdioma";

type Query = {
  lang?: string | string[];
  src?: string | string[];
  u?: string | string[];
  c?: string | string[];
};
type Props = { searchParams: Promise<Query> };

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
      log.warn("demo_sofia_estado_apagado", { motivo });
    },
  });
  if (e === "prendido" && !agente) {
    log.warn("demo_sofia_estado_apagado", { motivo: "sin-agente" });
    return { estado: "apagado", agente: null };
  }
  return { estado: e, agente };
}

/** No listada: noindex en meta (aquí) y en cabecera (/demos-ml/:path* en next.config.ts). */
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const tx = textosSofia[idiomaDe(await searchParams)];
  return {
    ...pageMetadata({ title: tx.metaTitulo, description: tx.metaDescripcion, path: RUTA_SOFIA }),
    robots: { index: false, follow: false },
  };
}

const BOTON_PRIMARIO =
  "flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-mundo-teal px-6 text-center text-lg font-bold text-mundo-dark transition-colors hover:bg-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-dark sm:w-auto";
const ENLACE =
  "inline-flex min-h-11 items-center gap-2 font-semibold text-mundo-blue underline underline-offset-4";

export default async function SofiaPage({ searchParams }: Props) {
  const query = await searchParams;
  const idioma = idiomaDe(query);
  const tx = textosSofia[idioma];
  const src = primero(query.src);
  const { estado: e, agente } = await estado();
  const prendido = e === "prendido" && agente !== null;
  const hrefDemos = hrefConIdioma(RUTA_DEMOS, src, idioma);

  return (
    // pb-32: el widget flota abajo y no debe tapar el final del contenido.
    <main lang={idioma} className="flex-1 bg-gray-50 pb-32" data-demo-estado={prendido ? "prendido" : "apagado"}>
      <SofiaTracker idioma={idioma} />
      <IdiomaDocumento idioma={idioma} />

      <section className="bg-mundo-dark px-4 pb-8 pt-6 text-white sm:pb-12">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="inline-flex min-h-11 items-center" aria-label={tx.irAlSitio}>
              <Image src="/logo-mundologico-blanco.png" alt="Mundo Lógico" width={160} height={36} className="h-8 w-auto" priority />
            </Link>
            <SelectorIdioma
              ruta={RUTA_SOFIA}
              idioma={idioma}
              src={src}
              etiqueta={tx.selectorIdioma}
              nombreIdioma={tx.nombreIdioma}
            />
          </div>
          <p className="mt-8 text-sm font-bold uppercase tracking-widest text-mundo-teal">{tx.etiqueta}</p>
          <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
            {prendido ? tx.titulo : tx.desactivado.titulo}
          </h1>
          <p className="mt-4 text-lg text-white/85">{prendido ? tx.descripcion : tx.desactivado.texto}</p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          {prendido && agente ? (
            <WidgetSofia
              agentId={agente}
              variables={variablesSofia(primero(query.u), primero(query.c), tx.genericos)}
              textos={tx}
              botonClase={BOTON_PRIMARIO}
            />
          ) : (
            <a
              href={CALENDARIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="demo-sofia-agendar"
              className={BOTON_PRIMARIO}
            >
              <CalendarDays aria-hidden className="size-5" />
              {tx.agendar}
            </a>
          )}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-6">
            <Link href={hrefDemos} data-cta="demo-sofia-volver" className={ENLACE}>
              <ArrowLeft aria-hidden className="size-4" />
              {prendido ? tx.volverDemos : tx.desactivado.volver}
            </Link>
            {prendido && (
              <a href={CALENDARIO_URL} target="_blank" rel="noopener noreferrer" data-cta="demo-sofia-agendar" className={ENLACE}>
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
