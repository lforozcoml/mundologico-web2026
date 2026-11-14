import { withSentryConfig } from "@sentry/nextjs/config";
import type { NextConfig } from "next";
import { slugPrincipal, tarjetaGeneral, tarjetasRetiradas } from "./src/content/data/tarjeta";

const nextConfig: NextConfig = {
  experimental: { globalNotFound: true },
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

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/sourcemaps/uploading/bundler-plugin-options/

  org: "mundologico-mj",

  project: "mundologico-web2026",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
