/**
 * Textos del banner de cookies y del botón del footer. El inglés es borrador mientras
 * "cookies" esté en PENDIENTES_REVISION_EN. La política de privacidad solo existe en español.
 */

import type { Idioma } from "../../../lib/i18n/config.ts";

export type TextosCookies = {
  categorias: { analytics: { titulo: string; desc: string }; marketing: { titulo: string; desc: string } };
  avisoAria: string;
  compacto: string;
  privacidadCorta: string;
  titulo: string;
  texto: string;
  enlacePolitica: string;
  despuesEnlace: string;
  necesarias: string;
  siempreActivas: string;
  necesariasDesc: string;
  guardar: string;
  configurar: string;
  soloNecesarias: string;
  aceptarTodas: string;
  botonFooter: string;
};

export const cookies: Record<Idioma, TextosCookies> = {
  es: {
    categorias: {
      analytics: {
        titulo: "Analítica",
        desc: "Nos dicen qué páginas se visitan y cómo se usa el sitio, para mejorarlo. Google Analytics.",
      },
      marketing: {
        titulo: "Marketing",
        desc: "Miden campañas publicitarias y permiten mostrarte anuncios relevantes. Google Ads.",
      },
    },
    avisoAria: "Aviso de cookies",
    compacto: "Usamos cookies de analítica.",
    privacidadCorta: "Privacidad",
    titulo: "Usamos cookies",
    texto:
      "Usamos cookies de analítica para entender cómo se usa el sitio y mejorarlo. Las de marketing solo se activan si las aceptas. Puedes cambiar tu decisión cuando quieras desde el pie de página. Más detalles en la",
    enlacePolitica: "política de privacidad",
    despuesEnlace: ".",
    necesarias: "Necesarias",
    siempreActivas: "Siempre activas",
    necesariasDesc: "Hacen funcionar el sitio y recuerdan esta decisión.",
    guardar: "Guardar preferencias",
    configurar: "Configurar",
    soloNecesarias: "Solo necesarias",
    aceptarTodas: "Aceptar todas",
    botonFooter: "Configurar cookies",
  },
  en: {
    categorias: {
      analytics: {
        titulo: "Analytics",
        desc: "They tell us which pages are visited and how the site is used, so we can improve it. Google Analytics.",
      },
      marketing: {
        titulo: "Marketing",
        desc: "They measure advertising and let us show you relevant ads. Google Ads.",
      },
    },
    avisoAria: "Cookie notice",
    compacto: "We use analytics cookies.",
    privacidadCorta: "Privacy (Spanish)",
    titulo: "We use cookies",
    texto:
      "We use analytics cookies to understand how the site is used and improve it. Marketing cookies are only turned on if you accept them. You can change your choice at any time from the footer. More details in the",
    enlacePolitica: "privacy policy",
    despuesEnlace: " (in Spanish).",
    necesarias: "Necessary",
    siempreActivas: "Always on",
    necesariasDesc: "They make the site work and remember this choice.",
    guardar: "Save preferences",
    configurar: "Settings",
    soloNecesarias: "Necessary only",
    aceptarTodas: "Accept all",
    botonFooter: "Cookie settings",
  },
};
