import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import Script from "next/script";
import { SITE_NAME, SITE_URL } from "@/lib/metadata";
import { consentInitScript } from "@/lib/consent";
import { CookieBanner } from "@/components/layout/CookieBanner";
import "./globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});

// Valores por defecto. Cada página define su propio canonical y openGraph con
// pageMetadata() para no heredar los del home.
export const metadata: Metadata = {
  title: `${SITE_NAME} | Automatización e IA para empresas`,
  description:
    "Diseñamos e implementamos automatizaciones con IA para que tu equipo deje de hacer trabajo repetitivo y se enfoque en lo que realmente importa.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: SITE_NAME,
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${tajawal.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Mundo Lógico",
              url: SITE_URL,
              logo: `${SITE_URL}/icon.png`,
              contactPoint: {
                "@type": "ContactPoint",
                email: "hola@mundologico.com",
                telephone: "+57-312-8315581",
                contactType: "customer support",
                areaServed: ["CO", "US"],
                availableLanguage: "Spanish",
              },
              sameAs: ["https://www.linkedin.com/company/mundologico"],
            }),
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
        <CookieBanner />
      </body>
    </html>
  );
}
