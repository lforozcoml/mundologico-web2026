"use client";

import { m } from "framer-motion";
import { embudo } from "@/content/data/ecommerce-shopify";

// Fondo y texto con contraste AA (blanco sobre teal no alcanza 4.5:1).
const ESTILOS = [
  { bg: "#23274C", fg: "#FFFFFF" },
  { bg: "#176BEC", fg: "#FFFFFF" },
  { bg: "#513EF5", fg: "#FFFFFF" },
  { bg: "#04BCA6", fg: "#23274C" },
];

/** Embudo decorativo sin números. Los anchos son ilustrativos. */
export function EmbudoIlustrativo() {
  const n = embudo.etapas.length;
  return (
    <figure className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
      <ol className="grid gap-2" aria-label={`Embudo ilustrativo: ${embudo.etapas.join(", ")}`}>
        {embudo.etapas.map((etapa, i) => {
          const ancho = 100 - (i * 60) / Math.max(n - 1, 1);
          return (
            <li key={etapa} className="flex justify-center">
              <m.div
                className="flex h-12 items-center justify-center rounded-xl text-[15px] font-bold"
                style={{
                  width: `${ancho}%`,
                  background: ESTILOS[i % ESTILOS.length].bg,
                  color: ESTILOS[i % ESTILOS.length].fg,
                  transformOrigin: "center",
                }}
                initial={{ scaleX: 0.4, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              >
                {etapa}
              </m.div>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-4 text-center text-[13px] text-gray-600">{embudo.leyenda}</figcaption>
    </figure>
  );
}
