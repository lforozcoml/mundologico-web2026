import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { idiomaDePagina } from "@/lib/i18n/servidor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NosotrosSection } from "@/components/sections/NosotrosSection";
import { CtaBand } from "@/components/ui/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[lang]/nosotros">): Promise<Metadata> {
  const idioma = await idiomaDePagina(params, "nosotros");
  return pageMetadata({
    title: "Nosotros",
    description:
      "21 años construyendo tecnología para empresas en Colombia y Estados Unidos, más de 8 automatizando procesos. Hoy, automatización e IA embebida.",
    idioma,
    ruta: "nosotros",
  });
}

export default async function NosotrosPage({ params }: PageProps<"/[lang]/nosotros">) {
  await idiomaDePagina(params, "nosotros");
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <NosotrosSection />
        <CtaBand
          titulo="¿Listo para trabajar juntos?"
          descripcion="Agenda una llamada de 20 minutos. Revisamos un proceso concreto y te decimos si vale la pena automatizarlo."
          ctaSecundario={{ label: "Ver casos de éxito", href: "/casos" }}
        />
      </main>
      <Footer />
    </>
  );
}
