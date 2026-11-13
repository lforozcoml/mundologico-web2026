import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { idiomaDePagina } from "@/lib/i18n/servidor";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/ui/CtaBand";
import { StackPill } from "@/components/ui/StackPill";
import { casos, casosPorIdioma } from "@/content/data/casos";
import { casosPagina } from "@/content/data/i18n/casos-pagina";
import { inicio } from "@/content/data/i18n/inicio";
import { CALENDARIO_URL } from "@/content/data/site";
import { enlaceOEspanol } from "@/lib/i18n/rutas";

type Props = PageProps<"/[lang]/casos/[slug]">;

// Un slug que no existe no se renderiza: responde el 404 global (ver global-not-found.tsx).
export const dynamicParams = false;

export async function generateStaticParams() {
  return casos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const idioma = await idiomaDePagina(params, "caso");
  const { slug } = await params;
  const caso = casosPorIdioma[idioma].find((c) => c.slug === slug);
  if (!caso) return {};
  return pageMetadata({
    title: `${caso.nombre} · ${casosPagina[idioma].tituloCaso}`,
    description: caso.subtitulo,
    idioma,
    ruta: "caso",
    params: { slug },
    type: "article",
  });
}

const colorToken = {
  teal:   { text: "text-mundo-teal",   bg: "bg-teal-50",   border: "border-teal-200",   tag: "text-[#0A9B8C]",   stat: "#04BCA6" },
  blue:   { text: "text-mundo-blue",   bg: "bg-blue-50",   border: "border-blue-200",   tag: "text-mundo-blue",  stat: "#176BEC" },
  purple: { text: "text-mundo-purple", bg: "bg-purple-50", border: "border-purple-200", tag: "text-mundo-purple", stat: "#513EF5" },
};

export default async function CasoPage({ params }: Props) {
  const idioma = await idiomaDePagina(params, "caso");
  const { slug } = await params;
  const caso = casosPorIdioma[idioma].find((c) => c.slug === slug);
  if (!caso) notFound();
  const tx = casosPagina[idioma];
  const hrefCasos = enlaceOEspanol("casos", idioma);

  const ct = colorToken[caso.color];

  return (
    <>
      <Header idioma={idioma} ruta="caso" params={{ slug }} />
      <main className="flex-1 pt-16">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-10">
              <Link href={hrefCasos} className="hover:text-mundo-dark transition-colors">{tx.migaInicio}</Link>
              <span>/</span>
              <span className="text-mundo-dark font-semibold">{caso.nombre}</span>
            </div>

            {/* Header del caso */}
            <div className="mb-12">
              <span className={`inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${ct.bg} ${ct.border} border ${ct.tag} mb-4`}>
                {caso.industry}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-mundo-dark leading-tight mb-4">
                {caso.tagline}
              </h1>
              <p className="text-[18px] text-gray-600 max-w-2xl leading-relaxed">
                {caso.subtitulo}
              </p>
            </div>

            {/* Layout: contenido + sidebar */}
            <div className="grid md:grid-cols-[2fr_1fr] gap-10">
              {/* Contenido */}
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-3">{tx.problema}</p>
                  <p className="text-[15px] text-gray-600 leading-relaxed">{caso.problema}</p>
                </div>
                <div className="h-px bg-gray-200" />
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-3">{tx.construimos}</p>
                  <div className="flex flex-col gap-4">
                    {caso.solucion.split("\n\n").map((parrafo, i) => {
                      const [bold, ...rest] = parrafo.split(": ");
                      const hasTitle = parrafo.includes(": ") && bold.startsWith(tx.prefijoProyecto);
                      return (
                        <p key={i} className="text-[15px] text-gray-600 leading-relaxed">
                          {hasTitle ? (
                            <><strong className="text-mundo-dark">{bold}:</strong> {rest.join(": ")}</>
                          ) : parrafo}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className="h-px bg-gray-200" />
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-3">{tx.stack}</p>
                  <div className="flex flex-wrap gap-2">
                    {caso.stack.map((s) => (
                      <StackPill key={s} name={s} size="md" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar stats */}
              <div className="flex flex-col gap-4">
                {caso.stats.map(({ num, lbl }, i) => (
                  <div key={lbl} className="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
                    <div
                      className="text-[44px] font-black leading-none mb-2"
                      style={{ color: i === 0 ? ct.stat : "#23274C" }}
                    >
                      {num}
                    </div>
                    <div className="text-[14px] text-gray-600 leading-snug">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <CtaBand
          titulo={tx.bandaFinalCaso.titulo}
          descripcion={tx.bandaFinalCaso.descripcion}
          // En español se deja el CTA principal por defecto de CtaBand, como antes.
          {...(idioma === "es" ? {} : { ctaPrimario: { label: inicio[idioma].bandaFinal.ctaPrimario, href: CALENDARIO_URL } })}
          ctaSecundario={{ label: tx.bandaFinalCaso.ctaSecundario, href: hrefCasos }}
        />
      </main>
      <Footer idioma={idioma} />
    </>
  );
}
