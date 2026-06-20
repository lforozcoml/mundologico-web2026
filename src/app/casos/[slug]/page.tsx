import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/ui/CtaBand";
import { StackPill } from "@/components/ui/StackPill";
import { casos } from "@/content/data/casos";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return casos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caso = casos.find((c) => c.slug === slug);
  if (!caso) return {};
  const title = `${caso.nombre} — Casos de éxito · Mundo Lógico`;
  return {
    title,
    description: caso.subtitulo,
    alternates: { canonical: `https://mundologico.com/casos/${slug}` },
    openGraph: {
      title,
      description: caso.subtitulo,
      url: `https://mundologico.com/casos/${slug}`,
      siteName: "Mundo Lógico",
      locale: "es_CO",
      type: "article",
    },
  };
}

const colorToken = {
  teal:   { text: "text-mundo-teal",   bg: "bg-teal-50",   border: "border-teal-200",   tag: "text-[#0A9B8C]",   stat: "#04BCA6" },
  blue:   { text: "text-mundo-blue",   bg: "bg-blue-50",   border: "border-blue-200",   tag: "text-mundo-blue",  stat: "#176BEC" },
  purple: { text: "text-mundo-purple", bg: "bg-purple-50", border: "border-purple-200", tag: "text-mundo-purple", stat: "#513EF5" },
};

export default async function CasoPage({ params }: Props) {
  const { slug } = await params;
  const caso = casos.find((c) => c.slug === slug);
  if (!caso) notFound();

  const ct = colorToken[caso.color];

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-10">
              <Link href="/casos" className="hover:text-mundo-dark transition-colors">Casos de éxito</Link>
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
                  <p className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-3">El problema</p>
                  <p className="text-[15px] text-gray-600 leading-relaxed">{caso.problema}</p>
                </div>
                <div className="h-px bg-gray-200" />
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-3">Lo que construimos</p>
                  <div className="flex flex-col gap-4">
                    {caso.solucion.split("\n\n").map((parrafo, i) => {
                      const [bold, ...rest] = parrafo.split(": ");
                      const hasTitle = parrafo.includes(": ") && bold.startsWith("Proyecto");
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
                  <p className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-3">Stack tecnológico</p>
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
          titulo="¿Tu negocio tiene procesos que se pueden automatizar?"
          descripcion="La primera sesión de diagnóstico es gratis. En 45 minutos identificamos qué automatizar y cuánto te ahorra."
          ctaSecundario={{ label: "Ver más casos", href: "/casos" }}
        />
      </main>
      <Footer />
    </>
  );
}
