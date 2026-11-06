"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { m } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { comoTrabajamos, type Ruta } from "@/content/data/ecommerce-shopify";

const rutas: readonly Ruta[] = comoTrabajamos.rutas;
const FOCO = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-blue";

function LineaDeTiempo({ ruta }: { ruta: Ruta }) {
  return (
    <ol className="grid">
      {ruta.pasos.map((paso, i) => {
        const ultimo = i === ruta.pasos.length - 1;
        return (
          <m.li
            key={paso.titulo}
            className={`relative pl-14 ${ultimo ? "" : "pb-8"}`}
            // Solo desplazamiento: el paso nunca arranca invisible.
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            {!ultimo && <span aria-hidden className="absolute top-10 bottom-0 left-[19px] w-0.5 bg-gray-300" />}
            <span
              aria-hidden
              className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-full bg-mundo-blue text-[16px] font-black text-white"
            >
              {i + 1}
            </span>
            <div className="grid gap-3 rounded-2xl border border-gray-200 bg-white p-5 md:grid-cols-[1fr_minmax(0,18rem)] md:items-center md:gap-6">
              <div>
                <h3 className="text-lg font-extrabold leading-snug text-mundo-dark">{paso.titulo}</h3>
                <p className="mt-1 text-[16px] leading-relaxed text-gray-600">{paso.texto}</p>
              </div>
              <p className="flex items-start gap-2 rounded-xl bg-mundo-teal/10 px-4 py-3 text-[15px] font-semibold leading-snug text-mundo-dark">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-[#037F70]" strokeWidth={3} />
                <span>{paso.recibes}</span>
              </p>
            </div>
          </m.li>
        );
      })}
    </ol>
  );
}

export function ComoTrabajamos() {
  const [activa, setActiva] = useState(0);
  const base = useId();
  const pestanas = useRef<(HTMLButtonElement | null)[]>([]);
  const idPestana = (i: number) => `${base}-tab-${i}`;
  const idPanel = (i: number) => `${base}-panel-${i}`;

  const mover = (i: number) => {
    setActiva(i);
    pestanas.current[i]?.focus();
  };

  const alTeclear = (e: KeyboardEvent<HTMLButtonElement>) => {
    const total = rutas.length;
    const destino: Record<string, number> = {
      ArrowRight: (activa + 1) % total,
      ArrowLeft: (activa - 1 + total) % total,
      Home: 0,
      End: total - 1,
    };
    if (e.key in destino) {
      e.preventDefault();
      mover(destino[e.key]);
    }
  };

  return (
    <section id={comoTrabajamos.id} className="scroll-mt-24 bg-gray-50 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-4 max-w-3xl text-3xl font-black leading-tight text-mundo-dark md:text-4xl">
          {comoTrabajamos.titulo}
        </h2>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-600">{comoTrabajamos.intro}</p>

        <div
          role="tablist"
          aria-label="Ruta de trabajo"
          className="mb-8 inline-flex flex-wrap gap-1 rounded-full border border-gray-200 bg-white p-1"
        >
          {rutas.map((ruta, i) => {
            const on = i === activa;
            return (
              <button
                key={ruta.id}
                ref={(el) => {
                  pestanas.current[i] = el;
                }}
                id={idPestana(i)}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={idPanel(i)}
                tabIndex={on ? 0 : -1}
                onClick={() => setActiva(i)}
                onKeyDown={alTeclear}
                className={`min-h-11 rounded-full px-5 text-[16px] font-bold transition-colors duration-200 ${FOCO} ${
                  on ? "bg-mundo-dark text-white" : "text-mundo-dark hover:bg-gray-100"
                }`}
              >
                {ruta.etiqueta}
              </button>
            );
          })}
        </div>

        {rutas.map((ruta, i) => (
          <div
            key={ruta.id}
            id={idPanel(i)}
            role="tabpanel"
            aria-labelledby={idPestana(i)}
            tabIndex={0}
            hidden={i !== activa}
            className={`rounded-2xl ${FOCO}`}
          >
            <LineaDeTiempo ruta={ruta} />
          </div>
        ))}

        <p className="mt-10 flex items-start gap-3 text-[16px] font-semibold text-mundo-dark">
          <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-mundo-blue" />
          {comoTrabajamos.confianza}
        </p>
      </div>
    </section>
  );
}
