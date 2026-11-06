"use client";

import { m } from "framer-motion";
import { Check, Gauge, LifeBuoy, Store, type LucideIcon } from "lucide-react";
import { formas, type IconoForma } from "@/content/data/ecommerce-shopify";

const ICONOS: Record<IconoForma, LucideIcon> = { store: Store, gauge: Gauge, lifebuoy: LifeBuoy };
const COLORES = ["#176BEC", "#04BCA6", "#513EF5"] as const;
/** Versión del color para texto sobre blanco con contraste AA (el teal no alcanza 4.5:1). */
const COLORES_TEXTO = ["#176BEC", "#037F70", "#513EF5"] as const;

/** Ilustraciones propias, decorativas. */
function Ilustracion({ icono, color }: { icono: IconoForma; color: string }) {
  if (icono === "store") {
    return (
      <svg viewBox="0 0 160 90" className="h-24 w-full" aria-hidden>
        <rect x="20" y="30" width="120" height="52" rx="8" fill={color} opacity=".12" />
        <path d="M14 30 L30 10 H130 L146 30 Z" fill={color} opacity=".85" />
        <rect x="34" y="44" width="34" height="38" rx="4" fill={color} opacity=".35" />
        <rect x="80" y="44" width="46" height="22" rx="4" fill="#fff" stroke={color} strokeWidth="2" />
        <circle cx="96" cy="55" r="4" fill={color} />
        <rect x="104" y="52" width="16" height="6" rx="3" fill={color} opacity=".4" />
      </svg>
    );
  }
  if (icono === "gauge") {
    return (
      <svg viewBox="0 0 160 90" className="h-24 w-full" aria-hidden>
        <path d="M30 78 A50 50 0 0 1 130 78" fill="none" stroke={color} strokeOpacity=".15" strokeWidth="14" strokeLinecap="round" />
        <path d="M30 78 A50 50 0 0 1 108 37" fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" />
        <line x1="80" y1="78" x2="106" y2="48" stroke="#23274C" strokeWidth="4" strokeLinecap="round" />
        <circle cx="80" cy="78" r="7" fill="#23274C" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 90" className="h-24 w-full" aria-hidden>
      <circle cx="80" cy="46" r="36" fill="none" stroke={color} strokeOpacity=".2" strokeWidth="12" />
      <path d="M80 10 A36 36 0 0 1 116 46" fill="none" stroke={color} strokeWidth="12" />
      <path d="M44 46 A36 36 0 0 1 80 10" fill="none" stroke={color} strokeOpacity=".55" strokeWidth="12" />
      <path d="M80 82 A36 36 0 0 1 44 46" fill="none" stroke={color} strokeWidth="12" />
      <circle cx="80" cy="46" r="14" fill="#fff" stroke="#23274C" strokeWidth="3" />
    </svg>
  );
}

export function FormasTrabajo() {
  const total = formas.peldanos.length;
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-4 max-w-2xl text-3xl font-black leading-tight text-mundo-dark md:text-4xl">{formas.titulo}</h2>
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-gray-600">{formas.intro}</p>

        <ol className="grid gap-6 md:grid-cols-3">
          {formas.items.map((f, i) => {
            const Icono = ICONOS[f.icono];
            const color = COLORES[i % COLORES.length];
            const colorTexto = COLORES_TEXTO[i % COLORES_TEXTO.length];
            return (
              <m.li
                key={f.titulo}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Ilustracion icono={f.icono} color={color} />
                <p
                  className="mt-5 text-[13px] font-extrabold uppercase tracking-widest"
                  style={{ color: colorTexto }}
                >
                  {f.eyebrow}
                </p>
                <div className="mt-2 mb-4 flex items-center gap-3">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{ background: color }}
                  >
                    <Icono aria-hidden className="size-5" />
                  </span>
                  <h3 className="text-xl font-extrabold leading-snug text-mundo-dark">{f.titulo}</h3>
                </div>
                <div className="mb-4 rounded-xl bg-gray-50 px-4 py-3">
                  <p className="mb-1 text-[12px] font-bold uppercase tracking-wider text-gray-600">Para quién</p>
                  <p className="text-[15px] leading-relaxed text-mundo-dark">{f.paraQuien}</p>
                </div>
                <p className="mb-5 text-[16px] leading-relaxed text-gray-600">{f.descripcion}</p>
                <p className="mb-3 text-[13px] font-bold uppercase tracking-wider text-mundo-dark">Qué recibes</p>
                <ul className="grid gap-2.5">
                  {f.recibes.map((r) => (
                    <li key={r} className="flex gap-2.5 text-[15px] leading-relaxed text-gray-600">
                      <Check aria-hidden className="mt-1 size-4 shrink-0" style={{ color: colorTexto }} strokeWidth={3} />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </m.li>
            );
          })}
        </ol>

        <div className="mt-16 grid items-end gap-10 md:grid-cols-[1fr_1.2fr]">
          <p className="text-xl font-bold leading-snug text-mundo-dark md:text-2xl">{formas.cierre}</p>
          <ol className="flex items-end gap-2 sm:gap-3" aria-label="Escalera de trabajo">
            {formas.peldanos.map((p, i) => (
              <m.li
                key={p}
                className="flex flex-1 flex-col justify-end"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.15 }}
              >
                <span className="mb-2 text-center text-[13px] font-bold text-mundo-dark sm:text-[15px]">{p}</span>
                <span
                  aria-hidden
                  className="block rounded-t-xl"
                  style={{
                    height: `${40 + i * 32}px`,
                    background: `linear-gradient(180deg, ${["#176BEC", "#6F6DFB", "#513EF5", "#04BCA6"][i % 4]} 0%, #23274C 140%)`,
                    opacity: 0.55 + (i / Math.max(total - 1, 1)) * 0.45,
                  }}
                />
              </m.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
