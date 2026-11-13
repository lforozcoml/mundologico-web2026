"use client";

import { useId, useState } from "react";
import { m } from "framer-motion";
import {
  ChartLine,
  Check,
  ChevronRight,
  Funnel,
  Puzzle,
  Search,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Frente, IconoFrente } from "@/content/data/ecommerce-shopify";
import { ecommerce } from "@/content/data/i18n/ecommerce-contenido";
import type { Idioma } from "@/lib/i18n/config";

const ICONOS: Record<IconoFrente, LucideIcon> = {
  funnel: Funnel,
  smartphone: Smartphone,
  search: Search,
  puzzle: Puzzle,
  workflow: Workflow,
  chart: ChartLine,
};

/**
 * Color del círculo numerado, igual en el esquema y en la tarjeta.
 * Las etapas van en azul; cada capa con su tinte. Todos con texto blanco AA.
 */
type Tono = { circulo: string; tinte: string };
const TONO_ETAPA: Tono = { circulo: "#176BEC", tinte: "transparent" };
const TONOS_CAPA: readonly Tono[] = [
  { circulo: "#037F70", tinte: "rgba(4,188,166,0.08)" },
  { circulo: "#513EF5", tinte: "rgba(81,62,245,0.07)" },
];

type Item = { frente: Frente; n: number; tono: Tono };

function itemsDe(frentes: readonly Frente[]): Item[] {
  let capa = 0;
  return frentes.map((frente, i) => ({
    frente,
    n: i + 1,
    tono: frente.tipo === "capa" ? TONOS_CAPA[capa++ % TONOS_CAPA.length] : TONO_ETAPA,
  }));
}

const RESALTE = "border-mundo-blue shadow-[0_8px_24px_rgba(23,107,236,0.18)]";
const FOCO = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-blue";

function Circulo({ n, color }: { n: number; color: string }) {
  return (
    <span
      aria-hidden
      className="flex size-8 shrink-0 items-center justify-center rounded-full text-[15px] font-black text-white"
      style={{ background: color }}
    >
      {n}
    </span>
  );
}

export function RevisionFrentes({ idioma }: { idioma: Idioma }) {
  const { revision, ui } = ecommerce[idioma];
  const items = itemsDe(revision.frentes);
  const etapas = items.filter((it) => it.frente.tipo === "etapa");
  const capas = items.filter((it) => it.frente.tipo === "capa");
  const [activo, setActivo] = useState(0);
  const base = useId();
  const idTarjeta = (n: number) => `${base}-frente-${n}`;

  /** Mismos manejadores para nodo, barra y tarjeta: un solo estado compartido. */
  const activar = (i: number) => ({
    onMouseEnter: () => setActivo(i),
    onFocus: () => setActivo(i),
    onClick: () => setActivo(i),
  });

  return (
    <div>
      {/* Esquema del recorrido. Es un atajo visual: el contenido completo está en las tarjetas. */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
        <h3 className="text-xl font-black text-mundo-dark md:text-2xl">{revision.recorridoTitulo}</h3>
        <p className="mt-1 mb-6 text-[14px] text-gray-600">{revision.recorridoNota}</p>

        <ol className="flex flex-col items-stretch gap-1 md:flex-row md:items-center md:gap-2">
          {etapas.map((it, k) => {
            const on = it.n - 1 === activo;
            return (
              <li
                key={it.n}
                // El último no tiene flecha: md:pr-7 iguala su ancho al de los demás (flecha de 20 px + 8 px de margen).
                className={`flex flex-col items-stretch md:flex-1 md:flex-row md:items-center ${
                  k === etapas.length - 1 ? "md:pr-7" : ""
                }`}
              >
                <button
                  type="button"
                  aria-pressed={on}
                  aria-label={`${ui.frente} ${it.n}: ${it.frente.titulo}`}
                  aria-describedby={idTarjeta(it.n)}
                  {...activar(it.n - 1)}
                  className={`flex min-h-11 w-full items-center gap-3 rounded-xl border-2 bg-white px-4 py-3 text-left transition-[border-color,box-shadow] duration-200 ${FOCO} ${
                    on ? RESALTE : "border-gray-200 hover:border-mundo-blue/60"
                  }`}
                >
                  <Circulo n={it.n} color={it.tono.circulo} />
                  <span className="min-w-0">
                    <span className="block text-[16px] font-extrabold leading-tight text-mundo-dark">
                      {it.frente.etapa}
                    </span>
                    <span className="block text-[14px] leading-snug text-gray-600">{it.frente.titulo}</span>
                  </span>
                </button>
                {k < etapas.length - 1 && (
                  <ChevronRight
                    aria-hidden
                    className="mx-auto my-0.5 size-5 shrink-0 rotate-90 text-gray-400 md:mx-1 md:my-0 md:rotate-0"
                  />
                )}
              </li>
            );
          })}
        </ol>

        <ul className="mt-4 grid gap-3">
          {capas.map((it) => {
            const on = it.n - 1 === activo;
            return (
              <li key={it.n}>
                <button
                  type="button"
                  aria-pressed={on}
                  aria-label={`${ui.frente} ${it.n}: ${it.frente.titulo}`}
                  aria-describedby={idTarjeta(it.n)}
                  {...activar(it.n - 1)}
                  style={{ background: it.tono.tinte }}
                  className={`flex min-h-11 w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-[border-color,box-shadow] duration-200 ${FOCO} ${
                    on ? RESALTE : "border-transparent hover:border-mundo-blue/60"
                  }`}
                >
                  <Circulo n={it.n} color={it.tono.circulo} />
                  <span className="text-[16px] font-extrabold text-mundo-dark">{it.frente.titulo}</span>
                  <span className="ml-auto text-right text-[14px] text-gray-600">{it.frente.etapa}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Tarjetas: siempre visibles, no dependen de la interacción. */}
      <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => {
          const on = i === activo;
          const Icono = ICONOS[it.frente.icono];
          return (
            <m.li
              key={it.n}
              id={idTarjeta(it.n)}
              data-activo={on ? "true" : "false"}
              tabIndex={0}
              {...activar(i)}
              // Solo desplazamiento: la tarjeta nunca arranca invisible.
              initial={{ y: 16 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className={`flex flex-col rounded-2xl border-2 bg-white p-6 transition-[border-color,box-shadow] duration-200 ${FOCO} ${
                on ? RESALTE : "border-gray-200"
              }`}
            >
              <div className="mb-3 flex items-center gap-3">
                <Circulo n={it.n} color={it.tono.circulo} />
                <Icono aria-hidden className="size-5 shrink-0 text-mundo-dark" />
                <h4 className="text-lg font-extrabold leading-snug text-mundo-dark">{it.frente.titulo}</h4>
              </div>
              <span className="mb-3 inline-flex w-fit rounded-full bg-gray-100 px-3 py-1 text-[13px] font-semibold text-gray-600">
                {it.frente.etapa}
              </span>
              <p className="mb-4 text-[16px] font-semibold leading-snug text-mundo-dark">{it.frente.pregunta}</p>
              <p className="mb-2 text-[13px] font-bold uppercase tracking-wider text-mundo-dark">
                {revision.revisamosEtiqueta}
              </p>
              <ul className="mb-5 grid gap-2">
                {it.frente.revisamos.map((r) => (
                  <li key={r} className="flex gap-2 text-[16px] leading-relaxed text-gray-600">
                    <Check aria-hidden className="mt-1.5 size-4 shrink-0" style={{ color: it.tono.circulo }} strokeWidth={3} />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto rounded-xl bg-gray-50 px-4 py-3">
                <p className="mb-1 text-[13px] font-bold uppercase tracking-wider text-mundo-dark">
                  {revision.resultadoEtiqueta}
                </p>
                <p className="text-[16px] leading-relaxed text-mundo-dark">{it.frente.resultado}</p>
              </div>
            </m.li>
          );
        })}
      </ol>
    </div>
  );
}
