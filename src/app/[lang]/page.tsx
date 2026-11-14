import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { enlaceOEspanol } from "@/lib/i18n/rutas";
import { inicio } from "@/content/data/i18n/inicio";
import { idiomaDePagina } from "@/lib/i18n/servidor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogosStrip } from "@/components/sections/LogosStrip";
import { ProductosSection } from "@/components/sections/ProductosSection";
import { IALabSection } from "@/components/sections/IALabSection";
import { EntradaEcommerce } from "@/components/sections/EntradaEcommerce";
import { PUBLICADO as ECOMMERCE_PUBLICADO } from "@/content/data/ecommerce-shopify";
import { CasosSection } from "@/components/sections/CasosSection";
import { ContactoSection } from "@/components/sections/ContactoSection";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const idioma = await idiomaDePagina(params, "inicio");
  return pageMetadata({
    title: inicio[idioma].meta.title,
    description: inicio[idioma].meta.description,
    idioma,
    ruta: "inicio",
    absoluteTitle: true,
  });
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const idioma = await idiomaDePagina(params, "inicio");
  return (
    <>
      <Header idioma={idioma} ruta="inicio" />
      <main className="flex-1">
        <HeroSection idioma={idioma} />
        <LogosStrip idioma={idioma} />
        <ProductosSection idioma={idioma} hrefProductos={enlaceOEspanol("productos", idioma)} />
        {ECOMMERCE_PUBLICADO && <EntradaEcommerce idioma={idioma} />}
        <IALabSection idioma={idioma} />
        <CasosSection idioma={idioma} />
        <ContactoSection idioma={idioma} />
      </main>
      <Footer idioma={idioma} />
    </>
  );
}
