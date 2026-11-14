import type { Idioma } from "../../lib/i18n/config.ts";

export type CasoColor = "teal" | "blue" | "purple";

export type Caso = {
  slug: string;
  color: CasoColor;
  industry: string;
  nombre: string;
  tagline: string;
  subtitulo: string;
  metricNum: string;
  metricLabel: string;
  minis: { num: string; lbl: string }[];
  desc: string;
  stack: string[];
  // Contenido página individual
  problema: string;
  solucion: string;
  stats: { num: string; lbl: string }[];
};

export const casos: Caso[] = [
  {
    slug: "compas-urbano",
    color: "teal",
    industry: "Sector público · Cultura",
    nombre: "Entidad pública · Medellín",
    tagline: "Agenda cultural inteligente para una ciudad",
    subtitulo: "De 13 fuentes desconectadas a una base unificada de 8.212 eventos, con un agente de IA atendiendo ciudadanos por WhatsApp 24/7.",
    metricNum: "91%",
    metricLabel: "de usuarios recomendaría el canal",
    minis: [
      { num: "8.212", lbl: "eventos en base" },
      { num: "2.036", lbl: "usuarios WhatsApp" },
      { num: "13",    lbl: "fuentes activas" },
    ],
    desc: "Red de scraping que consolida eventos culturales de 13 fuentes + agente IA que atiende ciudadanos por WhatsApp.",
    stack: ["Make.com", "OpenAI", "Airtable", "WhatsApp API"],
    problema: "Una entidad pública cultural necesitaba consolidar la agenda de una ciudad desde más de 13 organizaciones distintas. El proceso manual tomaba horas semanales y generaba datos inconsistentes.",
    solucion: "Proyecto 1 — Red de scraping inteligente: 13 automatizaciones en Make.com que extraen eventos de cada fuente, los procesan con OpenAI para estandarizar el formato, y los insertan o actualizan automáticamente en Airtable. El sitio web consulta esta base en tiempo real.\n\nProyecto 2 — Agente conversacional: Asistente de IA conectado directamente a la base de datos de eventos. Atiende ciudadanos por WhatsApp, responde solo con datos reales (no conocimiento genérico del modelo), y al cerrar la conversación lanza automáticamente una encuesta de satisfacción de 5 preguntas.",
    stats: [
      { num: "91%",    lbl: "de usuarios recomendaría el canal" },
      { num: "8.212",  lbl: "eventos en base de datos activa" },
      { num: "2.036",  lbl: "usuarios únicos atendidos por WhatsApp" },
      { num: "18.927", lbl: "mensajes procesados en 18 meses" },
    ],
  },
  {
    slug: "formex",
    color: "blue",
    industry: "Climatización · Distribución",
    nombre: "Distribuidora de climatización · Colombia",
    tagline: "Pre-pedidos internacionales desde China",
    subtitulo: "De correos manuales y hojas de cálculo a un proceso completamente automatizado que orquesta proveedores, clientes y estados en tiempo real.",
    metricNum: "0",
    metricLabel: "correos manuales para coordinar el proceso",
    minis: [
      { num: "10",   lbl: "automatizaciones" },
      { num: "+45",  lbl: "referencias/catálogo" },
      { num: "100%", lbl: "trazabilidad" },
    ],
    desc: "Sistema completo que orquesta apertura de catálogo, invitaciones a clientes, consolidación de órdenes y comunicación de estados sin intervención manual.",
    stack: ["Make.com", "Monday.com"],
    problema: "Una distribuidora mayorista de equipos de climatización coordinaba pedidos internacionales desde China con una cadena de correos manuales entre proveedores, bodega y clientes. Cada temporada de catálogo requería decenas de horas de coordinación y era propensa a errores.",
    solucion: "Sistema de 10 automatizaciones en Make.com que orquesta todo el ciclo: apertura de catálogo con invitaciones automáticas a clientes segmentados, consolidación de órdenes en Monday.com, sincronización con Google Sheets para proveedores, y notificaciones de estado automáticas en cada etapa del proceso. Cero intervención manual después de activar la temporada.",
    stats: [
      { num: "0",    lbl: "correos manuales en el proceso" },
      { num: "10",   lbl: "automatizaciones activas" },
      { num: "+45",  lbl: "referencias gestionadas automáticamente" },
      { num: "100%", lbl: "trazabilidad del pedido en tiempo real" },
    ],
  },
  {
    slug: "mdo-mortgage",
    color: "purple",
    industry: "Finanzas · Hipotecas · USA",
    nombre: "Empresa hipotecaria · EE.UU.",
    tagline: "CRM + telefonía integrados automáticamente",
    subtitulo: "Cada llamada y SMS registrado en Bitrix24 en 5.5 segundos. 73 horas de trabajo manual eliminadas en el primer mes.",
    metricNum: "73h",
    metricLabel: "trabajo manual eliminado en el primer mes",
    minis: [
      { num: "99.99%", lbl: "tasa de éxito" },
      { num: "1.096",  lbl: "llamadas/mes" },
      { num: "5.5s",   lbl: "respuesta promedio" },
    ],
    desc: "Automatización que registra llamadas y SMS de Dialpad directamente en Bitrix24 CRM con matching inteligente por deudor y co-deudores.",
    stack: ["Make.com", "Dialpad API", "Bitrix24"],
    problema: "Una empresa hipotecaria en EE.UU. registraba manualmente cada llamada y SMS de Dialpad en Bitrix24. Con más de 1.000 interacciones mensuales, esto consumía horas de trabajo y generaba registros incompletos o desactualizados.",
    solucion: "Automatización en Make.com que escucha eventos de Dialpad en tiempo real: cada llamada o SMS entrante dispara un flujo que busca al deudor (y co-deudores) en Bitrix24, crea o actualiza el registro correspondiente, y adjunta el log completo de la interacción. El matching es inteligente y maneja variaciones de número y múltiples contactos asociados a un caso.",
    stats: [
      { num: "73h",    lbl: "trabajo manual eliminado en el primer mes" },
      { num: "99.99%", lbl: "tasa de éxito de las automatizaciones" },
      { num: "1.096",  lbl: "llamadas procesadas por mes" },
      { num: "5.5s",   lbl: "tiempo promedio de registro" },
    ],
  },
];

/**
 * Borrador en inglés (pendiente de revisión, ver i18n/revision.ts). Mismos slugs, colores,
 * stack y cifras que en español; solo cambia el formato de los números (8.212 → 8,212).
 */
const casosEn: Caso[] = [
  {
    slug: "compas-urbano",
    color: "teal",
    industry: "Public sector · Culture",
    nombre: "Public agency · Medellín",
    tagline: "A smart cultural calendar for a city",
    subtitulo: "From 13 disconnected sources to a single database of 8,212 events, with an AI agent serving citizens on WhatsApp 24/7.",
    metricNum: "91%",
    metricLabel: "of users would recommend the channel",
    minis: [
      { num: "8,212", lbl: "events in the database" },
      { num: "2,036", lbl: "WhatsApp users" },
      { num: "13",    lbl: "active sources" },
    ],
    desc: "A scraping network that consolidates cultural events from 13 sources, plus an AI agent that serves citizens on WhatsApp.",
    stack: ["Make.com", "OpenAI", "Airtable", "WhatsApp API"],
    problema: "A public cultural agency needed to consolidate a city's events calendar from more than 13 different organizations. The manual process took hours every week and produced inconsistent data.",
    solucion: "Project 1. Smart scraping network: 13 automations in Make.com that pull events from each source, process them with OpenAI to standardize the format, and insert or update them automatically in Airtable. The website queries this database in real time.\n\nProject 2. Conversational agent: an AI assistant connected directly to the events database. It serves citizens on WhatsApp, answers only with real data (not the model's general knowledge), and when the conversation ends it automatically sends a 5-question satisfaction survey.",
    stats: [
      { num: "91%",    lbl: "of users would recommend the channel" },
      { num: "8,212",  lbl: "events in the live database" },
      { num: "2,036",  lbl: "unique users served on WhatsApp" },
      { num: "18,927", lbl: "messages processed in 18 months" },
    ],
  },
  {
    slug: "formex",
    color: "blue",
    industry: "HVAC · Distribution",
    nombre: "HVAC distributor · Colombia",
    tagline: "International pre-orders from China",
    subtitulo: "From manual emails and spreadsheets to a fully automated process that coordinates suppliers, clients and order status in real time.",
    metricNum: "0",
    metricLabel: "manual emails to coordinate the process",
    minis: [
      { num: "10",   lbl: "automations" },
      { num: "+45",  lbl: "SKUs per catalog" },
      { num: "100%", lbl: "traceability" },
    ],
    desc: "A complete system that handles catalog launch, client invitations, order consolidation and status updates with no manual work.",
    stack: ["Make.com", "Monday.com"],
    problema: "A wholesale HVAC equipment distributor coordinated international orders from China through a chain of manual emails between suppliers, the warehouse and clients. Every catalog season took dozens of hours of coordination and was prone to errors.",
    solucion: "A system of 10 automations in Make.com that runs the whole cycle: catalog launch with automatic invitations to segmented clients, order consolidation in Monday.com, syncing with Google Sheets for suppliers, and automatic status notifications at every stage. Zero manual work once the season is activated.",
    stats: [
      { num: "0",    lbl: "manual emails in the process" },
      { num: "10",   lbl: "active automations" },
      { num: "+45",  lbl: "SKUs managed automatically" },
      { num: "100%", lbl: "real-time order traceability" },
    ],
  },
  {
    slug: "mdo-mortgage",
    color: "purple",
    industry: "Finance · Mortgages · USA",
    nombre: "Mortgage company · USA",
    tagline: "CRM and phone system integrated automatically",
    subtitulo: "Every call and text logged in Bitrix24 in 5.5 seconds. 73 hours of manual work eliminated in the first month.",
    metricNum: "73h",
    metricLabel: "of manual work eliminated in the first month",
    minis: [
      { num: "99.99%", lbl: "success rate" },
      { num: "1,096",  lbl: "calls per month" },
      { num: "5.5s",   lbl: "average response" },
    ],
    desc: "An automation that logs Dialpad calls and texts directly in the Bitrix24 CRM, with smart matching by borrower and co-borrowers.",
    stack: ["Make.com", "Dialpad API", "Bitrix24"],
    problema: "A US mortgage company logged every Dialpad call and text in Bitrix24 by hand. With more than 1,000 interactions a month, this took hours of work and left records incomplete or outdated.",
    solucion: "An automation in Make.com that listens to Dialpad events in real time: every incoming call or text triggers a flow that finds the borrower (and co-borrowers) in Bitrix24, creates or updates the matching record, and attaches the full interaction log. The matching is smart and handles number variations and multiple contacts tied to one case.",
    stats: [
      { num: "73h",    lbl: "of manual work eliminated in the first month" },
      { num: "99.99%", lbl: "automation success rate" },
      { num: "1,096",  lbl: "calls processed per month" },
      { num: "5.5s",   lbl: "average logging time" },
    ],
  },
];

/** Casos por idioma. El español es el arreglo `casos` de arriba, sin cambios. */
export const casosPorIdioma: Record<Idioma, Caso[]> = { es: casos, en: casosEn };
