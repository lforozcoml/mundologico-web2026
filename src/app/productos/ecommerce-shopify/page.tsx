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
  revision,
  robotsPara,
  visibleModulos,
  visibleTiendas,
} from "@/content/data/ecommerce-shopify";
import { MotionProvider } from "@/components/sections/ecommerce/MotionProvider";
import { HeroEcommerce } from "@/components/sections/ecommerce/HeroEcommerce";
import { FormasTrabajo } from "@/components/sections/ecommerce/FormasTrabajo";
import { HexagonoRevision } from "@/components/sections/ecommerce/HexagonoRevision";
import { EmbudoIlustrativo } from "@/components/sections/ecommerce/EmbudoIlustrativo";
import { FlujoOperacion } from "@/components/sections/ecommerce/FlujoOperacion";
import { ComoTrabajamos, Incluye, SoporteMensual } from "@/components/sections/ecommerce/BloquesServicio";
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
          <FormasTrabajo />

          <section id="revision" className="scroll-mt-24 py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="mb-12 max-w-2xl text-3xl font-black leading-tight text-mundo-dark md:text-4xl">
                {revision.titulo}
              </h2>
              <HexagonoRevision />
              <div className="mt-16 grid items-center gap-10 md:grid-cols-2">
                <EmbudoIlustrativo />
                <p className="text-xl font-bold leading-snug text-mundo-dark md:text-2xl">{revision.entregable}</p>
              </div>
            </div>
          </section>

          <Incluye />
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
