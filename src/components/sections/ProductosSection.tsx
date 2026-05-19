"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { productos } from "@/content/data/productos";
import type { Producto } from "@/content/data/productos";

const colorMap = {
  blue:    { header: "linear-gradient(135deg, #23274C 0%, #176BEC 100%)", dot: "#176BEC" },
  teal:    { header: "linear-gradient(135deg, #23274C 0%, #04BCA6 100%)", dot: "#04BCA6" },
  purple:  { header: "linear-gradient(135deg, #23274C 0%, #513EF5 100%)", dot: "#513EF5" },
  lavender:{ header: "linear-gradient(135deg, #23274C 0%, #6F6DFB 100%)", dot: "#6F6DFB" },
};

function DecoShapes({ id }: { id: string }) {
  if (id === "knowledge-engine") return (
    <>
      <div className="absolute pointer-events-none rounded-full" style={{ width:80,height:80,background:"rgba(255,255,255,.13)",top:-26,right:-18 }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width:44,height:44,background:"rgba(255,255,255,.09)",top:38,right:48 }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width:54,height:20,borderRadius:99,background:"rgba(255,255,255,.07)",bottom:20,right:18 }} />
    </>
  );
  if (id === "support-engine") return (
    <>
      <div className="absolute pointer-events-none rounded-full" style={{ width:90,height:90,background:"rgba(255,255,255,.12)",top:"50%",right:-45,transform:"translateY(-50%)" }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width:52,height:52,background:"rgba(255,255,255,.08)",bottom:-26,right:42 }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width:13,height:13,background:"rgba(255,255,255,.20)",top:20,right:26 }} />
    </>
  );
  if (id === "ia-lab") return (
    <>
      <div className="absolute pointer-events-none" style={{ width:108,height:44,borderRadius:99,background:"rgba(255,255,255,.11)",bottom:12,right:-16,transform:"rotate(-7deg)" }} />
      <div className="absolute pointer-events-none" style={{ width:60,height:22,borderRadius:99,background:"rgba(255,255,255,.08)",bottom:20,right:18,transform:"rotate(-7deg)" }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width:15,height:20,background:"rgba(255,255,255,.22)",top:12,right:40 }} />
    </>
  );
  if (id === "signal-engine") return (
    <>
      <div className="absolute pointer-events-none" style={{ width:116,height:44,borderRadius:99,background:"rgba(255,255,255,.12)",top:8,right:-22,transform:"rotate(11deg)" }} />
      <div className="absolute pointer-events-none" style={{ width:70,height:26,borderRadius:99,background:"rgba(255,255,255,.08)",bottom:18,right:12,transform:"rotate(-5deg)" }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width:11,height:11,background:"rgba(255,255,255,.24)",top:28,right:54 }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width:7,height:7,background:"rgba(255,255,255,.16)",bottom:28,right:46 }} />
    </>
  );
  return null;
}

function ProductCard({ producto }: { producto: Producto }) {
  const colors = colorMap[producto.color];
  return (
    <div className="flex flex-col rounded-3xl border border-gray-200 bg-white overflow-hidden flex-shrink-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(23,39,76,0.10)]">
      {/* Header */}
      <div className="relative overflow-hidden px-9 pt-9 pb-7" style={{ background: colors.header }}>
        <DecoShapes id={producto.id} />
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 mb-5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide text-white/90" style={{ background: "rgba(255,255,255,.15)" }}>
          {producto.numero === "03" && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          )}
          Producto {producto.numero}
        </div>
        {producto.id === "ia-lab" && (
          <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide text-white/80" style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.15)" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            Engagement de 90 días
          </div>
        )}
        <div className="text-[26px] font-extrabold text-white leading-tight mb-2.5">{producto.nombre}</div>
        <div className="text-[14px] text-white/75 leading-snug">{producto.tagline}</div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 gap-6 px-9 py-7">
        <p className="text-[15px] text-gray-600 leading-relaxed">{producto.descripcion}</p>
        <div className="flex flex-col gap-2.5">
          {producto.features.map((f) => (
            <div key={f} className="flex items-start gap-2.5 text-[14px] text-mundo-dark leading-snug">
              <span className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: colors.dot }} />
              {f}
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-xl px-4 py-3.5 flex flex-wrap gap-2 items-center">
          <span className="w-full text-[11px] font-bold uppercase tracking-wide text-gray-400 mb-1">{producto.addons.label}</span>
          {producto.addons.items.map((item) => (
            <span key={item} className="text-[12px] font-semibold text-gray-600 bg-white border border-gray-200 rounded-md px-2.5 py-1">{item}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-9 pb-9 flex justify-end">
        <Link href={`/productos#${producto.id}`} className="inline-flex items-center gap-1.5 bg-mundo-blue text-white text-[14px] font-semibold px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors">
          Ver más información
        </Link>
      </div>
    </div>
  );
}

export function ProductosSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const GAP = 24;
  const total = productos.length;

  const perView = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const calcWidths = useCallback(() => {
    if (!viewportRef.current) return;
    const vw = viewportRef.current.offsetWidth;
    const pv = perView();
    setCardWidth(Math.floor((vw - (pv - 1) * GAP) / pv));
  }, []);

  useEffect(() => {
    calcWidths();
    window.addEventListener("resize", calcWidths);
    return () => window.removeEventListener("resize", calcWidths);
  }, [calcWidths]);

  useEffect(() => {
    if (!trackRef.current || cardWidth === 0) return;
    trackRef.current.style.transform = `translateX(-${current * (cardWidth + GAP)}px)`;
  }, [current, cardWidth]);

  const maxIndex = total - perView();
  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(maxIndex, c + 1));

  return (
    <section className="bg-gray-50 py-24 relative overflow-hidden" id="productos">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <Image src="/isotipo-separador.svg" alt="" width={26} height={26} className="mb-2.5" />
          <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-3">Productos IA</p>
          <h2 className="text-4xl md:text-5xl font-black text-mundo-dark leading-tight mb-5">
            Construido, probado, roto<br className="hidden md:block" /> y mejorado.{" "}
            <span className="text-mundo-blue">Antes de llegar a ti.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Cada producto carga con arquitectura real, integraciones en producción y decisiones que solo se aprenden ejecutando. No vendemos el proceso — vendemos el resultado de haberlo hecho antes.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <button onClick={prev} disabled={current === 0} aria-label="Anterior"
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center disabled:opacity-30 hover:not-disabled:border-mundo-blue transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#23274C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={next} disabled={current >= maxIndex} aria-label="Siguiente"
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center disabled:opacity-30 hover:not-disabled:border-mundo-blue transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#23274C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          <div ref={viewportRef} className="overflow-hidden">
            <div ref={trackRef} className="flex" style={{ gap: GAP, transition: "transform .45s cubic-bezier(.25,.46,.45,.94)" }}>
              {productos.map((p) => (
                <div key={p.id} style={{ width: cardWidth, minWidth: cardWidth, flexShrink: 0 }}>
                  <ProductCard producto={p} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-7">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Ir al producto ${i + 1}`}
                className="h-2 rounded-full transition-all duration-300 border-none"
                style={{ width: i === current ? 24 : 8, background: i === current ? "#176BEC" : "#E5E8F0" }}
              />
            ))}
          </div>
        </div>

        {/* Nota arquitectura */}
        <div className="mt-8 flex items-center gap-5 bg-white rounded-2xl border border-gray-200 px-8 py-6">
          <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(23,107,236,.08)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#176BEC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </div>
          <p className="text-[14px] text-gray-600 leading-relaxed">
            <strong className="text-mundo-dark">Arquitectura abierta.</strong> Cada producto se construye sobre plataformas que el cliente contrata directamente — sin markup de licencias. El costo operativo crece en proporción al uso real, no a nuestra tarifa.
          </p>
        </div>
      </div>
    </section>
  );
}
