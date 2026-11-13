import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { idiomaDePagina } from "@/lib/i18n/servidor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CasosSection } from "@/components/sections/CasosSection";
import { CtaBand } from "@/components/ui/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[lang]/casos">): Promise<Metadata> {
  const idioma = await idiomaDePagina(params, "casos");
  return pageMetadata({
    title: "Casos de éxito",
    description:
      "Resultados reales, no promesas. Proyectos de automatización e IA con métricas concretas.",
    idioma,
    ruta: "casos",
  });
}

export default async function CasosPage({ params }: PageProps<"/[lang]/casos">) {
  await idiomaDePagina(params, "casos");
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <CasosSection headingAs="h1" />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
