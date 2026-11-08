import type { Idioma } from "@/lib/contact";

/**
 * Textos de /demos-ml en español e inglés. Los de cada demo están en demos.ts.
 * Ningún texto visible de la página va suelto en el JSX. Sin raya larga (em dash),
 * sin precios, sin cifras ni promesas absolutas.
 */
export type TextosDemos = {
  metaTitulo: string;
  metaDescripcion: string;
  irAlSitio: string;
  selectorIdioma: string;
  nombreIdioma: Record<Idioma, string>;
  hero: { etiqueta: string; titulo: string; subtitulo: string };
  /** Título de la lista de demos (solo para lectores de pantalla). */
  listaTitulo: string;
  paraTuEmpresa: string;
  video: { titulo: (demo: string) => string };
  cta: {
    titulo: string;
    texto: string;
    agendar: string;
    diagnostico: string;
    explicacion: string;
  };
  confianza: { titulo: string; casos: string };
  captura: { titulo: string; notaDiagnostico: string };
  botonFijo: string;
};

export const textosDemos: Record<Idioma, TextosDemos> = {
  es: {
    metaTitulo: "Demos",
    metaDescripcion: "Prueba demos de automatización con IA de Mundo Lógico: ejemplos reales, sin instalar nada.",
    irAlSitio: "Ir a mundologico.com",
    selectorIdioma: "Idioma",
    nombreIdioma: { es: "Español", en: "English" },
    hero: {
      etiqueta: "Demos de Mundo Lógico",
      titulo: "Pruébalo tú mismo: así se ve la automatización con IA funcionando",
      subtitulo: "Ejemplos reales que puedes probar en menos de un minuto, sin instalar nada.",
    },
    listaTitulo: "Demos disponibles",
    paraTuEmpresa: "Qué puede hacer por tu empresa",
    video: { titulo: (demo) => `Video: ${demo}` },
    cta: {
      titulo: "¿Ves algo parecido a lo que pasa en tu empresa?",
      texto: "Cuéntanos qué proceso te quita más tiempo. En 20 minutos lo revisamos y te decimos si vale la pena automatizarlo.",
      agendar: "Agendar llamada de 20 minutos",
      diagnostico: "Pedir un Diagnóstico de automatización",
      explicacion:
        "El Diagnóstico es el primer paso: mapeamos un proceso de tu empresa, priorizamos qué automatizar primero y qué impacto esperar.",
    },
    confianza: { titulo: "Somos partners de Make y Google Workspace", casos: "Ver casos de éxito →" },
    captura: {
      titulo: "¿Prefieres que te escribamos? Déjanos tus datos",
      notaDiagnostico: "Interés: Diagnóstico de automatización",
    },
    botonFijo: "Agendar llamada",
  },
  en: {
    metaTitulo: "Demos",
    metaDescripcion: "Try Mundo Lógico's AI automation demos: real examples, nothing to install.",
    irAlSitio: "Go to mundologico.com",
    selectorIdioma: "Language",
    nombreIdioma: { es: "Español", en: "English" },
    hero: {
      etiqueta: "Mundo Lógico demos",
      titulo: "Try it yourself: this is what AI automation looks like in action",
      subtitulo: "Real examples you can try in under a minute, with nothing to install.",
    },
    listaTitulo: "Available demos",
    paraTuEmpresa: "What it can do for your business",
    video: { titulo: (demo) => `Video: ${demo}` },
    cta: {
      titulo: "Does this look like something happening in your business?",
      texto: "Tell us which process takes up most of your time. In 20 minutes we'll review it and tell you whether it's worth automating.",
      agendar: "Book a 20-minute call",
      diagnostico: "Request an Automation Diagnostic",
      explicacion:
        "The Diagnostic is the first step: we map one of your processes, prioritize what to automate first and what impact to expect.",
    },
    // /casos solo existe en español.
    confianza: { titulo: "We're Make and Google Workspace partners", casos: "See our case studies (in Spanish) →" },
    captura: {
      titulo: "Rather have us reach out? Leave your details",
      notaDiagnostico: "Interest: Automation Diagnostic",
    },
    botonFijo: "Book a call",
  },
};
