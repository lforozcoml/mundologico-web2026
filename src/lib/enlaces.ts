import type { Idioma } from "@/lib/contact";

/** Ruta de la página de demos. No listada: no va en menú, footer, sitemap ni robots.txt. */
export const RUTA_DEMOS = "/demos-ml";

const SRC_RE = /^[a-z0-9_-]{1,32}$/i;

/** ?src= corto y seguro para reenviar en enlaces y analítica, o null. */
export function srcSeguro(value: unknown): string | null {
  return typeof value === "string" && SRC_RE.test(value) ? value.toLowerCase() : null;
}

/**
 * Enlace interno que conserva src y pone lang solo para inglés (sin ?lang= es español).
 * `extra` agrega otros parámetros, por ejemplo interes.
 */
export function hrefConIdioma(
  ruta: string,
  src: string | null | undefined,
  idioma: Idioma,
  extra: Record<string, string> = {},
  hash = "",
): string {
  const params = new URLSearchParams();
  const s = srcSeguro(src);
  if (s) params.set("src", s);
  if (idioma !== "es") params.set("lang", idioma);
  for (const [k, v] of Object.entries(extra)) params.set(k, v);
  const query = params.toString();
  return `${ruta}${query ? `?${query}` : ""}${hash}`;
}
