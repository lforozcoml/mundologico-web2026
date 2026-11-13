/**
 * Textos de /casos y /casos/[slug] (y /en/case-studies). El contenido de cada caso
 * está en src/content/data/casos.ts. El inglés es borrador mientras "casos-pagina"
 * esté en PENDIENTES_REVISION_EN.
 */

import type { Idioma } from "../../../lib/i18n/config.ts";

export type TextosCasosPagina = {
  meta: { title: string; description: string };
  /** Sufijo del título de cada caso: "<nombre> · Casos de éxito". */
  tituloCaso: string;
  migaInicio: string;
  problema: string;
  construimos: string;
  stack: string;
  /** Los párrafos de la solución que empiezan así llevan su título en negrita. */
  prefijoProyecto: string;
  bandaFinalCaso: { titulo: string; descripcion: string; ctaSecundario: string };
};

export const casosPagina: Record<Idioma, TextosCasosPagina> = {
  es: {
    meta: {
      title: "Casos de éxito",
      description: "Resultados reales, no promesas. Proyectos de automatización e IA con métricas concretas.",
    },
    tituloCaso: "Casos de éxito",
    migaInicio: "Casos de éxito",
    problema: "El problema",
    construimos: "Lo que construimos",
    stack: "Stack tecnológico",
    prefijoProyecto: "Proyecto",
    bandaFinalCaso: {
      titulo: "¿Tu negocio tiene procesos que se pueden automatizar?",
      descripcion:
        "Agenda una llamada de 20 minutos. Revisamos un proceso concreto y te decimos si vale la pena automatizarlo.",
      ctaSecundario: "Ver más casos",
    },
  },
  en: {
    meta: {
      title: "Case studies",
      description: "Real results, not promises. Automation and AI projects with concrete metrics.",
    },
    tituloCaso: "Case studies",
    migaInicio: "Case studies",
    problema: "The problem",
    construimos: "What we built",
    stack: "Tech stack",
    prefijoProyecto: "Project",
    bandaFinalCaso: {
      titulo: "Does your business have processes that could be automated?",
      descripcion: "Book a 20-minute call. We review one specific process and tell you whether it is worth automating.",
      ctaSecundario: "See more cases",
    },
  },
};
