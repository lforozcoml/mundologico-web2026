"use client";

import { m } from "framer-motion";
import { Check, Clock, Plus } from "lucide-react";
import { CALENDARIO_URL } from "@/content/data/site";
import { soporte } from "@/content/data/ecommerce-shopify";

/** Colores de marca con texto blanco AA (4.5:1 o más). */
const SEGMENTOS_COLOR = ["#176BEC", "#513EF5", "#037F70"] as const;

const lista = new Intl.ListFormat("es", { style: "long", type: "conjunction" });
/** Descripción para lectores de pantalla, armada con los mismos textos de la ilustración. */
const descripcionIlustracion = `${soporte.ilustracion.paquete}: ${lista.format(
  soporte.ilustracion.segmentos.map((s) => s.toLocaleLowerCase("es")),
)}. ${soporte.ilustracion.aparte}.`;

function BolsaDeHoras() {
  const { paquete, segmentos, aparte } = soporte.ilustracion;
  return (
    <>
      <p className="sr-only">{descripcionIlustracion}</p>
      <div aria-hidden className="relative">
        <div
          className="absolute -inset-4 -z-10 rounded-[2rem] opacity-60 blur-2xl"
          style={{ background: "radial-gradient(circle at 30% 30%, rgba(23,107,236,0.18), transparent 60%)" }}
        />
        <m.div
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_12px_32px_rgba(35,39,76,0.10)] md:p-8"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-5 text-[16px] font-extrabold text-mundo-dark">{paquete}</p>
          <div className="flex gap-1 overflow-hidden rounded-xl">
            {segmentos.map((s, i) => (
              <m.span
                key={s}
                className="flex min-h-14 min-w-0 flex-1 items-center justify-center px-2 text-center text-[13px] font-bold leading-tight text-white sm:text-[14px]"
                style={{ background: SEGMENTOS_COLOR[i % SEGMENTOS_COLOR.length] }}
                initial={{ y: 12 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
              >
                {s}
              </m.span>
            ))}
          </div>
        </m.div>
        <m.div
          className="mt-5 flex items-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 bg-white/70 px-5 py-4 text-[15px] font-semibold text-gray-700"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Plus className="size-5 shrink-0 text-mundo-purple" />
          {aparte}
        </m.div>
      </div>
    </>
  );
}

export function SoporteMensual() {
  return (
    <section id={soporte.id} className="scroll-mt-24 overflow-x-clip py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="mb-4 text-3xl font-black leading-tight text-mundo-dark md:text-4xl">{soporte.titulo}</h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-600">{soporte.intro}</p>

          <div className="mb-6">
            <h3 className="mb-3 text-[17px] font-extrabold text-mundo-dark">{soporte.dentroTitulo}</h3>
            <ul className="flex flex-wrap gap-2">
              {soporte.dentro.map((d) => (
                <li
                  key={d}
                  className="inline-flex items-center gap-2 rounded-full bg-mundo-teal/10 px-4 py-2 text-[15px] font-semibold text-mundo-dark"
                >
                  <Check aria-hidden className="size-4 shrink-0 text-[#037F70]" strokeWidth={3} />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6 flex gap-3">
            <Plus aria-hidden className="mt-1 size-5 shrink-0 text-mundo-purple" />
            <div>
              <h3 className="text-[17px] font-extrabold text-mundo-dark">{soporte.aparteTitulo}</h3>
              <p className="text-[16px] leading-relaxed text-gray-600">{soporte.aparteTexto}</p>
            </div>
          </div>

          <div className="mb-10 flex gap-3">
            <Clock aria-hidden className="mt-1 size-5 shrink-0 text-mundo-blue" />
            <div>
              <h3 className="text-[17px] font-extrabold text-mundo-dark">{soporte.respuestaTitulo}</h3>
              <p className="text-[16px] leading-relaxed text-gray-600">{soporte.respuestaTexto}</p>
            </div>
          </div>

          <a
            href={CALENDARIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center rounded-full bg-mundo-dark px-7 text-base font-semibold text-white transition-colors hover:bg-mundo-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-blue"
          >
            {soporte.cta}
          </a>
          <p className="mt-3 text-[15px] text-gray-600">{soporte.apoyo}</p>
        </div>

        <BolsaDeHoras />
      </div>
    </section>
  );
}
