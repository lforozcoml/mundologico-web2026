import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CasosSection } from "@/components/sections/CasosSection";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Casos de éxito — Mundo Lógico",
  description:
    "Resultados reales, no promesas. Proyectos de automatización e IA con métricas concretas.",
};

export default function CasosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <CasosSection />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
