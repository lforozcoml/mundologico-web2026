import type { Idioma } from "./config.ts";
import { IDIOMAS } from "./config.ts";

/**
 * Preferencia de idioma del visitante, solo en su navegador (localStorage). Sirve para no
 * volver a mostrar el aviso de idioma a quien ya lo cerró o ya eligió con el selector.
 * Si el almacenamiento no está disponible, el aviso simplemente puede volver a salir.
 */
const CLAVE = "ml-idioma-elegido";

export function guardarPreferenciaIdioma(idioma: Idioma | "cerrado"): void {
  try {
    localStorage.setItem(CLAVE, idioma);
  } catch {
    // Navegación privada o almacenamiento bloqueado: no pasa nada.
  }
}

export function hayPreferenciaIdioma(): boolean {
  try {
    return localStorage.getItem(CLAVE) !== null;
  } catch {
    return false;
  }
}

/** Idioma principal del navegador si es uno del sitio; null si es otro (fr, de...). */
export function idiomaDelNavegador(languages: readonly string[]): Idioma | null {
  const principal = (languages[0] ?? "").toLowerCase().split("-")[0];
  return (IDIOMAS as readonly string[]).includes(principal) ? (principal as Idioma) : null;
}

const BOTS = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview/i;

/**
 * Idioma al que sugerir cambiar, o null. Se sugiere solo si el idioma principal del
 * navegador es otro idioma del sitio, el visitante no ha elegido antes y no es un robot.
 */
export function idiomaSugerido(input: {
  idiomaPagina: Idioma;
  languages: readonly string[];
  userAgent: string;
  yaEligio: boolean;
}): Idioma | null {
  if (input.yaEligio || BOTS.test(input.userAgent)) return null;
  const nav = idiomaDelNavegador(input.languages);
  return nav && nav !== input.idiomaPagina ? nav : null;
}
