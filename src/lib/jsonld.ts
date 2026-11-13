import { SITE_NAME, SITE_URL } from "./metadata.ts";
import { IDIOMAS, NOMBRE_IDIOMA_SCHEMA, PUBLICADO_EN, idiomaPublicado, type Idioma } from "./i18n/config.ts";
import { site } from "../content/data/site.ts";

export type Migaja = { nombre: string; ruta: string };
/** respuesta: párrafos; en el JSON-LD se unen con un espacio, igual que el texto visible. */
export type ParPregunta = { pregunta: string; respuesta: readonly string[] };

/** Serializa JSON-LD escapando "<" para que no pueda cerrar el <script>. */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * Organization del layout. availableLanguage es el idioma de atención: el inglés solo
 * se declara cuando el sitio en inglés está publicado. areaServed queda como estaba.
 */
export function organizationJsonLd(publicadoEn: boolean = PUBLICADO_EN) {
  const idiomas = IDIOMAS.filter((i) => idiomaPublicado(i, publicadoEn)).map((i) => NOMBRE_IDIOMA_SCHEMA[i]);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "hola@mundologico.com",
      telephone: "+57-312-8315581",
      contactType: "customer support",
      areaServed: ["CO", "US"],
      availableLanguage: idiomas.length === 1 ? idiomas[0] : idiomas,
    },
    sameAs: [site.redes.linkedin, site.redes.facebook],
  };
}

export function serviceJsonLd(input: { nombre: string; descripcion: string; ruta: string; areaServed: string; idioma: Idioma }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    inLanguage: input.idioma,
    name: input.nombre,
    serviceType: input.nombre,
    description: input.descripcion,
    url: `${SITE_URL}${input.ruta}`,
    areaServed: { "@type": "Country", name: input.areaServed },
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function breadcrumbJsonLd(migas: readonly Migaja[], idioma: Idioma) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    inLanguage: idioma,
    itemListElement: migas.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.nombre,
      item: `${SITE_URL}${m.ruta}`,
    })),
  };
}

export function faqJsonLd(preguntas: readonly ParPregunta[], idioma: Idioma) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: idioma,
    mainEntity: preguntas.map((p) => ({
      "@type": "Question",
      name: p.pregunta,
      acceptedAnswer: { "@type": "Answer", text: p.respuesta.join(" ") },
    })),
  };
}
