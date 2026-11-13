import { imagenSocial } from "@/lib/imagen-social";

// Imagen social en inglés (/opengraph-image-en), estática como la de español.
// El proxy no la toca: su matcher excluye todo lo que empieza por "opengraph-image".
export const dynamic = "force-static";

export async function GET() {
  return imagenSocial("en");
}
