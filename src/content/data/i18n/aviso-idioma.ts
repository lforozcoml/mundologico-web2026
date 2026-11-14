/**
 * Aviso para visitantes cuyo navegador está en el otro idioma. Va escrito en el idioma
 * AL QUE se sugiere cambiar (el del navegador), no en el de la página.
 */

import type { Idioma } from "../../../lib/i18n/config.ts";

export type TextosAvisoIdioma = { texto: string; cambiar: string; cerrar: string; aria: string };

export const avisoIdioma: Record<Idioma, TextosAvisoIdioma> = {
  es: {
    texto: "Esta página también está disponible en español.",
    cambiar: "Ver en español",
    cerrar: "Cerrar aviso",
    aria: "Aviso de idioma",
  },
  en: {
    texto: "This page is also available in English.",
    cambiar: "View in English",
    cerrar: "Dismiss",
    aria: "Language notice",
  },
};
