"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CALENDARIO_URL } from "@/content/data/site";

const pasos = [
  {
    num: "01",
    label: "Entrada",
    titulo: "Tu hipótesis",
    desc: "Un problema de negocio, un proceso costoso, una idea que quieres probar antes de invertir en grande.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
        <path d="M9 18h6"/><path d="M10 22h4"/>
      </svg>
    ),
    highlight: false,
  },
  {
    num: "02",
    label: "Arquitectura",
    titulo: "Simulamos tu operación",
    desc: "Construimos una arquitectura funcional completa: datos en Airtable, flujos en Make, procesos en Monday, inteligencia con la IA adecuada.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9A1 1 0 0 0 21.4 6.07z"/>
        <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"/>
        <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"/>
      </svg>
    ),
    highlight: false,
  },
  {
    num: "03",
    label: "Prueba",
    titulo: "Datos reales, resultado real",
    desc: "Corremos la solución con tu información. No una demo. Un sistema funcionando que genera métricas verificables.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/>
        <path d="M8.5 2h7"/><path d="M7 16h10"/>
      </svg>
    ),
    highlight: false,
  },
  {
    num: "04",
    label: "Decisión",
    titulo: "Validas y desplegás",
    desc: "Si la hipótesis se confirma, el sistema ya está construido y listo para producción. Si no, aprendiste sin haber invertido en una implementación completa.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#04BCA6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <path d="m9 11 3 3L22 4"/>
      </svg>
    ),
    highlight: true,
  },
];

const stackItems = [
  { logo: "/airtable-isotipo.svg", nombre: "Airtable", desc: "Base de datos flexible — captura y estructura los datos del experimento" },
  { logo: "/make-isotipo.svg",     nombre: "Make.com",  desc: "Motor de automatización — orquesta los flujos y conecta los sistemas" },
  { logo: "/monday-isotipo.svg",   nombre: "Monday.com",desc: "Gestión del proceso — visibilidad y control del flujo de trabajo" },
];

const diferenciadores = [
  "No es una demo ni un piloto genérico. Es tu proceso real corriendo con IA.",
  "Si la hipótesis valida, el sistema ya está construido. Sin re-trabajo.",
  "Si no valida, aprendiste rápido y barato, sin comprometer un presupuesto completo.",
  "Seleccionamos la IA que mejor resuelve tu caso — no la que está de moda.",
];

export function IALabSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isotipoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const isotipo = isotipoRef.current;
    if (!section || !isotipo) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let rafId: number | null = null;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.06);
      currentY = lerp(currentY, targetY, 0.06);
      isotipo.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;
      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      targetX = dx * -28;
      targetY = dy * -18;
      if (!rafId) animate();
    };

    const onMouseLeave = () => { targetX = 0; targetY = 0; };

    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);
    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24" style={{ background: "#23274C" }} id="ia-lab">
      {/* Isotipo flotante con parallax */}
      <svg
        ref={isotipoRef}
        aria-hidden
        className="absolute pointer-events-none"
        style={{ left: -60, top: -60, width: 680, height: 497, opacity: 0.12, transition: "transform 0.12s ease-out", willChange: "transform" }}
        viewBox="0 0 238 174"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fillRule="evenodd" d="M0 0 C1.63751334 -0.00644116 3.27502558 -0.01317046 4.91253662 -0.02017212 C8.3351101 -0.03209938 11.75758301 -0.03585771 15.18017578 -0.03466797 C19.53176057 -0.03446515 23.88268961 -0.0617492 28.23411942 -0.09621239 C31.61453114 -0.11862465 34.99478867 -0.12250115 38.37526703 -0.12144852 C39.97779344 -0.12378368 41.58032548 -0.13248729 43.1827774 -0.14811325 C59.01024127 -0.28799975 72.06672694 2.54267571 83.921875 13.7109375 C92.65666973 22.9309986 96.58780425 34.34174195 96.390625 47.03515625 C95.12482631 60.34864605 89.81399707 70.2557796 80.171875 79.3359375 C68.18490005 88.91833963 55.23003429 89.80157757 40.453125 89.734375 C38.86234403 89.73640224 37.27156397 89.73931904 35.68078613 89.74307251 C32.36603849 89.74746538 29.05153535 89.74116389 25.73681641 89.72705078 C21.5209328 89.7099606 17.30562248 89.71981826 13.08975983 89.73776817 C9.81060589 89.74868888 6.53158441 89.74512204 3.25242615 89.7373848 C1.69933502 89.73540559 0.14623124 89.73776036 -1.40684509 89.74482346 C-17.75466523 89.80288273 -31.70883204 87.18591284 -43.828125 75.3359375 C-52.44254554 65.26369194 -55.63671735 54.20943009 -55.203125 41.0390625 C-53.99543098 29.11308401 -49.36616265 19.46320839 -40.58984375 11.23828125 C-28.09666346 1.07543511 -15.55168434 0.01445671 0 0 Z M-23.88671875 32.15234375 C-24.34175781 32.72855469 -24.79679687 33.30476563 -25.265625 33.8984375 C-25.73871094 34.47722656 -26.21179688 35.05601563 -26.69921875 35.65234375 C-29.50961927 39.84363311 -29.26903751 44.49421904 -28.828125 49.3359375 C-27.03868596 54.70425462 -23.52833735 58.3058977 -18.828125 61.3359375 C-14.49072598 63.03718114 -10.86202392 63.59173353 -6.21533203 63.6105957 C-4.92023712 63.62012772 -3.62514221 63.62965973 -2.290802 63.63948059 C-0.88918022 63.63921911 0.51244157 63.6382818 1.9140625 63.63671875 C3.36605958 63.64061086 4.81805554 63.64494659 6.27005005 63.64970398 C9.30783789 63.65714757 12.34550948 65.65688874 15.38330078 63.65161133 C19.25895407 63.64582283 23.13412849 63.66274133 27.00970268 63.685956 C30.00732158 63.70075337 33.00482678 63.70155687 36.00247574 63.69844627 C37.43049186 63.6989566 38.85851484 63.7041396 40.28649521 63.71425819 C49.69479529 63.77274357 56.49642775 63.42349701 64.484375 58.1484375 C68.27737405 54.17901988 70.04095308 50.55443464 70.265625 45.03125 C69.83035067 38.56742623 67.52163376 34.50494559 62.734375 30.0859375 C57.9637518 26.82795092 54.1515195 26.08225755 48.3972168 26.04541016 C47.73634064 26.03869293 47.07546448 26.03197571 46.39456177 26.02505493 C44.21999492 26.00613126 42.04573771 26.00215347 39.87109375 26 C38.35040666 25.99356746 36.82972079 25.98683877 35.30903625 25.97982788 C32.12404514 25.96786871 28.93916237 25.96414558 25.75415039 25.96533203 C21.68891593 25.96553499 17.62438238 25.93825155 13.55931377 25.90378761 C10.41843018 25.8814599 7.2777136 25.87749629 4.1367588 25.87855148 C2.63895061 25.87620363 1.14113724 25.86742637 -0.35659218 25.85188675 C-9.47850217 25.76611308 -16.7190614 25.8279402 -23.88671875 32.15234375 Z" fill="white" transform="translate(99.828125,51.6640625)" />
        <path d="M0 0 C0 12.87 0 25.74 0 39 C-7.97398099 38.00325238 -10.99744078 37.25277249 -16.25 31.5625 C-19.91916688 26.18979135 -20.85822356 21.42594892 -20 15 C-17.84617678 8.15916374 -13.88725222 4.55100927 -8 0.6875 C-6 0 -6 0 0 0 Z" fill="white" transform="translate(39,77)" />
        <path d="M0 0 C10.56535378 1.32066922 10.56535378 1.32066922 15.48046875 6.5859375 C19.3277985 11.69415683 19.74657633 16.58554522 19.484375 22.87109375 C18.53580019 28.99858105 15.77990428 32.45741629 11.1875 36.4375 C8 38 8 38 0 39 C0 26.13 0 13.26 0 0 Z" fill="white" transform="translate(202,77)" />
        <path d="M0 0 C3.37219656 2.75281352 4.66732232 4.17027277 5.4375 8.40625 C5.71055638 14.0721698 4.83669842 17.6152018 1 22 C-3.46792538 24.97861692 -7.76360556 24.73309522 -13 24 C-16.43477349 22.36374963 -18.39279152 19.95041328 -20.4375 16.75 C-21.27367884 12.66201457 -21.12502543 9.02525333 -20 5 C-14.68589079 -2.13608951 -7.95942655 -3.27741093 0 0 Z" fill="white" transform="translate(146,85)" />
        <path d="M0 0 C3.37219656 2.75281352 4.66732232 4.17027277 5.4375 8.40625 C5.71055638 14.0721698 4.83669842 17.6152018 1 22 C-3.46792538 24.97861692 -7.76360556 24.73309522 -13 24 C-16.43477349 22.36374963 -18.39279152 19.95041328 -20.4375 16.75 C-21.2817144 12.62272961 -21.34486948 9.02753017 -20 5 C-14.42554614 -2.01914217 -8.18298263 -3.13050047 0 0 Z" fill="white" transform="translate(110,85)" />
        <path d="M0 0 C1.85988065 3.09980108 2.21586624 6.33121677 2.125 9.875 C0.26298176 14.96451652 -4.37081379 18.9955381 -8.875 21.875 C-12.02164822 22.74264197 -13.52508074 22.4790838 -16.875 21.875 C-19.6850346 20.08136089 -21.38440468 18.85619065 -22.875 15.875 C-23.26864927 11.7810476 -23.16343277 9.4296784 -21.25 5.75 C-18.24117819 2.10774202 -15.25876907 -0.97156335 -10.9375 -3.0625 C-6.97744602 -3.18250164 -3.37945632 -2.02767379 0 0 Z" fill="white" transform="translate(130.875,24.125)" />
      </svg>

      {/* Blobs de fondo */}
      <div className="absolute pointer-events-none" style={{ top: -100, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(81,62,245,.25) 0%, transparent 65%)" }} />
      <div className="absolute pointer-events-none" style={{ bottom: -80, left: -60, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(4,188,166,.15) 0%, transparent 65%)" }} />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-4 py-1.5 text-[12px] font-bold text-white/80 uppercase tracking-widest mb-6">
            🧪 Producto Flagship
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-5">IA Lab</h2>
          <p className="text-xl font-semibold text-white/70 leading-snug mb-4">
            Del problema a la prueba. De la prueba a producción.
          </p>
          <p className="text-[16px] text-white/50 leading-relaxed">
            Traes una hipótesis de negocio o un proceso que quieres transformar con IA. Nosotros construimos la arquitectura completa, la probamos con datos reales, y al final sabes si funciona — y si funciona, queda implementado.
          </p>
        </div>

        {/* 4 pasos */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {/* Línea conectora */}
          <div className="absolute hidden md:block" style={{ top: 40, left: "12.5%", right: "12.5%", height: 1, background: "linear-gradient(90deg, transparent, rgba(4,188,166,.5), rgba(4,188,166,.5), transparent)", zIndex: 0 }} />

          {pasos.map((p) => (
            <div key={p.num} className="text-center px-2 relative z-10">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={p.highlight
                  ? { background: "rgba(4,188,166,.15)", border: "1px solid rgba(4,188,166,.3)" }
                  : { background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)" }
                }
              >
                {p.icon}
              </div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-mundo-teal mb-2">
                {p.num} · {p.label}
              </div>
              <div className="text-[16px] font-bold text-white mb-2">{p.titulo}</div>
              <div className="text-[13px] text-white/50 leading-relaxed">{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Stack + diferenciadores */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Stack */}
          <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
            <p className="text-[12px] font-bold uppercase tracking-widest text-white/35 mb-5">Columna vertebral del Lab</p>
            <div className="flex flex-col gap-4">
              {stackItems.map(({ logo, nombre, desc }) => (
                <div key={nombre} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center flex-shrink-0 p-2" style={{ border: "1px solid rgba(255,255,255,.15)" }}>
                    <Image src={logo} alt={nombre} width={28} height={28} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-white">{nombre}</div>
                    <div className="text-[12px] text-white/45">{desc}</div>
                  </div>
                </div>
              ))}
              <div className="h-px my-1" style={{ background: "rgba(255,255,255,.07)" }} />
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-[12px] text-white/40">+ IA según el caso:</span>
                {["/claude.svg", "/gemini.svg", "/openai.svg"].map((src) => (
                  <div key={src} className="w-9 h-9 rounded-lg bg-white flex items-center justify-center p-1.5" style={{ border: "1px solid rgba(255,255,255,.2)" }}>
                    <Image src={src} alt="" width={24} height={24} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Diferenciadores + CTA */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl p-7 flex-1" style={{ background: "rgba(4,188,166,.08)", border: "1px solid rgba(4,188,166,.2)" }}>
              <p className="text-[12px] font-bold uppercase tracking-widest text-mundo-teal mb-4">¿Qué lo diferencia?</p>
              <div className="flex flex-col gap-3">
                {diferenciadores.map((d) => (
                  <div key={d} className="flex gap-2.5 text-[14px] text-white/75 leading-snug">
                    <span className="text-mundo-teal flex-shrink-0">→</span>
                    {d}
                  </div>
                ))}
              </div>
            </div>
            <Link
              href={CALENDARIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-white text-mundo-dark font-semibold text-[15px] px-7 py-4 rounded-full hover:bg-gray-100 transition-colors"
            >
              Llevar mi hipótesis al IA Lab →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
