import type { Idioma } from "@/lib/contact";

/**
 * Textos de /demos-ml/agente-voz (demo de voz con el widget de ElevenLabs) en español e inglés.
 * Ningún texto visible de la página va suelto en el JSX. Sin raya larga (em dash),
 * sin precios, sin cifras ni promesas absolutas.
 *
 * Este archivo solo importa tipos para que los tests unitarios lo carguen con Node.
 */

/** Ruta de la página. No listada, igual que /demos-ml. */
export const RUTA_AGENTE_VOZ = "/demos-ml/agente-voz";

/**
 * Script del widget, con versión fija. Para subirla: revisar el changelog de
 * @elevenlabs/convai-widget-embed en npm y probar en un Preview antes de promover.
 */
export const WIDGET_SCRIPT_URL = "https://unpkg.com/@elevenlabs/convai-widget-embed@0.21.5/dist/index.js";

export type TextosAgenteVoz = {
  metaTitulo: string;
  metaDescripcion: string;
  irAlSitio: string;
  selectorIdioma: string;
  nombreIdioma: Record<Idioma, string>;
  etiqueta: string;
  titulo: string;
  descripcion: string;
  /** Estado apagado. */
  desactivado: { titulo: string; texto: string; volver: string };
  /**
   * Aviso antes de iniciar la llamada. [REVISAR LEGAL]: borrador pendiente de aprobación.
   * `antesDelEnlace` + enlace a /privacidad + `despuesDelEnlace`.
   */
  aviso: { titulo: string; antesDelEnlace: string; enlace: string; despuesDelEnlace: string };
  /** Botón que acepta el aviso y carga el widget. */
  hablar: string;
  /** Instrucción que se ve cuando el widget ya cargó. */
  listo: string;
  agendar: string;
  volverDemos: string;
  /** Valores de las variables dinámicas cuando no llegan ?u= o ?c=. */
  genericos: { userName: string; companyName: string };
};

export const textosAgenteVoz: Record<Idioma, TextosAgenteVoz> = {
  es: {
    metaTitulo: "Demo de voz: habla con Federico en versión IA",
    metaDescripcion:
      "Habla desde tu navegador con un agente de IA que usa la voz clonada de Federico Orozco, fundador de Mundo Lógico.",
    irAlSitio: "Ir a mundologico.com",
    selectorIdioma: "Idioma",
    nombreIdioma: { es: "Español", en: "English" },
    etiqueta: "Demo en vivo · Voz",
    titulo: "Habla con Federico, mi versión de IA",
    descripcion:
      "Es un agente de inteligencia artificial que usa la voz clonada de Federico Orozco, fundador de Mundo Lógico. No es él en persona. Hazle preguntas como se las harías a alguien de tu equipo y mira cómo podría atender un agente de voz las llamadas de tus clientes.",
    desactivado: {
      titulo: "El demo está desactivado en este momento",
      texto: "Vuelve a intentarlo más tarde o agenda una llamada y te lo mostramos en vivo.",
      volver: "Ver los otros demos",
    },
    // [REVISAR LEGAL] Aviso de IA, voz clonada y grabación: pendiente de aprobación de Federico.
    aviso: {
      titulo: "Antes de empezar",
      antesDelEnlace:
        "Vas a hablar con una inteligencia artificial, no con una persona. Usa una réplica de la voz de Federico Orozco, con su autorización. La conversación se graba y se transcribe para operar el demo y mejorar el servicio. No compartas datos sensibles. Más detalles en nuestra ",
      enlace: "política de privacidad",
      despuesDelEnlace: ".",
    },
    hablar: "Entendido, hablar con Federico",
    listo: "Listo. Toca el botón de Federico en la parte de abajo de la pantalla y permite el uso del micrófono.",
    agendar: "Agendar llamada de 20 minutos",
    volverDemos: "Ver los otros demos",
    genericos: { userName: "visitante", companyName: "tu empresa" },
  },
  en: {
    metaTitulo: "Voice demo: talk to Federico's AI version",
    metaDescripcion:
      "Talk from your browser to an AI agent that uses the cloned voice of Federico Orozco, founder of Mundo Lógico.",
    irAlSitio: "Go to mundologico.com",
    selectorIdioma: "Language",
    nombreIdioma: { es: "Español", en: "English" },
    etiqueta: "Live demo · Voice",
    titulo: "Talk to Federico, my AI version",
    descripcion:
      "This is an artificial intelligence agent that uses the cloned voice of Federico Orozco, founder of Mundo Lógico. It isn't the real Federico. Ask it questions the way you would ask someone on your team, and see how a voice agent could handle your customers' calls.",
    desactivado: {
      titulo: "The demo is turned off right now",
      texto: "Please try again later, or book a call and we'll show it to you live.",
      volver: "See the other demos",
    },
    // [REVISAR LEGAL] AI, cloned voice and recording notice: pending Federico's approval.
    aviso: {
      titulo: "Before you start",
      antesDelEnlace:
        "You're about to talk to an artificial intelligence, not a person. It uses a replica of Federico Orozco's voice, with Federico's permission. The conversation is recorded and transcribed to run the demo and improve the service. Please don't share sensitive information. You'll find more details in our ",
      enlace: "privacy policy (in Spanish)",
      despuesDelEnlace: ".",
    },
    hablar: "Got it, talk to Federico",
    listo: "Ready. Tap Federico's button at the bottom of the screen and allow microphone access.",
    agendar: "Book a 20-minute call",
    volverDemos: "See the other demos",
    genericos: { userName: "guest", companyName: "your company" },
  },
};
