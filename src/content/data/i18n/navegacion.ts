/**
 * Diccionarios del Header (nav) y del Footer. Un tipo por sección y una versión por
 * idioma: Record<Idioma, ...> hace fallar el build si falta un idioma o una clave.
 *
 * El inglés es provisional y lleva MARCA_FALTA_REVISION: solo se ve entrando directo a
 * /en (noindex, sin enlaces mientras PUBLICADO_EN sea false). Un test unitario impide
 * publicar el inglés con marcas pendientes.
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
  /** Texto del enlace a la otra versión (solo visible con PUBLICADO_EN en true). */
  cambiarIdioma: string;
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
};

const M = "[FALTA REVISION EN]";

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
  },
  en: {
    logoAlt: "Mundo Lógico",
    botonMenu: `${M} Toggle menu`,
    links: [
      { label: `${M} Products`, ruta: "productos" },
      { label: `${M} About us`, ruta: "nosotros" },
      { label: `${M} Case studies`, ruta: "casos" },
      { label: `${M} Contact`, ruta: "inicio", ancla: "#contacto" },
    ],
    cta: `${M} Book a call`,
    cambiarIdioma: "Español",
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
  },
  en: {
    logoAlt: "Mundo Lógico",
    descripcion: `${M} We connect your tools, your data and AI agents into a single system that does your team's repetitive work. Complete processes, not loose automations or isolated chatbots.`,
    columnas: { productos: `${M} Products`, empresa: `${M} Company`, legal: `${M} Legal` },
    productos: {
      ecommerce: `${M} Shopify e-commerce development`,
      iaLab: "IA Lab",
      knowledge: "Knowledge Engine",
      support: "Support Engine",
      signal: "Signal Engine",
    },
    empresa: { nosotros: `${M} About us`, casos: `${M} Case studies`, contacto: `${M} Contact` },
    legal: { terminos: `${M} Terms and conditions`, privacidad: `${M} Privacy policy` },
    notaSoloEspanol: "(Spanish)",
    derechos: `${M} All rights reserved.`,
    ciudad: "Medellín, Colombia",
  },
};
