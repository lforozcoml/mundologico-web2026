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
    stack: ["Make.com", "Monday.com", "Google Sheets"],
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
