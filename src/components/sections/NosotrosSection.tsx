import Image from "next/image";
import { partnerBadges } from "@/content/data/site";
import { inicio } from "@/content/data/i18n/inicio";
import { nosotros } from "@/content/data/i18n/nosotros";
import type { Idioma } from "@/lib/i18n/config";
import { PartnerBadge } from "@/components/ui/PartnerBadge";

const COLORES_PILAR = ["bg-mundo-blue", "bg-mundo-teal", "bg-mundo-purple"] as const;

export function NosotrosSection({ idioma }: { idioma: Idioma }) {
  const tx = nosotros[idioma];
  const cifras = inicio[idioma].cifras;
  const pillares = tx.pillares.map((text, i) => ({ text, color: COLORES_PILAR[i % COLORES_PILAR.length] }));
  return (
    <section className="py-24 overflow-hidden" id="nosotros">
      <div className="max-w-7xl mx-auto px-6">

        {/* Encabezado */}
        <div className="max-w-3xl mb-16">
          <Image src="/isotipo-separador.svg" alt="" width={26} height={26} className="mb-2.5" />
          <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-3">{tx.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-black text-mundo-dark leading-tight mb-5">
            {tx.h1.a}{" "}
            <span className="text-mundo-blue">{tx.h1.resaltado}</span>
          </h1>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
            {tx.intro}
          </p>
          <p className="text-[16px] text-gray-600 leading-relaxed">
            {tx.embebida.antes} <strong className="font-bold text-mundo-dark">{tx.embebida.resaltado}</strong>{tx.embebida.despues}
          </p>
        </div>

        {/* Cifras */}
        <div className="mb-16">
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl">
            {cifras.map(({ valor, label }) => (
              <div key={label} className="bg-gray-50 rounded-2xl border border-gray-200 px-7 py-6">
                <div className="text-[34px] font-black text-mundo-dark leading-none mb-2">{valor}</div>
                <div className="text-[14px] text-gray-600 leading-snug">{label}</div>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-gray-400 mt-4">
            {tx.cifrasNota}
          </p>
        </div>

        {/* Cómo trabajamos */}
        <div className="max-w-3xl mb-16">
          <div className="flex flex-col gap-3">
            {pillares.map(({ color, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className={`w-1 h-9 rounded-full flex-shrink-0 ${color}`} />
                <p className="text-[15px] text-mundo-dark font-semibold">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partners y certificaciones */}
        <div className="bg-gray-50 rounded-3xl border border-gray-200 p-12 mb-14">
          <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-5">{tx.partnersTitulo}</p>
          <div className="flex items-center gap-4 flex-wrap mb-6">
            {partnerBadges.map((badge) => (
              <PartnerBadge key={badge.alt} badge={badge} imgClassName="h-[76px] w-auto" titulo={inicio[idioma].hero.perfilPartner} />
            ))}
          </div>
          <p className="text-[15px] text-gray-600 leading-relaxed max-w-2xl">
            {tx.certificaciones}
          </p>
        </div>

        {/* Fundadores */}
        <div className="max-w-3xl">
          <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-5">{tx.fundadoresTitulo}</p>
          <div className="flex flex-col gap-4">
            {tx.fundadores.map(({ nombre, rol, linea, linkedin }) => (
              <div key={nombre} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-[16px] font-extrabold text-mundo-dark">{nombre}</span>
                <span className="text-[15px] text-gray-500">· {rol}. {linea}</span>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-semibold text-mundo-blue hover:underline"
                >
                  LinkedIn →
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
