/**
 * Contenido de /productos/ecommerce-shopify por idioma. El español son los objetos de
 * src/content/data/ecommerce-shopify.ts, sin cambios. El inglés es borrador mientras
 * "ecommerce" esté en PENDIENTES_REVISION_EN.
 *
 * Términos fijos en inglés (equivalentes de los términos fijos del español, CLAUDE.md):
 * - "20-minute call, free of charge"
 * - "Store Review" en six areas
 * - "30-, 60- and 90-day plan"
 * - "monthly hours package"
 * - "first response during business hours (Monday to Friday, Colombia time)"
 * - "quoted separately, with scope agreed in writing"
 * - "in your company's name"
 * - "collaborator access with minimum permissions"
 * - Sin la palabra "campaigns" en la sección de soporte.
 *
 * Imports relativos con .ts para que los tests unitarios lo carguen con Node.
 */

import type { Idioma } from "../../../lib/i18n/config.ts";
import type { Textos } from "../../../lib/i18n/tipos.ts";
import {
  bandaFinal,
  comoTrabajamos,
  faq,
  formas,
  hero,
  meta,
  operacion,
  revision,
  soporte,
  tiendasSeccion,
  type ModuloOperacion,
  type ServicioTienda,
  type Tienda,
} from "../ecommerce-shopify.ts";

/** Textos de interfaz que estaban sueltos en los componentes. */
export type UiEcommerce = {
  rutaTrabajoAria: string;
  /** aria-label del diagrama de flujo de la operación. */
  flujo: string;
  logoDe: string;
  enEscritorio: string;
  enCelular: string;
  frente: string;
  automatizacionPregunta: string;
  automatizacionEnlace: string;
  verTienda: string;
  /** Texto oculto junto al nombre de la tienda en su enlace. */
  abrePestana: string;
  paraQuien: string;
  serviciosAria: string;
  queRecibes: string;
  escaleraAria: string;
  despuesCompraAria: string;
  servicios: Record<ServicioTienda, string>;
  migas: { inicio: string; productos: string };
  /** CTA principal de la banda final. null = el valor por defecto de CtaBand (español). */
  bandaCtaPrimario: string | null;
};

/** Textos de cada tienda que cambian por idioma. El resto (logo, url, banderas) es único. */
type TextosTienda = { desde: string; descripcion: string; capturaAlt?: string; cifra?: string };

export type ContenidoEcommerce = {
  meta: Textos<typeof meta>;
  hero: Textos<typeof hero>;
  formas: Textos<typeof formas>;
  revision: Textos<typeof revision>;
  operacion: Textos<typeof operacion>;
  comoTrabajamos: Textos<typeof comoTrabajamos>;
  soporte: Textos<typeof soporte>;
  tiendasSeccion: Textos<typeof tiendasSeccion>;
  bandaFinal: Textos<typeof bandaFinal>;
  faq: Textos<typeof faq>;
  modulos: Record<ModuloOperacion["id"], string>;
  /** Por id de tienda. Las tiendas sin entrada usan sus textos en español. */
  tiendas: Record<string, TextosTienda>;
  ui: UiEcommerce;
};

const es: ContenidoEcommerce = {
  meta,
  hero,
  formas,
  revision,
  operacion,
  comoTrabajamos,
  soporte,
  tiendasSeccion,
  bandaFinal,
  faq,
  // En español los módulos y las tiendas usan sus propios textos (ver ecommerce-shopify.ts).
  modulos: { pedidos: "", conciliacion: "", agente: "" },
  tiendas: {},
  ui: {
    rutaTrabajoAria: "Ruta de trabajo",
    flujo: "Flujo",
    logoDe: "Logo de",
    enEscritorio: "en escritorio",
    enCelular: "en celular",
    frente: "Frente",
    automatizacionPregunta: "¿Hay mucho trabajo manual detrás de tu tienda?",
    automatizacionEnlace: "Ver cómo automatizamos procesos",
    verTienda: "Ver tienda",
    abrePestana: "abre en una pestaña nueva",
    paraQuien: "Para quién",
    serviciosAria: "Servicios",
    queRecibes: "Qué recibes",
    escaleraAria: "Escalera de trabajo",
    despuesCompraAria: "Lo que pasa después de la compra",
    servicios: { Desarrollo: "Desarrollo", "Soporte mensual": "Soporte mensual" },
    migas: { inicio: "Inicio", productos: "Productos" },
    bandaCtaPrimario: null,
  },
};

const en: ContenidoEcommerce = {
  meta: {
    title: "Shopify e-commerce development",
    description:
      "Well-built Shopify stores connected to your operation: orders, payments and support. Custom development, optimization and monthly support from Colombia",
  },
  hero: {
    eyebrow: "Shopify e-commerce development",
    h1: "A Shopify store that sells well and doesn't complicate your operation",
    subtitulo:
      "As a store grows, so do the orders copied by hand, the payments that don't reconcile and the customer service that can't keep up. We build and optimize Shopify stores with what happens after the purchase in mind.",
    ctaPrincipal: "Book a 20-minute call →",
    ctaSecundario: { label: "See how we review a store", href: "#revision" },
    apoyo: "Free of charge. We review your case and tell you whether we can help.",
    lineaApoyo: "We have been building Shopify stores since 2022, operating in Colombian pesos and US dollars.",
    leyenda: "store built by Mundo Lógico",
    etiquetas: ["Orders", "Payment methods", "Customer service"],
  },
  formas: {
    titulo: "Three ways to work with you",
    intro:
      "Every business comes in at a different point. You can start a new store, improve the one that already sells, or hand its upkeep to a team that knows your operation.",
    items: [
      {
        eyebrow: "Store from scratch",
        titulo: "We build your store",
        paraQuien:
          "For businesses selling online for the first time, or that want to rebuild their store on solid foundations.",
        descripcion:
          "We design and build your Shopify store with the catalog, payments, shipping and the way it will connect to your operation in mind from day one.",
        recibes: [
          "Catalog architecture: collections, filters and attributes.",
          "Design and development on Shopify, built for mobile and desktop.",
          "Payment methods and shipping for your market, in one or more currencies.",
          "Launch with the account, the domain and the data in your company's name.",
        ],
        icono: "store",
        enlace: { texto: "See how we do it", href: "#como-trabajamos" },
      },
      {
        eyebrow: "Existing store",
        titulo: "We optimize your store",
        paraQuien:
          "For stores that already sell, built by us or by another team, and that perform below their potential.",
        descripcion:
          "We start with a Store Review in six areas, without touching anything without your approval. With the findings, we prioritize and improve what has the most impact first.",
        recibes: [
          "A report in business language, not just technical.",
          "Findings prioritized by impact and effort.",
          "30-, 60- and 90-day plan.",
          "Execution of the improvements you choose, with scope agreed in writing.",
        ],
        icono: "gauge",
        enlace: { texto: "See the six areas", href: "#revision" },
      },
      {
        eyebrow: "Monthly support",
        titulo: "We look after your store",
        paraQuien:
          "For stores in operation that need a trusted team to fix, adjust and evolve them.",
        descripcion: "A monthly hours package to keep the store healthy and keep improving it.",
        recibes: [
          "Fixes and adjustments within the hours package.",
          "Store monitoring.",
          "First response during business hours.",
          "New features quoted separately, with scope agreed in writing.",
        ],
        icono: "lifebuoy",
        enlace: { texto: "See how it works", href: "#soporte" },
      },
    ],
    cierre: "After any of the three, we can connect your store's operation.",
    peldanos: ["Review", "Project", "Support", "Operation"],
  },
  revision: {
    titulo: "Store Review: where you are losing sales, and what to fix first",
    intro:
      "A store can get traffic and still sell less than expected. Sometimes the problem is checkout, sometimes speed, apps getting in each other's way, or manual processes behind the store. We review six areas and tell you which one weighs the most.",
    recorridoTitulo: "Your customer's journey, and where each area looks",
    recorridoNota: "The numbers in the diagram match the cards.",
    revisamosEtiqueta: "What we review",
    resultadoEtiqueta: "What we make clear",
    frentes: [
      {
        titulo: "Technical SEO",
        tipo: "etapa",
        etapa: "They find you",
        pregunta: "Does Google understand your store and show it to people searching for what you sell?",
        revisamos: [
          "Product and collection titles and descriptions.",
          "Collection structure and internal links.",
          "Structured data and indexing.",
        ],
        resultado: "What keeps you out of search results and what to fix first.",
        icono: "search",
      },
      {
        titulo: "Speed and mobile",
        tipo: "etapa",
        etapa: "They browse",
        pregunta: "Does your store load fast and is it easy to buy from a phone?",
        revisamos: [
          "Load times on mobile.",
          "Images, apps and code that slow it down.",
          "How the menu, filters and product pages work.",
        ],
        resultado: "What makes the store slow or awkward and what to fix first.",
        icono: "smartphone",
      },
      {
        titulo: "Conversion",
        tipo: "etapa",
        etapa: "They buy",
        pregunta: "Where does the purchase drop off?",
        revisamos: [
          "The journey from session to cart, checkout and purchase, step by step.",
          "Friction in checkout and payment methods.",
          "Product and cart pages.",
        ],
        resultado: "At which step you lose the most customers and what changes to test.",
        icono: "funnel",
      },
      {
        titulo: "Operations behind the store",
        tipo: "etapa",
        etapa: "After the purchase",
        pregunta: "How much manual work does each order create?",
        revisamos: [
          "How an order moves from payment to the warehouse.",
          "Payment reconciliation and invoicing.",
          "Customer service and inventory.",
        ],
        resultado: "Which tasks you repeat by hand and which can be automated.",
        icono: "workflow",
      },
      {
        titulo: "Apps and costs",
        tipo: "capa",
        etapa: "Across the whole store",
        pregunta: "Are you paying for apps you don't need?",
        revisamos: [
          "Which apps you have installed and what each one does.",
          "Which ones overlap or duplicate features.",
          "Which ones slow the store down.",
        ],
        resultado: "What to keep, what to change and what to remove.",
        icono: "puzzle",
      },
      {
        titulo: "Analytics and compliance",
        tipo: "capa",
        etapa: "Across the whole journey",
        pregunta: "Can you trust your numbers?",
        revisamos: [
          "That tracking is set up correctly.",
          "Cookie consent.",
          "The store's policies.",
        ],
        resultado: "Whether your numbers are reliable and whether consent and policies are properly implemented.",
        icono: "chart",
      },
    ],
    recibesTitulo: "What you get at the end",
    recibesTexto:
      "A report in business language, with findings prioritized by impact and effort, and a 30-, 60- and 90-day plan.",
    plan: [
      { titulo: "First 30 days", texto: "What has the most impact for the least effort: fixes you notice quickly." },
      { titulo: "Days 31 to 60", texto: "Improvements that take more development or configuration work." },
      { titulo: "Days 61 to 90", texto: "Deeper changes and, if it applies, connecting the operation behind the store." },
    ],
    nota: "We work with collaborator access with minimum permissions. We don't change anything without your approval.",
    cta: "Book a 20-minute call →",
    apoyo: "The call is free of charge. In it we decide whether a review is what your store needs.",
  },
  operacion: {
    titulo: "Connected operations: selling shouldn't create manual work",
    flujo: ["Store", "Order", "Payment", "Warehouse", "Invoice", "Customer"],
    intro: "Depending on the case, we connect your store to what happens after the purchase:",
    nota: "Each module is shown only if we have it running for a client.",
  },
  comoTrabajamos: {
    id: "como-trabajamos",
    titulo: "How we work: you know what comes next at every step",
    intro: "Every step has a clear outcome. The path changes depending on whether your store is new or already exists.",
    rutas: [
      {
        id: "nueva",
        etiqueta: "New store",
        pasos: [
          { titulo: "Scope", texto: "We understand your business and define what the store needs to achieve.", recibes: "Written proposal with scope and timeline" },
          { titulo: "Design", texto: "We define the catalog, navigation and store design.", recibes: "Design for your approval" },
          { titulo: "Development", texto: "We build on Shopify: payments, shipping, currencies, baseline SEO and analytics.", recibes: "Progress you can review" },
          { titulo: "Testing", texto: "We test purchase, payments, shipping, tracking and cookies, on mobile and desktop.", recibes: "Checklist" },
          { titulo: "Launch", texto: "We go live with your domain and your accounts, and train your team.", recibes: "Training and documentation" },
          { titulo: "Support (optional)", texto: "We continue with a monthly hours package.", recibes: "First response during business hours" },
        ],
      },
      {
        id: "existente",
        etiqueta: "Store you already have",
        pasos: [
          { titulo: "Access", texto: "We define what gets reviewed and join as a collaborator with minimum permissions.", recibes: "Scope in writing" },
          { titulo: "Review", texto: "We analyze the six areas of your store.", recibes: "Prioritized findings" },
          { titulo: "Plan", texto: "We walk you through the findings in business language.", recibes: "Report and 30-, 60- and 90-day plan" },
          { titulo: "Improvements", texto: "We carry out what you decide, starting with what has the most impact.", recibes: "Changes with scope in writing" },
          { titulo: "Support (optional)", texto: "We continue with a monthly hours package.", recibes: "First response during business hours" },
        ],
      },
    ],
    confianza: "Your accounts, your domain and your payment gateways always stay in your company's name.",
  },
  soporte: {
    id: "soporte",
    titulo: "Monthly support: your store stays looked after after launch",
    intro: "A monthly hours package with a team that already knows your store.",
    dentroTitulo: "Within the hours package",
    dentro: ["Fixes", "Adjustments", "Store monitoring"],
    aparteTitulo: "Quoted separately",
    aparteTexto: "New features, with scope agreed in writing.",
    respuestaTitulo: "How we respond",
    respuestaTexto: "First response during business hours (Monday to Friday, Colombia time).",
    ilustracion: {
      paquete: "Your monthly hours package",
      segmentos: ["Fixes", "Adjustments", "Monitoring"],
      aparte: "New features: quoted separately",
    },
    cta: "Let's talk about your store's support →",
    apoyo: "The 20-minute call is free of charge.",
  },
  tiendasSeccion: {
    id: "tiendas",
    titulo: "Stores we have built",
    intro: "Businesses that trusted us with building their Shopify store.",
  },
  bandaFinal: {
    titulo: "Do you have a Shopify store, or are you about to open one?",
    descripcion:
      "Book a 20-minute call. We review your case and tell you what to do first and whether we can help.",
    ctaSecundario: { label: "See frequently asked questions", href: "#preguntas" },
  },
  faq: {
    id: "preguntas",
    titulo: "Frequently asked questions",
    items: [
      {
        pregunta: "Will the store, the domain and the data be in my name?",
        respuesta: [
          "Yes. The Shopify account, the domain, the payment gateways and your customer and order data belong to your company. We set everything up under your accounts and work with collaborator access.",
          "If at some point you decide to continue with another team, you just remove our access. The store does not depend on us to operate.",
        ],
      },
      {
        pregunta: "What happens after launch? Do you offer support?",
        respuesta: [
          "Yes. Monthly support works through hours packages and covers fixes, adjustments and store monitoring. We work during business hours, Monday to Friday, Colombia time, and the first response is given within those hours.",
          "New features or larger developments do not use up the hours package: they are defined and quoted separately, with scope agreed in writing.",
        ],
      },
      {
        pregunta: "Do you work with stores that already exist?",
        respuesta: [
          "Yes. Many stores come to us already built, by our team or by others. For those cases we do a Store Review in six areas and deliver a prioritized 30-, 60- and 90-day plan, with what to fix first and why.",
          "To review it we only need collaborator access with the minimum permissions required. We don't touch anything without your approval.",
        ],
      },
      {
        pregunta: "Does it connect to my billing system or ERP?",
        respuesta: [
          "It depends on your system. If it has an API or an available connector, it is usually possible. In the assessment we define what information must flow between the store and your system (orders, inventory, customers, invoices), in which direction and how often.",
          "For electronic invoicing with the DIAN (Colombia's tax authority), we connect the store to the authorized technology provider you already use or the one you choose.",
          "If your system does not allow integration, we tell you from the start and propose a realistic alternative instead of promising something that can't be sustained.",
        ],
      },
      {
        pregunta: "How much does it cost and how long does it take?",
        respuesta: [
          "It depends on the scope: catalog size, integrations, markets and currencies, the content you already have and the level of customization. That is why we don't publish a single price.",
          "After an initial conversation, we give you a written proposal with scope, deliverables, assumptions, exclusions, timeline and acceptance criteria. That way you know what you get and when before you commit.",
        ],
      },
      {
        pregunta: "What do I need to have ready to get started?",
        respuesta: [
          "The basics are your brand (logo and colors), your catalog (products, prices and photos), your company's legal documents to activate the payment gateways, your shipping rules, and a decision-maker who will be our point of contact.",
          "If any of this is not defined yet, we work on it with you at the start of the project.",
        ],
      },
      {
        pregunta: "How are you different from an agency that only designs the store?",
        respuesta: [
          "A good-looking store is the starting point. We also design how it connects to your operation: orders, payments, inventory and customer service.",
          "We also define from the start which metrics you need to make decisions with your own data. The goal is for the store not only to sell, but to let you read your business.",
        ],
      },
      {
        pregunta: "Which payment methods and shipping options can be set up?",
        respuesta: [
          "We set up the payment gateways and shipping options available in Shopify for your country, based on what you choose for your business.",
          "If you handle several payment methods, we evaluate with you how to automate reconciliation so that matching sales and collections is no longer a manual process.",
        ],
      },
      {
        pregunta: "Can I sell in several countries or currencies?",
        respuesta: [
          "Yes. Shopify supports multiple markets and currencies. What defines the real scope is the combination of payment gateways, taxes and shipping in each market, and we review that in the assessment.",
          "We have run stores in more than one market and currency.",
        ],
      },
    ],
  },
  modulos: {
    pedidos: "Orders: from payment to the warehouse and tracking, without copying data by hand.",
    conciliacion: "Payment reconciliation: matching each gateway against what the business actually received.",
    agente: "Customer service with AI agents, handing off to a person when needed.",
  },
  tiendas: {
    parchita: {
      desde: "Since 2022",
      descripcion: "A full store in Colombia (pesos) and the US (dollars), with monthly support.",
      capturaAlt: "Home page of the Parchita store at parchita.com.co",
      cifra: "More than 20,000 orders in the last 12 months (as of November 5, 2026).",
    },
    autollantas: { desde: "Since 2023", descripcion: "A tire store with search by vehicle and by size." },
    formex: { desde: "Since 2022", descripcion: "A store for refrigeration and air conditioning supplies." },
  },
  ui: {
    rutaTrabajoAria: "Work path",
    flujo: "Flow",
    logoDe: "Logo of",
    enEscritorio: "on desktop",
    enCelular: "on mobile",
    frente: "Area",
    automatizacionPregunta: "Is there a lot of manual work behind your store?",
    automatizacionEnlace: "See how we automate processes",
    verTienda: "Visit store",
    abrePestana: "opens in a new tab",
    paraQuien: "Who it's for",
    serviciosAria: "Services",
    queRecibes: "What you get",
    escaleraAria: "Ways of working, step by step",
    despuesCompraAria: "What happens after the purchase",
    servicios: { Desarrollo: "Development", "Soporte mensual": "Monthly support" },
    migas: { inicio: "Home", productos: "Products" },
    bandaCtaPrimario: "Book a 20-minute call →",
  },
};

export const ecommerce: Record<Idioma, ContenidoEcommerce> = { es, en };

/** La tienda con sus textos en el idioma pedido (en español, sin cambios). */
export function tiendaEnIdioma(t: Tienda, idioma: Idioma): Tienda {
  const tx = ecommerce[idioma].tiendas[t.id];
  if (!tx) return t;
  return {
    ...t,
    desde: tx.desde,
    descripcion: tx.descripcion,
    ...(t.captura && tx.capturaAlt ? { captura: { ...t.captura, alt: tx.capturaAlt } } : {}),
    ...(t.cifra && tx.cifra ? { cifra: { ...t.cifra, texto: tx.cifra } } : {}),
  };
}

/** El módulo con su texto en el idioma pedido. */
export function moduloEnIdioma(m: ModuloOperacion, idioma: Idioma): ModuloOperacion {
  const texto = ecommerce[idioma].modulos[m.id];
  return texto ? { ...m, texto } : m;
}

/** Leyenda bajo la captura del hero, en el idioma pedido. */
export function leyendaEnIdioma(t: Pick<Tienda, "nombre" | "desde">, idioma: Idioma): string {
  return `${t.nombre}: ${ecommerce[idioma].hero.leyenda}. ${t.desde}.`;
}
