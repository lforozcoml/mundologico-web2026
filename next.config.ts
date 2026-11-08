import type { NextConfig } from "next";
import { slugPrincipal, tarjetaGeneral, tarjetasRetiradas } from "./src/content/data/tarjeta";

const nextConfig: NextConfig = {
  // /demos-ml es no listada: noindex también en cabecera, además de la meta de la página.
  // No se pone en Disallow de robots.txt porque eso la revela (y Google no vería el noindex).
  async headers() {
    return [
      { source: "/demos-ml", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/demos-ml/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mundologico.com" }],
        destination: "https://mundologico.com/:path*",
        permanent: true,
      },
      // Tarjetas NFC. Next conserva el query string (?src=nfc) en el destino.
      // Temporal: si un día /contacto pasa a ser un directorio del equipo, no queda cacheado.
      { source: "/contacto", destination: `/contacto/${slugPrincipal}`, permanent: false },
      // URL del .vcf de la primera versión.
      {
        source: `/contacto/${slugPrincipal}.vcf`,
        destination: `/contacto/${slugPrincipal}/contacto.vcf`,
        permanent: true,
      },
      // Personas que ya no están: su tag abre la tarjeta general.
      ...tarjetasRetiradas.flatMap((slug) => [
        { source: `/contacto/${slug}`, destination: `/contacto/${tarjetaGeneral.slug}`, permanent: false },
        {
          source: `/contacto/${slug}/:path*`,
          destination: `/contacto/${tarjetaGeneral.slug}/:path*`,
          permanent: false,
        },
      ]),
    ];
  },
};

export default nextConfig;
