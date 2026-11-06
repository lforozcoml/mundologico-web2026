import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript, serviceJsonLd } from "@/lib/jsonld";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/ui/CtaBand";
import {
  PUBLICADO,
  RUTA,
  faq,
  meta,
  robotsPara,
  visibleModulos,
  visibleTiendas,
} from "@/content/data/ecommerce-shopify";
import { MotionProvider } from "@/components/sections/ecommerce/MotionProvider";
import { HeroEcommerce } from "@/components/sections/ecommerce/HeroEcommerce";
import { FranjaLogos } from "@/components/sections/ecommerce/FranjaLogos";
import { FormasTrabajo } from "@/components/sections/ecommerce/FormasTrabajo";
import { RevisionTienda } from "@/components/sections/ecommerce/RevisionTienda";
import { FlujoOperacion } from "@/components/sections/ecommerce/FlujoOperacion";
import { SoporteMensual } from "@/components/sections/ecommerce/SoporteMensual";
import { ComoTrabajamos } from "@/components/sections/ecommerce/ComoTrabajamos";
import { TiendasDesarrolladas } from "@/components/sections/ecommerce/TiendasDesarrolladas";
import { FaqAcordeon } from "@/components/sections/ecommerce/FaqAcordeon";

export const metadata: Metadata = {
  ...pageMetadata({ title: meta.title, description: meta.description, path: RUTA }),
  robots: robotsPara(PUBLICADO),
};

const jsonLd = [
  serviceJsonLd({ nombre: meta.title, descripcion: meta.description, ruta: RUTA, areaServed: "Colombia" }),
  breadcrumbJsonLd([
    { nombre: "Inicio", ruta: "/" },
    { nombre: "Productos", ruta: "/productos" },
    { nombre: meta.title, ruta: RUTA },
  ]),
  faqJsonLd(faq.items),
];

export default function EcommerceShopifyPage() {
  const modulos = visibleModulos();
  const tiendas = visibleTiendas();

  return (
    <>
      {jsonLd.map((data) => (
        <script
          key={data["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
        />
      ))}
      <Header />
      <main className="flex-1">
        <MotionProvider>
          <HeroEcommerce />
          <FranjaLogos />
          <FormasTrabajo />

          <RevisionTienda />

          {modulos.length > 0 && <FlujoOperacion modulos={modulos} />}
          <ComoTrabajamos />
          <SoporteMensual />
          {tiendas.length > 0 && <TiendasDesarrolladas tiendas={tiendas} />}
          <FaqAcordeon />
        </MotionProvider>
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
