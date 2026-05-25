import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NosotrosSection } from "@/components/sections/NosotrosSection";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Nosotros — Mundo Lógico",
  description:
    "Conoce al equipo detrás de cada proyecto de automatización e IA de Mundo Lógico.",
};

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <NosotrosSection />
        <CtaBand
          titulo="¿Listo para trabajar juntos?"
          descripcion="Agendamos un diagnóstico gratuito. En 45 minutos identificamos qué automatizar en tu operación."
          ctaSecundario={{ label: "Ver casos de éxito", href: "/casos" }}
        />
      </main>
      <Footer />
    </>
  );
}
