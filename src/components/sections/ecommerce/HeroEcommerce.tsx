"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CreditCard, Headset, Package } from "lucide-react";
import { CALENDARIO_URL } from "@/content/data/site";
import { hero, visibleTiendas, capturaDe } from "@/content/data/ecommerce-shopify";
import { BrowserFrame } from "@/components/ui/BrowserFrame";

const ICONOS_ETIQUETA = [Package, CreditCard, Headset];
const POSICIONES = [
  "left-0 top-6 md:-left-8",
  "right-0 top-1/2 md:-right-6",
  "left-4 bottom-0 md:left-10 md:-bottom-6",
];

export function HeroEcommerce() {
  const ref = useRef<HTMLElement>(null);
  const reducir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMockup = useTransform(scrollYProgress, [0, 1], [0, reducir ? 0 : 60]);
  const yTarjetas = useTransform(scrollYProgress, [0, 1], [0, reducir ? 0 : -40]);

  const tienda = visibleTiendas().find((t) => capturaDe(t));
  const captura = tienda ? capturaDe(tienda) : undefined;

  return (
    <section ref={ref} className="relative overflow-hidden bg-mundo-dark pt-28 pb-20 md:pt-36 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 size-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(23,107,236,.30) 0%, rgba(4,188,166,.12) 60%, transparent 100%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-16 size-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(81,62,245,.25) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2">
        <div>
          <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl">{hero.h1}</h1>
          <p className="mb-8 text-lg leading-relaxed text-white/80">{hero.subtitulo}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={CALENDARIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center rounded-full bg-white px-7 text-base font-semibold text-mundo-dark transition-colors hover:bg-gray-100"
            >
              {hero.ctaPrincipal}
            </a>
            {tienda && (
              <a
                href={hero.ctaSecundario.href}
                className="inline-flex min-h-12 items-center rounded-full border border-white/30 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                {hero.ctaSecundario.label}
              </a>
            )}
          </div>
          <p className="mt-5 text-[15px] text-white/70">{hero.apoyo}</p>
        </div>

        <div className="relative px-2 py-8 md:px-6">
          <div
            aria-hidden
            className="absolute inset-0 rounded-[2rem]"
            style={{ background: "linear-gradient(135deg,#176BEC 0%,#513EF5 55%,#04BCA6 100%)", opacity: 0.85 }}
          />
          <m.div style={{ y: yMockup }} className="relative">
            {tienda && captura ? (
              <BrowserFrame dominio={tienda.dominios[0]}>
                <Image
                  src={captura.desktop.src}
                  width={captura.desktop.width}
                  height={captura.desktop.height}
                  alt={`${captura.alt}, en escritorio`}
                  sizes="(min-width: 1280px) 560px, (min-width: 768px) 45vw, 92vw"
                  priority
                  className="h-auto w-full"
                />
              </BrowserFrame>
            ) : (
              <BrowserFrame dominio="tutienda.com">
                <div className="aspect-[16/10] w-full bg-gradient-to-br from-gray-100 to-gray-200" />
              </BrowserFrame>
            )}
          </m.div>

          <m.ul style={{ y: yTarjetas }} className="pointer-events-none absolute inset-0" aria-label="Lo que conectamos">
            {hero.etiquetas.map((etiqueta, i) => {
              const Icono = ICONOS_ETIQUETA[i % ICONOS_ETIQUETA.length];
              return (
                <m.li
                  key={etiqueta}
                  className={`absolute ${POSICIONES[i % POSICIONES.length]} flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[14px] font-semibold text-mundo-dark shadow-[0_10px_30px_rgba(15,23,42,0.25)]`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: [0, -6, 0] }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.3 + i * 0.15 },
                    y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
                  }}
                >
                  <span className="flex size-7 items-center justify-center rounded-lg bg-mundo-teal/15 text-mundo-teal">
                    <Icono aria-hidden className="size-4" />
                  </span>
                  {etiqueta}
                </m.li>
              );
            })}
          </m.ul>
        </div>
      </div>
    </section>
  );
}
