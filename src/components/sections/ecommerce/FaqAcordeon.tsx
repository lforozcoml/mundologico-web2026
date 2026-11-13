"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ecommerce } from "@/content/data/i18n/ecommerce-contenido";
import type { Idioma } from "@/lib/i18n/config";

export function FaqAcordeon({ idioma }: { idioma: Idioma }) {
  const { faq } = ecommerce[idioma];
  const [abierta, setAbierta] = useState<number | null>(null);
  const base = useId();

  return (
    <section id={faq.id} className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-10 text-3xl font-black leading-tight text-mundo-dark md:text-4xl">{faq.titulo}</h2>
        <ul className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
          {faq.items.map((item, i) => {
            const open = abierta === i;
            const idBoton = `${base}-b${i}`;
            const idPanel = `${base}-p${i}`;
            return (
              <li key={item.pregunta}>
                <h3>
                  <button
                    id={idBoton}
                    type="button"
                    aria-expanded={open}
                    aria-controls={idPanel}
                    onClick={() => setAbierta(open ? null : i)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-6 py-4 text-left text-[17px] font-bold text-mundo-dark focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-mundo-blue"
                  >
                    {item.pregunta}
                    <ChevronDown
                      aria-hidden
                      className={`size-5 shrink-0 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={idPanel}
                  role="region"
                  aria-labelledby={idBoton}
                  hidden={!open}
                  className="space-y-3 px-6 pb-6"
                >
                  {item.respuesta.map((parrafo) => (
                    <p key={parrafo} className="text-[16px] leading-relaxed text-gray-600">
                      {parrafo}
                    </p>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
