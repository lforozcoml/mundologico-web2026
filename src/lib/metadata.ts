import type { Metadata } from "next";
import { IDIOMAS, LOCALE_OG, idiomaPublicado, type Idioma } from "./i18n/config.ts";
import { alternatesDe, enlace, type ParamsRuta, type RutaId } from "./i18n/rutas.ts";

export const SITE_URL = "https://mundologico.com";
export const SITE_NAME = "Mundo Lógico";

/**
 * Imagen social generada por src/app/opengraph-image.tsx. Se referencia a mano
 * porque el openGraph de cada página reemplaza al del segmento raíz.
 */
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}: automatización e IA para empresas`,
};

/** Imagen social por idioma: misma medida, su propia URL y su alt. */
const OG_POR_IDIOMA: Record<Idioma, { url: string; alt: string }> = {
  es: { url: OG_IMAGE.url, alt: OG_IMAGE.alt },
  en: { url: "/opengraph-image-en", alt: `${SITE_NAME}: automation and AI for businesses` },
};

type Comunes = {
  /** Título de la página sin el sufijo de marca. */
  title: string;
  description: string;
  type?: "website" | "article";
  /** Usa el título tal cual, sin agregar " | Mundo Lógico". */
  absoluteTitle?: boolean;
  /** Solo para pruebas: por defecto la bandera PUBLICADO_EN. */
  publicadoEn?: boolean;
};

/** Página del mapa de rutas: canonical propio por idioma y hreflang recíproco. */
type EnMapa = Comunes & { idioma: Idioma; ruta: RutaId; params?: ParamsRuta };

/**
 * Página fuera del mapa (demos y tarjeta, con ?lang=): un solo canonical, sin hreflang,
 * siempre con el locale del español como hasta ahora.
 */
type FueraDelMapa = Comunes & { path: string };

export type PageMetadataInput = EnMapa | FueraDelMapa;

const NOINDEX = { index: false, follow: false } as const;

/** robots para un idioma: noindex, nofollow mientras ese idioma no esté publicado. */
export function robotsIdioma(idioma: Idioma, publicadoEn?: boolean): Metadata["robots"] | undefined {
  return idiomaPublicado(idioma, publicadoEn) ? undefined : NOINDEX;
}

/**
 * Metadata por página. Next mezcla la metadata de forma superficial, así que
 * cada página debe definir su propio canonical y openGraph completos; si no,
 * hereda los del layout (que apuntan al home).
 *
 * Con el inglés sin publicar, el español sale igual que antes del i18n: sin
 * alternates.languages ni alternateLocale. El inglés lleva noindex, nofollow.
 */
export function pageMetadata(input: PageMetadataInput): Metadata {
  const { title, description, type = "website", absoluteTitle = false, publicadoEn } = input;
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  const enMapa = "ruta" in input;
  const idioma: Idioma = enMapa ? input.idioma : "es";
  const path = enMapa ? enlace(input.ruta, idioma, input.params) : input.path;
  if (path === null) throw new Error(`La ruta ${enMapa ? input.ruta : ""} no existe en ${idioma}`);

  const languages = enMapa ? alternatesDe(input.ruta, input.params, publicadoEn) : {};
  const conPares = Object.keys(languages).length > 0;
  const alternateLocale = conPares
    ? IDIOMAS.filter((i) => i !== idioma && languages[i]).map((i) => LOCALE_OG[i])
    : [];
  const robots = robotsIdioma(idioma, publicadoEn);
  const imagen = { ...OG_IMAGE, ...OG_POR_IDIOMA[idioma] };

  return {
    title: { absolute: fullTitle },
    description,
    alternates: conPares ? { canonical: path, languages } : { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: LOCALE_OG[idioma],
      ...(alternateLocale.length ? { alternateLocale } : {}),
      type,
      images: [imagen],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imagen],
    },
    ...(robots ? { robots } : {}),
  };
}
