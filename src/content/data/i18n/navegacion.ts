/**
 * Diccionarios del Header (nav) y del Footer. Un tipo por sección y una versión por
 * idioma: Record<Idioma, ...> hace fallar el build si falta un idioma o una clave.
 *
 * El inglés es borrador hasta que salga de PENDIENTES_REVISION_EN (revision.ts). Solo se
 * ve entrando directo a /en (noindex, sin enlaces mientras PUBLICADO_EN sea false).
 *
 * Imports relativos con .ts para que los tests unitarios lo carguen con Node.
 */

import type { Idioma } from "../../../lib/i18n/config.ts";
import type { RutaId } from "../../../lib/i18n/rutas.ts";
import { site } from "../site.ts";
import { entrada as entradaEcommerce } from "../ecommerce-shopify.ts";

/** Enlace interno: la URL sale del mapa de rutas según el idioma. */
export type EnlaceNav = { label: string; ruta: RutaId; ancla?: string };

export type DiccHeader = {
  logoAlt: string;
  /** aria-label del botón del menú en móvil. */
  botonMenu: string;
  /** Solo se muestran los que tienen página en ese idioma. */
  links: readonly EnlaceNav[];
  cta: string;
  /** Nombre del otro idioma: aria-label del enlace del selector. */
  cambiarIdioma: string;
  /** aria-label del grupo del selector de idioma. */
  idiomaAria: string;
};

export type DiccFooter = {
  logoAlt: string;
  descripcion: string;
  columnas: { productos: string; empresa: string; legal: string };
  productos: { ecommerce: string; iaLab: string; knowledge: string; support: string; signal: string };
  empresa: { nosotros: string; casos: string; contacto: string };
  legal: { terminos: string; privacidad: string };
  /** Nota junto a los enlaces que llevan a páginas solo en español. Vacía en español. */
  notaSoloEspanol: string;
  derechos: string;
  ciudad: string;
  /** Título del enlace de las insignias de partner. */
  perfilPartner: string;
};

export const header: Record<Idioma, DiccHeader> = {
  es: {
    logoAlt: "Mundo Lógico",
    botonMenu: "Toggle menu",
    links: [
      { label: "Productos", ruta: "productos" },
      { label: "Nosotros", ruta: "nosotros" },
      { label: "Casos de éxito", ruta: "casos" },
      { label: "Contacto", ruta: "inicio", ancla: "#contacto" },
    ],
    cta: "Agendar llamada",
    cambiarIdioma: "English",
    idiomaAria: "Idioma",
  },
  en: {
    logoAlt: "Mundo Lógico",
    botonMenu: "Open menu",
    links: [
      { label: "Products", ruta: "productos" },
      { label: "About us", ruta: "nosotros" },
      { label: "Case studies", ruta: "casos" },
      { label: "Contact", ruta: "inicio", ancla: "#contacto" },
    ],
    cta: "Book a call",
    cambiarIdioma: "Español",
    idiomaAria: "Language",
  },
};

export const footer: Record<Idioma, DiccFooter> = {
  es: {
    logoAlt: "Mundo Lógico",
    descripcion: site.descripcion,
    columnas: { productos: "Productos", empresa: "Empresa", legal: "Legal" },
    productos: {
      ecommerce: entradaEcommerce.pie,
      iaLab: "IA Lab",
      knowledge: "Knowledge Engine",
      support: "Support Engine",
      signal: "Signal Engine",
    },
    empresa: { nosotros: "Nosotros", casos: "Casos de éxito", contacto: "Contacto" },
    legal: { terminos: "Términos y condiciones", privacidad: "Política de privacidad" },
    notaSoloEspanol: "",
    derechos: "Todos los derechos reservados.",
    ciudad: site.contacto.ciudad,
    perfilPartner: "Ver perfil de Mundo Lógico en el directorio de partners",
  },
  en: {
    logoAlt: "Mundo Lógico",
    descripcion: "We connect your tools, your data and AI agents into one system that handles your team's repetitive work. End-to-end processes, not scattered automations or isolated chatbots.",
    columnas: { productos: "Products", empresa: "Company", legal: "Legal" },
    productos: {
      ecommerce: "Shopify e-commerce development",
      iaLab: "IA Lab",
      knowledge: "Knowledge Engine",
      support: "Support Engine",
      signal: "Signal Engine",
    },
    empresa: { nosotros: "About us", casos: "Case studies", contacto: "Contact" },
    legal: { terminos: "Terms and conditions", privacidad: "Privacy policy" },
    notaSoloEspanol: "(Spanish)",
    derechos: "All rights reserved.",
    ciudad: "Medellín, Colombia",
    perfilPartner: "See Mundo Lógico's profile in the partner directory",
  },
};
