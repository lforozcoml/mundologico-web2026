import type { Metadata } from "next";

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

type PageMetadataInput = {
  /** Título de la página sin el sufijo de marca. */
  title: string;
  description: string;
  /** Ruta relativa a SITE_URL, por ejemplo "/productos". */
  path: string;
  type?: "website" | "article";
  /** Usa el título tal cual, sin agregar " | Mundo Lógico". */
  absoluteTitle?: boolean;
};

/**
 * Metadata por página. Next mezcla la metadata de forma superficial, así que
 * cada página debe definir su propio canonical y openGraph completos; si no,
 * hereda los del layout (que apuntan al home).
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "es_CO",
      type,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
