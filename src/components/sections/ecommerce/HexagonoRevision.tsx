"use client";

import { useId, useState } from "react";
import { ChartLine, Funnel, Puzzle, Search, Smartphone, Workflow, type LucideIcon } from "lucide-react";
import { revision, type IconoFrente } from "@/content/data/ecommerce-shopify";

const ICONOS: Record<IconoFrente, LucideIcon> = {
  funnel: Funnel,
  smartphone: Smartphone,
  search: Search,
  puzzle: Puzzle,
  workflow: Workflow,
  chart: ChartLine,
};

const N = revision.frentes.length;
const R = 38; // radio en % del contenedor
/** Vértices del hexágono, empezando arriba y en sentido horario. */
const vertices = Array.from({ length: N }, (_, i) => {
  const a = (-90 + (360 / N) * i) * (Math.PI / 180);
  return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
});
const puntos = vertices.map((v) => `${v.x},${v.y}`).join(" ");

export function HexagonoRevision() {
  const [activo, setActivo] = useState(0);
  const base = useId();
  const idItem = (i: number) => `${base}-frente-${i}`;

  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div className="relative mx-auto aspect-square w-full max-w-[460px]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
          <defs>
            <linearGradient id={`${base}-g`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#176BEC" stopOpacity=".14" />
              <stop offset="1" stopColor="#04BCA6" stopOpacity=".14" />
            </linearGradient>
          </defs>
          <polygon points={puntos} fill={`url(#${base}-g)`} stroke="#176BEC" strokeOpacity=".35" strokeWidth=".6" />
          {vertices.map((v, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={v.x}
              y2={v.y}
              stroke={i === activo ? "#176BEC" : "#94A3B8"}
              strokeOpacity={i === activo ? 1 : 0.35}
              strokeWidth={i === activo ? 1.2 : 0.5}
              className="transition-all duration-300"
            />
          ))}
          <circle cx="50" cy="50" r="9" fill="#23274C" />
        </svg>
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[13px] font-black text-white"
        >
          {N}
        </span>

        {revision.frentes.map((f, i) => {
          const Icono = ICONOS[f.icono];
          const on = i === activo;
          return (
            <button
              key={f.titulo}
              type="button"
              aria-pressed={on}
              aria-describedby={idItem(i)}
              aria-label={f.titulo}
              onMouseEnter={() => setActivo(i)}
              onFocus={() => setActivo(i)}
              onClick={() => setActivo(i)}
              className={`absolute flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border-2 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mundo-blue md:size-16 ${
                on
                  ? "scale-110 border-mundo-blue bg-mundo-blue text-white shadow-[0_10px_30px_rgba(23,107,236,0.35)]"
                  : "border-gray-200 bg-white text-mundo-dark hover:border-mundo-blue"
              }`}
              style={{ left: `${vertices[i].x}%`, top: `${vertices[i].y}%` }}
            >
              <Icono aria-hidden className="size-6" />
            </button>
          );
        })}
      </div>

      <ol className="grid gap-2">
        {revision.frentes.map((f, i) => {
          const on = i === activo;
          return (
            <li
              key={f.titulo}
              id={idItem(i)}
              onMouseEnter={() => setActivo(i)}
              className={`rounded-xl border px-4 py-2.5 transition-colors duration-300 ${
                on ? "border-mundo-blue bg-white shadow-sm" : "border-transparent"
              }`}
            >
              <p className={`text-[16px] font-extrabold ${on ? "text-mundo-blue" : "text-mundo-dark"}`}>
                <span className="mr-2 text-gray-600">{i + 1}.</span>
                {f.titulo}
              </p>
              <p className="mt-0.5 text-[15px] font-semibold leading-snug text-mundo-dark">{f.pregunta}</p>
              <p className="mt-0.5 text-[15px] leading-relaxed text-gray-600">{f.descripcion}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
