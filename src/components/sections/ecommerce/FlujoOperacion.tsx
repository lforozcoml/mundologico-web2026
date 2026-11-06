"use client";

import { m, useReducedMotion } from "framer-motion";
import { CreditCard, FileText, Package, Store, UserRound, Warehouse, type LucideIcon } from "lucide-react";
import { operacion, type ModuloOperacion } from "@/content/data/ecommerce-shopify";

const ICONOS: LucideIcon[] = [Store, Package, CreditCard, Warehouse, FileText, UserRound];

// Recorrido en zigzag de 3 columnas x 2 filas para que quepa en celular.
const NODOS = [
  { x: 60, y: 60 },
  { x: 200, y: 60 },
  { x: 340, y: 60 },
  { x: 340, y: 180 },
  { x: 200, y: 180 },
  { x: 60, y: 180 },
];
const RUTA = "M60 60 H340 V180 H60";
const LARGO = 280 + 120 + 280;

/** Solo se monta si hay al menos un módulo activo (lo decide la página). */
export function FlujoOperacion({ modulos }: { modulos: readonly ModuloOperacion[] }) {
  const reducir = useReducedMotion();
  return (
    <section className="bg-mundo-dark py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-3xl font-black leading-tight md:text-4xl">{operacion.titulo}</h2>
          <p className="mb-4 text-lg text-white/80">{operacion.intro}</p>
          <ul className="mb-6 grid gap-3">
            {modulos.map((mod) => (
              <li key={mod.id} className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-[16px] leading-relaxed">
                {mod.texto}
              </li>
            ))}
          </ul>
          <p className="text-[14px] text-white/70">{operacion.nota}</p>
        </div>

        <figure>
          <svg viewBox="0 0 400 240" className="w-full" role="img" aria-label={`Flujo: ${operacion.flujo.join(", ")}`}>
            <path d={RUTA} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="4" strokeLinecap="round" />
            <m.path
              d={RUTA}
              fill="none"
              stroke="#04BCA6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={reducir ? undefined : `40 ${LARGO - 40}`}
              initial={{ strokeDashoffset: 0 }}
              animate={reducir ? undefined : { strokeDashoffset: -LARGO }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            />
            {operacion.flujo.map((paso, i) => {
              const n = NODOS[i];
              const Icono = ICONOS[i % ICONOS.length];
              return (
                <g key={paso}>
                  <circle cx={n.x} cy={n.y} r="26" fill="#23274C" stroke="#176BEC" strokeWidth="2" />
                  <foreignObject x={n.x - 12} y={n.y - 12} width="24" height="24">
                    <Icono aria-hidden className="size-6 text-white" />
                  </foreignObject>
                  <text x={n.x} y={n.y + 46} textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">
                    {paso}
                  </text>
                </g>
              );
            })}
          </svg>
        </figure>
      </div>
    </section>
  );
}
