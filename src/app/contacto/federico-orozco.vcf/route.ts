import { tarjetaContacto } from "@/content/data/tarjeta";
import { buildVCard } from "@/lib/vcard";

// Se genera en el build y queda en el CDN.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildVCard(tarjetaContacto), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${tarjetaContacto.archivoVcf}"`,
    },
  });
}
