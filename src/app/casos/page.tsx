import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CasosSection } from "@/components/sections/CasosSection";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Casos de éxito",
  description:
    "Resultados reales, no promesas. Proyectos de automatización e IA con métricas concretas.",
  idioma: "es",
  ruta: "casos",
});

export default function CasosPage() {
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
