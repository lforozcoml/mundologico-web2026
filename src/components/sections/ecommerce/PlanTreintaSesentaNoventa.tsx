"use client";

import { m } from "framer-motion";
import { revision } from "@/content/data/ecommerce-shopify";

/** Número decorativo de cada tramo. Es una etiqueta visual, no un dato. */
const TRAMOS = ["30", "60", "90"] as const;
const COLORES = ["#176BEC", "#513EF5", "#037F70"] as const;

export function PlanTreintaSesentaNoventa() {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {revision.plan.map((paso, i) => (
        <m.li
          key={paso.titulo}
          className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: i * 0.12 }}
        >
          <span
            aria-hidden
            className="mb-3 block text-5xl font-black leading-none"
            style={{ color: COLORES[i % COLORES.length] }}
          >
            {TRAMOS[i % TRAMOS.length]}
          </span>
          <h4 className="mb-2 text-lg font-extrabold text-mundo-dark">{paso.titulo}</h4>
          <p className="text-[15px] leading-relaxed text-gray-600">{paso.texto}</p>
        </m.li>
      ))}
    </ol>
  );
}
