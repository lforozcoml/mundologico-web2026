import { derivados, getTarjeta, tarjetas } from "@/content/data/tarjeta";
import { buildVCard } from "@/lib/vcard";

// Un .vcf por tarjeta, generado en el build. Slugs desconocidos dan 404.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return tarjetas.map((t) => ({ slug: t.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const tarjeta = getTarjeta((await params).slug);
  if (!tarjeta) return new Response("No encontrado", { status: 404 });
  return new Response(buildVCard(tarjeta), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${derivados(tarjeta).archivoVcf}"`,
    },
  });
}
