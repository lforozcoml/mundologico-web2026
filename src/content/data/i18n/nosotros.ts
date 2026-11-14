/**
 * Textos de /nosotros (y /en/about). El español es el copy publicado, movido sin cambios
 * desde NosotrosSection y la página. El inglés es borrador mientras "nosotros" esté en
 * PENDIENTES_REVISION_EN. Las cifras salen de inicio.ts (mismos números que el home).
 */

import type { Idioma } from "../../../lib/i18n/config.ts";
import { site } from "../site.ts";

type Fundador = { nombre: string; rol: string; linea: string; linkedin: string };

export type TextosNosotros = {
  meta: { title: string; description: string };
  eyebrow: string;
  h1: { a: string; resaltado: string };
  intro: string;
  embebida: { antes: string; resaltado: string; despues: string };
  /** "Datos internos de Mundo Lógico a <fecha>." */
  cifrasNota: string;
  pillares: readonly string[];
  partnersTitulo: string;
  certificaciones: string;
  fundadoresTitulo: string;
  fundadores: readonly Fundador[];
  bandaFinal: { titulo: string; descripcion: string; ctaSecundario: string };
};

const LINKEDIN_JG = "https://www.linkedin.com/in/jggartner/";
const LINKEDIN_FO = "https://www.linkedin.com/in/lforozco/";

export const nosotros: Record<Idioma, TextosNosotros> = {
  es: {
    meta: {
      title: "Nosotros",
      description:
        "21 años construyendo tecnología para empresas en Colombia y Estados Unidos, más de 8 automatizando procesos. Hoy, automatización e IA embebida.",
    },
    eyebrow: "Quiénes somos",
    h1: { a: "21 años conectando", resaltado: "tecnología y negocio" },
    intro:
      "Desde 2005 construimos tecnología para empresas en Colombia y Estados Unidos, y hace más de 8 años nos especializamos en automatizar procesos. Hoy nos enfocamos en automatización e IA: que tu equipo deje las tareas manuales, cometa menos errores de digitación y tenga mejor información para decidir.",
    embebida: {
      antes: "No vendemos chatbots sueltos. Trabajamos con",
      resaltado: "IA embebida",
      despues:
        ": la IA va dentro de tus automatizaciones, en el paso del proceso donde aporta, ya sea para leer un documento, clasificar una solicitud o redactar una respuesta. Usamos Claude o ChatGPT según lo que pida cada proceso.",
    },
    cifrasNota: `Datos internos de Mundo Lógico a ${site.cifras.fechaCorte}.`,
    pillares: [
      "No somos una agencia. Somos ingenieros que se involucran en el problema desde adentro.",
      "Los mismos que diagnostican son los que construyen y entregan.",
      "Elegimos la herramienta y la IA según el problema.",
    ],
    partnersTitulo: "Partners y certificaciones",
    certificaciones:
      "Todo nuestro equipo está certificado en Make, hasta nivel Advanced. También tenemos certificaciones en Monday.com y Google Cloud Digital Leader.",
    fundadoresTitulo: "Fundadores",
    fundadores: [
      {
        nombre: "Juan Guillermo Gartner",
        rol: "CEO y co-fundador",
        linea: "Estrategia y clientes en Estados Unidos.",
        linkedin: LINKEDIN_JG,
      },
      {
        nombre: "Federico Orozco",
        rol: "Co-fundador",
        linea: "Automatización e IA. Google Cloud Digital Leader.",
        linkedin: LINKEDIN_FO,
      },
    ],
    bandaFinal: {
      titulo: "¿Listo para trabajar juntos?",
      descripcion:
        "Agenda una llamada de 20 minutos. Revisamos un proceso concreto y te decimos si vale la pena automatizarlo.",
      ctaSecundario: "Ver casos de éxito",
    },
  },
  en: {
    meta: {
      title: "About us",
      description:
        "21 years building technology for businesses in Colombia and the US, more than 8 automating processes. Today, automation and embedded AI.",
    },
    eyebrow: "Who we are",
    h1: { a: "21 years connecting", resaltado: "technology and business" },
    intro:
      "Since 2005 we have built technology for businesses in Colombia and the United States, and for more than 8 years we have specialized in process automation. Today we focus on automation and AI: helping your team leave manual tasks behind, make fewer data entry errors and have better information to make decisions.",
    embebida: {
      antes: "We don't sell standalone chatbots. We work with",
      resaltado: "embedded AI",
      despues:
        ": the AI lives inside your automations, at the step of the process where it adds value, whether that is reading a document, classifying a request or drafting a reply. We use Claude or ChatGPT depending on what each process needs.",
    },
    cifrasNota: "Mundo Lógico internal data as of September 2026.",
    pillares: [
      "We are not an agency. We are engineers who get involved in the problem from the inside.",
      "The same people who diagnose are the ones who build and deliver.",
      "We choose the tool and the AI based on the problem.",
    ],
    partnersTitulo: "Partners and certifications",
    certificaciones:
      "Our entire team is certified in Make, up to Advanced level. We also hold certifications in Monday.com and Google Cloud Digital Leader.",
    fundadoresTitulo: "Founders",
    fundadores: [
      {
        nombre: "Juan Guillermo Gartner",
        rol: "CEO and co-founder",
        linea: "Strategy and US clients.",
        linkedin: LINKEDIN_JG,
      },
      {
        nombre: "Federico Orozco",
        rol: "Co-founder",
        linea: "Automation and AI. Google Cloud Digital Leader.",
        linkedin: LINKEDIN_FO,
      },
    ],
    bandaFinal: {
      titulo: "Ready to work together?",
      descripcion: "Book a 20-minute call. We review one specific process and tell you whether it is worth automating.",
      ctaSecundario: "See case studies",
    },
  },
};
