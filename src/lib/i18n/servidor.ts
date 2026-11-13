import { notFound } from "next/navigation";
import { IDIOMA_POR_DEFECTO, IDIOMAS, hasLocale, type Idioma } from "@/lib/i18n/config";
import { tieneIdioma, type RutaId } from "@/lib/i18n/rutas";

type ConLang = { lang: string };

/** Para generateStaticParams del layout: un idioma por entrada. */
export function paramsIdiomas(): { lang: Idioma }[] {
  return IDIOMAS.map((lang) => ({ lang }));
}

/**
 * Idioma de una página del mapa de rutas. 404 si el idioma no existe o si esa
 * ruta no tiene par en ese idioma (legales, Nosotros pendiente).
 */
export async function idiomaDePagina(params: Promise<ConLang>, ruta: RutaId): Promise<Idioma> {
  const { lang } = await params;
  if (!hasLocale(lang) || !tieneIdioma(ruta, lang)) notFound();
  return lang;
}

/**
 * Páginas fuera del mapa (demos y tarjeta, que usan ?lang=): solo existen sin prefijo.
 * El proxy ya no las deja llegar con /en; esto cubre el path interno.
 */
export async function soloSinPrefijo(params: Promise<ConLang>): Promise<void> {
  const { lang } = await params;
  if (lang !== IDIOMA_POR_DEFECTO) notFound();
}
