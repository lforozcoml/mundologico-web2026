import Image from "next/image";
import Link from "next/link";

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
  return (
    <section className="relative overflow-hidden py-24" style={{ background: "#23274C" }} id="ia-lab">
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
              href="/#contacto"
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
