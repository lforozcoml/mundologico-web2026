import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { idiomaDePagina } from "@/lib/i18n/servidor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CasosSection } from "@/components/sections/CasosSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { casosPagina } from "@/content/data/i18n/casos-pagina";
import { inicio } from "@/content/data/i18n/inicio";
import { CALENDARIO_URL } from "@/content/data/site";
import { enlaceOEspanol } from "@/lib/i18n/rutas";

export async function generateMetadata({ params }: PageProps<"/[lang]/casos">): Promise<Metadata> {
  const idioma = await idiomaDePagina(params, "casos");
  return pageMetadata({
    title: casosPagina[idioma].meta.title,
    description: casosPagina[idioma].meta.description,
    idioma,
    ruta: "casos",
  });
}

export default async function CasosPage({ params }: PageProps<"/[lang]/casos">) {
  const idioma = await idiomaDePagina(params, "casos");
  return (
    <>
      <Header idioma={idioma} ruta="casos" />
      <main className="flex-1 pt-16">
        <CasosSection idioma={idioma} headingAs="h1" />
        {/* En español, CtaBand con sus valores por defecto, como antes. */}
        {idioma === "es" ? (
          <CtaBand />
        ) : (
          <CtaBand
            titulo={inicio[idioma].bandaFinal.titulo}
            descripcion={inicio[idioma].bandaFinal.descripcion}
            ctaPrimario={{ label: inicio[idioma].bandaFinal.ctaPrimario, href: CALENDARIO_URL }}
            ctaSecundario={{ label: inicio[idioma].bandaFinal.ctaSecundario, href: enlaceOEspanol("casos", idioma) }}
          />
        )}
      </main>
      <Footer idioma={idioma} />
    </>
  );
}
