import type { Metadata } from "next";
import { pageMetadata, robotsIdioma } from "@/lib/metadata";
import { idiomaDePagina } from "@/lib/i18n/servidor";
import { enlace } from "@/lib/i18n/rutas";
import type { Idioma } from "@/lib/i18n/config";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript, serviceJsonLd } from "@/lib/jsonld";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/ui/CtaBand";
import {
  PUBLICADO,
  RUTA,
  bandaFinal,
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

type Props = PageProps<"/[lang]/productos/ecommerce-shopify">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const idioma = await idiomaDePagina(params, "ecommerceShopify");
  return {
    ...pageMetadata({ title: meta.title, description: meta.description, idioma, ruta: "ecommerceShopify" }),
    // Idioma sin publicar: noindex aunque la página sí esté publicada.
    robots: robotsIdioma(idioma) ?? robotsPara(PUBLICADO),
  };
}

function jsonLdDe(idioma: Idioma) {
  const ruta = enlace("ecommerceShopify", idioma) ?? RUTA;
  return [
    serviceJsonLd({ nombre: meta.title, descripcion: meta.description, ruta, areaServed: "Colombia", idioma }),
    breadcrumbJsonLd([
      { nombre: "Inicio", ruta: enlace("inicio", idioma) ?? "/" },
      { nombre: "Productos", ruta: enlace("productos", idioma) ?? "/productos" },
      { nombre: meta.title, ruta },
    ], idioma),
    faqJsonLd(faq.items, idioma),
  ];
}

export default async function EcommerceShopifyPage({ params }: Props) {
  const idioma = await idiomaDePagina(params, "ecommerceShopify");
  const jsonLd = jsonLdDe(idioma);
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
          {tiendas.length > 0 && <TiendasDesarrolladas tiendas={tiendas} />}
          <ComoTrabajamos />
          <SoporteMensual />
          <FaqAcordeon />
        </MotionProvider>
        <CtaBand {...bandaFinal} />
      </main>
      <Footer />
    </>
  );
}
