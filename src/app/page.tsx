import type { Metadata } from "next";
import { pageMetadata, SITE_NAME } from "@/lib/metadata";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogosStrip } from "@/components/sections/LogosStrip";
import { ProductosSection } from "@/components/sections/ProductosSection";
import { IALabSection } from "@/components/sections/IALabSection";
import { CasosSection } from "@/components/sections/CasosSection";
import { ContactoSection } from "@/components/sections/ContactoSection";

export const metadata: Metadata = pageMetadata({
  title: `${SITE_NAME} | Automatización e IA para empresas`,
  description:
    "Diseñamos e implementamos automatizaciones con IA para que tu equipo deje de hacer trabajo repetitivo y se enfoque en lo que realmente importa.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <LogosStrip />
        <ProductosSection />
        <IALabSection />
        <CasosSection />
        <ContactoSection />
      </main>
      <Footer />
    </>
  );
}
