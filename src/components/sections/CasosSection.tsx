import Link from "next/link";
import Image from "next/image";
import { casos } from "@/content/data/casos";
import { StackPill } from "@/components/ui/StackPill";

const headerBg = {
  teal:   "linear-gradient(135deg, #E6FAF8 0%, #D8F5F2 100%)",
  blue:   "linear-gradient(135deg, #EEF4FF 0%, #E8F0FD 100%)",
  purple: "linear-gradient(135deg, #F0EFFF 0%, #EAE8FE 100%)",
};
const industryColor = {
  teal:   "text-[#0A9B8C]",
  blue:   "text-mundo-blue",
  purple: "text-mundo-purple",
};
const metricColor = {
  teal:   "text-mundo-teal",
  blue:   "text-mundo-blue",
  purple: "text-mundo-purple",
};

export function CasosSection() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden" id="casos">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <Image src="/isotipo-separador.svg" alt="" width={26} height={26} className="mb-2.5" />
          <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-3">Casos de éxito</p>
          <h2 className="text-4xl md:text-5xl font-black text-mundo-dark leading-tight mb-4">
            Resultados reales,<br />
            <span className="text-mundo-blue">no promesas</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
            Cada proyecto tiene métricas concretas. Esto es lo que hemos construido para nuestros clientes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {casos.map((c) => (
            <div key={c.slug} className="flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]">
              {/* Card header */}
              <div className="px-7 pt-7 pb-6" style={{ background: headerBg[c.color] }}>
                <div className={`text-[11px] font-bold uppercase tracking-widest mb-2 ${industryColor[c.color]}`}>{c.industry}</div>
                <div className="text-[20px] font-extrabold text-mundo-dark mb-1">{c.nombre}</div>
                <div className="text-[13px] text-gray-600 mb-5">{c.tagline}</div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-[42px] font-black leading-none ${metricColor[c.color]}`}>{c.metricNum}</span>
                  <span className="text-[14px] text-gray-600 font-medium max-w-[120px] leading-snug">{c.metricLabel}</span>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 gap-4 px-7 py-6">
                <div className="flex gap-5">
                  {c.minis.map((m) => (
                    <div key={m.lbl}>
                      <div className="text-[22px] font-extrabold text-mundo-dark">{m.num}</div>
                      <div className="text-[12px] text-gray-400 mt-0.5">{m.lbl}</div>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-gray-200" />
                <p className="text-[14px] text-gray-600 leading-relaxed flex-1">{c.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {c.stack.map((s) => (
                    <StackPill key={s} name={s} size="sm" />
                  ))}
                </div>
              </div>

              {/* Card footer */}
              <div className="px-7 pb-6 flex justify-end">
                <Link href={`/casos/${c.slug}`} className="text-[14px] font-semibold text-mundo-blue flex items-center gap-1 hover:gap-2 transition-all">
                  Ver caso completo →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
