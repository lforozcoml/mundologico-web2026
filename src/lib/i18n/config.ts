/**
 * Configuración de idiomas del sitio. Única fuente: la usan el proxy, las rutas
 * [lang], la metadata, el sitemap, los diccionarios y el formulario de contacto.
 * No importa nada para que los tests unitarios lo carguen con Node directamente.
 *
 * Para sumar un idioma (por ejemplo "fr"): agregarlo a IDIOMAS y a LOCALE_OG.
 * TypeScript marca cada diccionario y cada ruta que quede sin ese idioma.
 */

export const IDIOMAS = ["es", "en"] as const;
export type Idioma = (typeof IDIOMAS)[number];

/** Va sin prefijo en la URL (las rutas en español de siempre). */
export const IDIOMA_POR_DEFECTO = "es" satisfies Idioma;
export type IdiomaPorDefecto = typeof IDIOMA_POR_DEFECTO;

/** Idiomas que llevan prefijo en la URL (/en/...). */
export const IDIOMAS_CON_PREFIJO = IDIOMAS.filter(
  (i): i is Exclude<Idioma, IdiomaPorDefecto> => i !== IDIOMA_POR_DEFECTO,
);

/**
 * Bandera de publicación del inglés. Con false: /en/ existe en el build pero lleva
 * noindex, nofollow, no entra al sitemap, no hay hreflang hacia /en y nada lo enlaza.
 * No pasar a true mientras quede algún "[FALTA REVISION EN]" (lo bloquea un test unitario).
 */
export const PUBLICADO_EN: boolean = false;

/** Marca del texto provisional en inglés que falta revisar. */
export const MARCA_FALTA_REVISION = "[FALTA REVISION EN]";

/** Locale de Open Graph por idioma. */
export const LOCALE_OG: Record<Idioma, string> = {
  es: "es_CO",
  en: "en_US",
};

/** Nombre del idioma para schema.org (availableLanguage, inLanguage usa el código). */
export const NOMBRE_IDIOMA_SCHEMA: Record<Idioma, string> = {
  es: "Spanish",
  en: "English",
};

/** Narrowing de un string cualquiera (params de la ruta) a un idioma soportado. */
export function hasLocale(value: string): value is Idioma {
  return (IDIOMAS as readonly string[]).includes(value);
}

/** Idiomas publicados: el de por defecto siempre, el resto según su bandera. */
export function idiomaPublicado(idioma: Idioma, publicadoEn: boolean = PUBLICADO_EN): boolean {
  return idioma === IDIOMA_POR_DEFECTO || (idioma === "en" && publicadoEn);
}
