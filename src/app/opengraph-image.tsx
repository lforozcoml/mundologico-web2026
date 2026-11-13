import { site } from "@/content/data/site";
import { TAMANO_IMAGEN_SOCIAL, imagenSocial } from "@/lib/imagen-social";

// Imagen social en español (/opengraph-image). Next la genera en build. La de inglés
// está en app/opengraph-image-en/route.tsx; el diseño es el mismo (src/lib/imagen-social.tsx).
export const alt = `${site.nombre}: automatización e IA para empresas`; // igual a OG_IMAGE.alt en src/lib/metadata.ts
export const size = TAMANO_IMAGEN_SOCIAL;
export const contentType = "image/png";

export default async function Image() {
  return imagenSocial("es");
}
