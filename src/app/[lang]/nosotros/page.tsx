import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { idiomaDePagina } from "@/lib/i18n/servidor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NosotrosSection } from "@/components/sections/NosotrosSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { nosotros } from "@/content/data/i18n/nosotros";
import { inicio } from "@/content/data/i18n/inicio";
import { CALENDARIO_URL } from "@/content/data/site";
import { enlaceOEspanol } from "@/lib/i18n/rutas";

export async function generateMetadata({ params }: PageProps<"/[lang]/nosotros">): Promise<Metadata> {
  const idioma = await idiomaDePagina(params, "nosotros");
  return pageMetadata({
    title: nosotros[idioma].meta.title,
    description: nosotros[idioma].meta.description,
    idioma,
    ruta: "nosotros",
  });
}

export default async function NosotrosPage({ params }: PageProps<"/[lang]/nosotros">) {
  const idioma = await idiomaDePagina(params, "nosotros");
  const tx = nosotros[idioma];
  return (
    <>
      <Header idioma={idioma} ruta="nosotros" />
      <main className="flex-1 pt-16">
        <NosotrosSection idioma={idioma} />
        <CtaBand
          titulo={tx.bandaFinal.titulo}
          descripcion={tx.bandaFinal.descripcion}
          // En español se deja el CTA principal por defecto de CtaBand, como antes.
          {...(idioma === "es" ? {} : { ctaPrimario: { label: inicio[idioma].bandaFinal.ctaPrimario, href: CALENDARIO_URL } })}
          ctaSecundario={{ label: tx.bandaFinal.ctaSecundario, href: enlaceOEspanol("casos", idioma) }}
        />
      </main>
      <Footer idioma={idioma} />
    </>
  );
}
