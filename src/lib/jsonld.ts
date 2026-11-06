import { SITE_NAME, SITE_URL } from "@/lib/metadata";

export type Migaja = { nombre: string; ruta: string };
/** respuesta: párrafos; en el JSON-LD se unen con un espacio, igual que el texto visible. */
export type ParPregunta = { pregunta: string; respuesta: readonly string[] };

/** Serializa JSON-LD escapando "<" para que no pueda cerrar el <script>. */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function serviceJsonLd(input: { nombre: string; descripcion: string; ruta: string; areaServed: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.nombre,
    serviceType: input.nombre,
    description: input.descripcion,
    url: `${SITE_URL}${input.ruta}`,
    areaServed: { "@type": "Country", name: input.areaServed },
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function breadcrumbJsonLd(migas: readonly Migaja[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: migas.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.nombre,
      item: `${SITE_URL}${m.ruta}`,
    })),
  };
}

export function faqJsonLd(preguntas: readonly ParPregunta[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: preguntas.map((p) => ({
      "@type": "Question",
      name: p.pregunta,
      acceptedAnswer: { "@type": "Answer", text: p.respuesta.join(" ") },
    })),
  };
}
