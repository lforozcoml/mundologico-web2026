import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import Script from "next/script";
import { SITE_NAME, SITE_URL } from "@/lib/metadata";
import { consentInitScript } from "@/lib/consent";
import { jsonLdScript, organizationJsonLd } from "@/lib/jsonld";
import { LOCALE_OG, type Idioma } from "@/lib/i18n/config";
import { CookieBanner } from "@/components/layout/CookieBanner";
import "@/app/globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});

// Valores por defecto. Cada página define su propio canonical y openGraph con
// pageMetadata() para no heredar los del home.
export const metadataRaiz: Metadata = {
  title: `${SITE_NAME} | Automatización e IA para empresas`,
  description:
    "Diseñamos e implementamos automatizaciones con IA para que tu equipo deje de hacer trabajo repetitivo y se enfoque en lo que realmente importa.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: SITE_NAME,
    locale: LOCALE_OG.es,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

/**
 * <html> completo del sitio: fuente, JSON-LD de Organization, Consent Mode, GTM y
 * banner de cookies. Lo usan el layout de [lang] y el 404 global, para que el 404
 * siga teniendo lo mismo que antes del i18n.
 */
export function DocumentoRaiz({ idioma, children }: { idioma: Idioma; children: React.ReactNode }) {
  return (
    <html lang={idioma} className={`${tajawal.variable} h-full`}>
      {/* Es el <head> del layout raíz, movido aquí para compartirlo con el 404 global. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript(organizationJsonLd()),
          }}
        />
        {/* Consent Mode v2: debe ir antes de GTM */}
        <script dangerouslySetInnerHTML={{ __html: consentInitScript }} />
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MM4PSS2');`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col antialiased font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MM4PSS2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <CookieBanner idioma={idioma} />
      </body>
    </html>
  );
}
