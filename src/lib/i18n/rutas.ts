/**
 * Mapa de rutas por idioma. Única fuente para los enlaces internos, el selector de
 * idioma, los alternates (hreflang) de la metadata, el sitemap y el proxy.
 * Solo importa con ruta relativa y .ts para que los tests unitarios lo carguen con Node.
 *
 * Reglas:
 * - `es` es la URL pública en español y también la carpeta dentro de app/[lang].
 * - Cada idioma con prefijo tiene su path SIN el prefijo ("/products", no "/en/products"),
 *   "solo-es" si por decisión no tendrá par, o "pendiente" si lo tendrá más adelante.
 * - Los segmentos dinámicos ([slug]) se llaman igual en todos los idiomas y el valor
 *   del slug no se traduce.
 * - /demos-ml y /contacto/[slug] no van aquí: usan ?lang= y solo existen sin prefijo.
 */

import { IDIOMAS, IDIOMA_POR_DEFECTO, PUBLICADO_EN, idiomaPublicado, type Idioma } from "./config.ts";
import { PUBLICADO as ECOMMERCE_PUBLICADO, ULTIMA_ACTUALIZACION as ECOMMERCE_ACTUALIZADO } from "../../content/data/ecommerce-shopify.ts";

type IdiomaConPrefijo = Exclude<Idioma, typeof IDIOMA_POR_DEFECTO>;

/** Sin par en ese idioma: por decisión ("solo-es") o porque aún no se traduce ("pendiente"). */
export type SinPar = "solo-es" | "pendiente";

export type RutaSitio = {
  /** URL pública en español, sin prefijo. También la carpeta en app/[lang]. */
  es: string;
  /** Path por idioma con prefijo, sin el prefijo. */
  traducciones: Record<IdiomaConPrefijo, string | SinPar>;
  /** Último cambio de contenido (AAAA-MM-DD, hora de Colombia). Va al lastModified del sitemap. */
  actualizado: string;
  changeFrequency: "monthly" | "yearly";
  priority: number;
  /** Página detrás de su propia bandera de publicación. Sin publicar: fuera del sitemap y sin hreflang. */
  publicada: boolean;
};

export const RUTAS = {
  inicio: {
    es: "/",
    traducciones: { en: "/" },
    actualizado: "2026-11-08",
    changeFrequency: "monthly",
    priority: 1.0,
    publicada: true,
  },
  productos: {
    es: "/productos",
    traducciones: { en: "/products" },
    actualizado: "2026-11-06",
    changeFrequency: "monthly",
    priority: 0.9,
    publicada: true,
  },
  ecommerceShopify: {
    es: "/productos/ecommerce-shopify",
    traducciones: { en: "/products/shopify-ecommerce" },
    actualizado: ECOMMERCE_ACTUALIZADO,
    changeFrequency: "monthly",
    priority: 0.8,
    publicada: ECOMMERCE_PUBLICADO,
  },
  casos: {
    es: "/casos",
    traducciones: { en: "/case-studies" },
    actualizado: "2026-10-30",
    changeFrequency: "monthly",
    priority: 0.8,
    publicada: true,
  },
  caso: {
    es: "/casos/[slug]",
    traducciones: { en: "/case-studies/[slug]" },
    actualizado: "2026-10-30",
    changeFrequency: "yearly",
    priority: 0.7,
    publicada: true,
  },
  nosotros: {
    es: "/nosotros",
    traducciones: { en: "pendiente" },
    actualizado: "2026-10-30",
    changeFrequency: "yearly",
    priority: 0.6,
    publicada: true,
  },
  terminos: {
    es: "/terminos",
    traducciones: { en: "solo-es" },
    actualizado: "2026-10-30",
    changeFrequency: "yearly",
    priority: 0.3,
    publicada: true,
  },
  privacidad: {
    es: "/privacidad",
    traducciones: { en: "solo-es" },
    actualizado: "2026-10-30",
    changeFrequency: "yearly",
    priority: 0.3,
    publicada: true,
  },
} as const satisfies Record<string, RutaSitio>;

export type RutaId = keyof typeof RUTAS;
export type ParamsRuta = Readonly<Record<string, string>>;

const IDS = Object.keys(RUTAS) as RutaId[];

function esSinPar(path: string): path is SinPar {
  return path === "solo-es" || path === "pendiente";
}

/** Path de la ruta en ese idioma, sin prefijo y sin rellenar, o null si no tiene par. */
export function patronEn(id: RutaId, idioma: Idioma): string | null {
  const ruta: RutaSitio = RUTAS[id];
  if (idioma === IDIOMA_POR_DEFECTO) return ruta.es;
  const path = ruta.traducciones[idioma];
  return esSinPar(path) ? null : path;
}

/** ¿La ruta existe en ese idioma? (sin mirar banderas de publicación). */
export function tieneIdioma(id: RutaId, idioma: Idioma): boolean {
  return patronEn(id, idioma) !== null;
}

function rellenar(patron: string, params: ParamsRuta): string {
  return patron.replace(/\[(\w+)\]/g, (_, nombre: string) => {
    const valor = params[nombre];
    if (!valor) throw new Error(`Falta el parámetro "${nombre}" para ${patron}`);
    return encodeURIComponent(valor);
  });
}

function conPrefijo(idioma: Idioma, path: string): string {
  if (idioma === IDIOMA_POR_DEFECTO) return path;
  return path === "/" ? `/${idioma}` : `/${idioma}${path}`;
}

/**
 * URL pública (relativa) de una ruta en un idioma, o null si no tiene par.
 * Ejemplo: enlace("caso", "en", { slug: "formex" }) → "/en/case-studies/formex".
 */
export function enlace(id: RutaId, idioma: Idioma, params: ParamsRuta = {}): string | null {
  const patron = patronEn(id, idioma);
  return patron === null ? null : conPrefijo(idioma, rellenar(patron, params));
}

/** Como enlace(), pero para rutas que existen en ese idioma o caen al español (legales). */
export function enlaceOEspanol(id: RutaId, idioma: Idioma, params: ParamsRuta = {}): string {
  return enlace(id, idioma, params) ?? (enlace(id, IDIOMA_POR_DEFECTO, params) as string);
}

/**
 * hreflang de una ruta: todos los idiomas con par y publicados, más x-default (español).
 * Vacío si la ruta no tiene par publicado o si la propia página no está publicada.
 */
export function alternatesDe(
  id: RutaId,
  params: ParamsRuta = {},
  publicadoEn: boolean = PUBLICADO_EN,
): Partial<Record<Idioma | "x-default", string>> {
  const ruta: RutaSitio = RUTAS[id];
  if (!ruta.publicada) return {};
  const idiomas = IDIOMAS.filter((i) => tieneIdioma(id, i) && idiomaPublicado(i, publicadoEn));
  if (idiomas.length < 2) return {};
  const res: Partial<Record<Idioma | "x-default", string>> = {};
  for (const i of idiomas) res[i] = enlace(id, i, params) as string;
  res["x-default"] = enlace(id, IDIOMA_POR_DEFECTO, params) as string;
  return res;
}

function aRegex(patron: string): { re: RegExp; nombres: string[] } {
  const nombres: string[] = [];
  const cuerpo = patron
    .split("/")
    .map((seg) => {
      const m = /^\[(\w+)\]$/.exec(seg);
      if (m) {
        nombres.push(m[1]);
        return "([^/]+)";
      }
      return seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("/");
  return { re: new RegExp(`^${cuerpo === "" ? "/" : cuerpo}$`), nombres };
}

export type RutaResuelta = { id: RutaId; idioma: Idioma; params: Record<string, string> };

/**
 * Encuentra la ruta a partir de una URL pública (sin barra final, salvo "/").
 * "/en/case-studies/formex" → { id: "caso", idioma: "en", params: { slug: "formex" } }.
 * Null si no está en el mapa (por ejemplo /demos-ml o un path en español bajo /en).
 */
export function resolverRuta(pathname: string): RutaResuelta | null {
  const limpio = pathname.replace(/\/+$/, "") || "/";
  const m = /^\/(en)(\/.*)?$/.exec(limpio);
  const idioma: Idioma = m ? "en" : IDIOMA_POR_DEFECTO;
  const resto = m ? (m[2] ?? "/") : limpio;
  for (const id of IDS) {
    const patron = patronEn(id, idioma);
    if (patron === null) continue;
    const { re, nombres } = aRegex(patron);
    const hit = re.exec(resto);
    if (!hit) continue;
    const params: Record<string, string> = {};
    nombres.forEach((n, i) => (params[n] = decodeURIComponent(hit[i + 1])));
    return { id, idioma, params };
  }
  return null;
}

/**
 * Path interno dentro de app/[lang] para una URL pública ya resuelta:
 * siempre la carpeta en español con el idioma adelante ("/en/casos/formex").
 */
export function pathInterno(r: RutaResuelta): string {
  const carpeta = rellenar(RUTAS[r.id].es, r.params);
  return `/${r.idioma}${carpeta === "/" ? "" : carpeta}`;
}

/**
 * Para el selector de idioma: la misma página en otro idioma, o null si no tiene par
 * (legales, Nosotros pendiente) o si la URL no está en el mapa.
 */
export function rutaEquivalente(pathname: string, destino: Idioma): string | null {
  const r = resolverRuta(pathname);
  return r ? enlace(r.id, destino, r.params) : null;
}

/** Todas las rutas, para pruebas y para el sitemap. */
export const IDS_RUTAS: readonly RutaId[] = IDS;
