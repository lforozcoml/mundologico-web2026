import type { Metadata } from "next";
import { pageMetadata, robotsIdioma } from "@/lib/metadata";
import { idiomaDePagina } from "@/lib/i18n/servidor";
import { enlace } from "@/lib/i18n/rutas";
import type { Idioma } from "@/lib/i18n/config";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript, serviceJsonLd } from "@/lib/jsonld";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/ui/CtaBand";
import { PUBLICADO, RUTA, robotsPara, visibleModulos, visibleTiendas } from "@/content/data/ecommerce-shopify";
import { ecommerce, moduloEnIdioma, tiendaEnIdioma } from "@/content/data/i18n/ecommerce-contenido";
import { CALENDARIO_URL } from "@/content/data/site";
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
  const { meta } = ecommerce[idioma];
  return {
    ...pageMetadata({ title: meta.title, description: meta.description, idioma, ruta: "ecommerceShopify" }),
    // Idioma sin publicar: noindex aunque la página sí esté publicada.
    robots: robotsIdioma(idioma) ?? robotsPara(PUBLICADO),
  };
}

function jsonLdDe(idioma: Idioma) {
  const ruta = enlace("ecommerceShopify", idioma) ?? RUTA;
  const { meta, faq, ui } = ecommerce[idioma];
  return [
    serviceJsonLd({ nombre: meta.title, descripcion: meta.description, ruta, areaServed: "Colombia", idioma }),
    breadcrumbJsonLd([
      { nombre: ui.migas.inicio, ruta: enlace("inicio", idioma) ?? "/" },
      { nombre: ui.migas.productos, ruta: enlace("productos", idioma) ?? "/productos" },
      { nombre: meta.title, ruta },
    ], idioma),
    faqJsonLd(faq.items, idioma),
  ];
}

export default async function EcommerceShopifyPage({ params }: Props) {
  const idioma = await idiomaDePagina(params, "ecommerceShopify");
  const jsonLd = jsonLdDe(idioma);
  const { bandaFinal, ui } = ecommerce[idioma];
  const modulos = visibleModulos().map((m) => moduloEnIdioma(m, idioma));
  const tiendas = visibleTiendas().map((t) => tiendaEnIdioma(t, idioma));

  return (
    <>
      {jsonLd.map((data) => (
        <script
          key={data["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
        />
      ))}
      <Header idioma={idioma} ruta="ecommerceShopify" />
      <main className="flex-1">
        <MotionProvider>
          <HeroEcommerce idioma={idioma} />
          <FranjaLogos idioma={idioma} />
          <FormasTrabajo idioma={idioma} />
          <RevisionTienda idioma={idioma} />
          {modulos.length > 0 && <FlujoOperacion modulos={modulos} idioma={idioma} />}
          {tiendas.length > 0 && <TiendasDesarrolladas tiendas={tiendas} idioma={idioma} />}
          <ComoTrabajamos idioma={idioma} />
          <SoporteMensual idioma={idioma} />
          <FaqAcordeon idioma={idioma} />
        </MotionProvider>
        {/* En español el CTA principal es el valor por defecto de CtaBand, como antes. */}
        <CtaBand
          {...bandaFinal}
          {...(ui.bandaCtaPrimario ? { ctaPrimario: { label: ui.bandaCtaPrimario, href: CALENDARIO_URL } } : {})}
        />
      </main>
      <Footer idioma={idioma} />
    </>
  );
}
