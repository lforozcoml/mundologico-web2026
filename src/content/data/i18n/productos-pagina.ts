/**
 * Contenido de /productos (y /en/products): detalle de cada producto de automatización.
 * El español es el copy publicado, movido sin cambios desde la página. El inglés es
 * borrador mientras "productos-pagina" esté en PENDIENTES_REVISION_EN.
 */

import type { Idioma } from "../../../lib/i18n/config.ts";

export type ColorProducto = "blue" | "teal" | "purple" | "lavender";

export type ProductoDetalle = {
  id: string;
  numero: string;
  nombre: string;
  tagline: string;
  color: ColorProducto;
  problema: string;
  descripcion: string;
  pasos: { titulo: string; desc: string }[];
  features: string[];
  addons: { label: string; items: string[] };
  para_quien: string[];
  no_es_para: string[];
  stack: string[];
};

const productosEs: ProductoDetalle[] = [
  {
    id: "ia-lab",
    numero: "01",
    nombre: "IA Lab",
    tagline: "En 90 días sabes si tu hipótesis de IA funciona — con datos reales y el sistema ya construido.",
    color: "purple",
    problema: "Las empresas saben que deben incorporar IA pero no saben por dónde empezar sin arriesgar sus sistemas o presupuestos. Los proyectos de exploración genéricos son costosos, demoran meses y terminan en informes sin nada implementado. El resultado: inversión sin retorno medible y resistencia interna que bloquea la adopción real.",
    descripcion: "Tomamos un caso de uso de negocio concreto, construimos un experimento con arquitectura real, lo medimos con métricas definidas desde el inicio, y lo iteramos mínimo dos veces — todo en un ambiente sandbox, sin tocar los sistemas productivos. En 90 días tienes una decisión basada en datos: escalar o no. Y si escala, el sistema ya está construido.",
    pasos: [
      { titulo: "Definición", desc: "Caso de uso, hipótesis, métricas de éxito técnicas y de negocio. Sin KPI definido, el experimento no arranca." },
      { titulo: "Construcción", desc: "Arquitectura funcional completa en sandbox — datos, flujos, inteligencia. Nunca en producción." },
      { titulo: "Iteración", desc: "Mínimo dos ciclos de ajuste y medición con datos reales del cliente." },
      { titulo: "Decisión", desc: "¿Cumple la métrica? ¿El impacto es medible? ¿El costo proyectado es viable? Si sí — ya está listo para producción." },
    ],
    features: [
      "De la hipótesis a un MVP validado en 90 días",
      "Sandbox seguro — sin tocar sistemas productivos",
      "Métricas técnicas y de negocio definidas antes de arrancar",
      "Mínimo 2 ciclos de iteración por caso de uso",
    ],
    addons: {
      label: "Casos de uso frecuentes",
      items: ["Procesamiento de documentos", "Atención al cliente", "Reportes automáticos", "Onboarding automatizado"],
    },
    para_quien: [
      "Empresas medianas o grandes que quieren validar IA antes de comprometer presupuesto",
      "Organizaciones con procesos repetitivos donde sospechan que la IA puede ayudar pero no tienen certeza",
      "Equipos de innovación que necesitan evidencia para venderle la idea internamente",
    ],
    no_es_para: [
      "Empresas que ya saben exactamente qué construir y tienen presupuesto aprobado",
      "Proyectos donde no hay acceso a datos reales del proceso",
    ],
    stack: ["Make.com", "OpenAI", "Claude", "Gemini", "Airtable", "Monday.com"],
  },
  {
    id: "knowledge-engine",
    numero: "02",
    nombre: "Knowledge Engine",
    tagline: "Tu base de conocimiento siempre actualizada, sin depender de que alguien encuentre el tiempo de escribir.",
    color: "blue",
    problema: "Tu equipo de soporte pierde horas respondiendo siempre las mismas preguntas. La base de conocimiento existe pero está desactualizada, incompleta o mal estructurada. Cuando los procesos cambian, nadie actualiza la documentación. El resultado: los agentes improvisan, los clientes no encuentran respuestas, y los tickets siguen creciendo.",
    descripcion: "Construimos y mantenemos la base de conocimiento de tu mesa de ayuda con agentes de IA. Tu equipo da las instrucciones, los agentes generan el contenido, tú lo validas, y el sistema publica y actualiza automáticamente en la plataforma que ya usas.",
    pasos: [
      { titulo: "Ingesta", desc: "El cliente entrega lo que tiene — PDFs, tickets resueltos, manuales. Los agentes estructuran la base." },
      { titulo: "Generación", desc: "El equipo indica qué artículo necesita. El agente genera el borrador usando solo información validada." },
      { titulo: "Validación", desc: "El validador aprueba o rechaza con comentarios. Si rechaza, el agente corrige sin reescribir desde cero." },
      { titulo: "Publicación", desc: "El sistema publica automáticamente. Cuando algo cambia, detecta los artículos afectados y los marca para actualizar." },
    ],
    features: [
      "Genera artículos desde instrucciones en lenguaje natural",
      "Flujo editorial con aprobación, rechazo y fecha programada",
      "Publica automáticamente en Zendesk, WordPress, Confluence y más",
      "Detecta contenido desactualizado y lo marca para revisión",
    ],
    addons: {
      label: "Add-ons disponibles",
      items: ["Múltiples idiomas", "Actualizaciones automáticas", "Imágenes con IA"],
    },
    para_quien: [
      "Empresas con equipos de soporte que atienden volumen alto de consultas repetitivas",
      "Organizaciones con documentación dispersa que nadie mantiene actualizada",
      "Empresas que ya tienen Zendesk, Freshdesk o similar pero lo usan por debajo de su potencial",
    ],
    no_es_para: [
      "Empresas sin ningún proceso documentado",
      "Equipos sin un responsable de validar el contenido generado",
    ],
    stack: ["Claude", "Make.com", "Airtable", "Monday.com", "Zendesk", "Confluence"],
  },
  {
    id: "support-engine",
    numero: "03",
    nombre: "Support Engine",
    tagline: "Tu equipo humano solo atiende los casos que realmente necesitan juicio humano.",
    color: "teal",
    problema: "Los equipos de soporte responden las mismas preguntas todos los días. El volumen crece, contratar más agentes es caro, y los bots genéricos no conocen tu negocio — terminan frustrando al cliente sin resolver nada. Los agentes humanos se desgastan atendiendo casos que no requieren juicio humano, y los tiempos de respuesta siguen siendo altos.",
    descripcion: "Desplegamos un agente de IA entrenado con el conocimiento real de tu empresa. Atiende a tus clientes por los canales que ya usan — WhatsApp, voz o web — resuelve lo que puede resolver, escala lo que no puede con el contexto completo, y se conecta a tus sistemas para consultar y registrar información en tiempo real.",
    pasos: [
      { titulo: "Base de conocimiento", desc: "Lo que el agente sabe. Sin esto el agente no puede responder bien. Se construye en el setup." },
      { titulo: "Agente conversacional", desc: "Modelo de lenguaje con contexto del cliente, tono definido y límites claros. No improvisa fuera de la base." },
      { titulo: "Resolución o escalamiento", desc: "Resuelve lo que puede en tiempo real. Lo que no puede resolverlo, lo escala con el historial completo." },
      { titulo: "Orquestación", desc: "Make.com conecta el agente con el canal, gestiona el flujo y registra cada interacción." },
    ],
    features: [
      "Activo 24/7 en WhatsApp con base de conocimiento propia",
      "Consulta tus sistemas en tiempo real para responder con datos reales",
      "Escala con historial completo — el cliente no repite nada",
      "Responde solo con información validada — sin alucinaciones",
    ],
    addons: {
      label: "Add-ons disponibles",
      items: ["Agente de voz (VAPI)", "Autenticación de usuarios", "Conexión a APIs", "Procesamiento de pagos"],
    },
    para_quien: [
      "Empresas con alto volumen de consultas repetitivas por WhatsApp u otros canales",
      "Call centers que quieren extender horario o reducir carga operativa",
      "Empresas que ya tienen base de conocimiento pero no la tienen activada en atención",
    ],
    no_es_para: [
      "Empresas sin procesos de atención definidos",
      "Casos donde casi toda la atención requiere criterio humano complejo",
    ],
    stack: ["WhatsApp Business API", "OpenAI", "Claude", "Make.com", "Airtable", "Monday.com"],
  },
  {
    id: "signal-engine",
    numero: "04",
    nombre: "Signal Engine",
    tagline: "Tu negocio detecta oportunidades en sus propios datos y actúa solo — sin que nadie tenga que estar mirando reportes.",
    color: "lavender",
    problema: "Tu empresa acumula datos todos los días — en el CRM, en el sistema de facturación, en la app de loyalty. Pero esos datos están dormidos. Nadie los mira en tiempo real, y cuando alguien los analiza ya es tarde para actuar. Las campañas se lanzan para todos igual, las oportunidades se pierden porque nadie las detectó a tiempo.",
    descripcion: "Conectamos tus fuentes de datos, las analizamos con IA de forma continua, y cuando detecta una señal relevante — actúa solo. Tu negocio aprende de su propio comportamiento y responde en tiempo real bajo reglas explícitas que tú defines.",
    pasos: [
      { titulo: "Integración de fuentes", desc: "Conectamos tu CRM, loyalty, facturación y otras plataformas con API disponible." },
      { titulo: "Análisis continuo con IA", desc: "El sistema analiza patrones de comportamiento, métricas clave y anomalías de forma continua." },
      { titulo: "Reglas de negocio", desc: "Definen contigo qué señales importan y qué acción dispara cada una. Nada autónomo sin reglas explícitas." },
      { titulo: "Acción automatizada", desc: "WhatsApp, email, registro en CRM o activación de beneficio — cuando las condiciones se cumplen." },
    ],
    features: [
      "Integra CRM, loyalty, facturación y otras fuentes en un solo flujo",
      "Detecta patrones de comportamiento en tiempo real",
      "Dispara acciones automáticas por WhatsApp o email según reglas definidas",
      "Todo bajo reglas explícitas — sin acciones autónomas sin control",
    ],
    addons: {
      label: "Sectores frecuentes",
      items: ["Retail y centros comerciales", "Telecomunicaciones", "Salud", "Finanzas"],
    },
    para_quien: [
      "Empresas con datos de clientes dispersos en varios sistemas que hoy no se cruzan",
      "Equipos de marketing que lanzan campañas manuales y genéricas por falta de automatización",
      "Organizaciones con CRM activo pero que no lo usan para disparar acciones en tiempo real",
    ],
    no_es_para: [
      "Empresas sin datos estructurados o plataformas sin API disponible",
      "Organizaciones que no tienen claridad sobre qué comportamiento quieren detectar",
    ],
    stack: ["Make.com", "OpenAI", "Gemini", "Monday.com", "WhatsApp Business API"],
  },
];

const productosEn: ProductoDetalle[] = [
  {
    id: "ia-lab",
    numero: "01",
    nombre: "IA Lab",
    tagline: "In 90 days you know whether your AI hypothesis works, with real data and the system already built.",
    color: "purple",
    problema: "Companies know they should adopt AI but don't know where to start without putting their systems or budgets at risk. Generic exploration projects are expensive, take months and end in reports with nothing implemented. The result: investment with no measurable return, and internal resistance that blocks real adoption.",
    descripcion: "We take a specific business use case, build an experiment on real architecture, measure it against metrics defined from the start, and iterate at least twice, all in a sandbox environment without touching production systems. In 90 days you have a data-driven decision: scale it or not. And if it scales, the system is already built.",
    pasos: [
      { titulo: "Definition", desc: "Use case, hypothesis, technical and business success metrics. Without a defined KPI, the experiment does not start." },
      { titulo: "Build", desc: "A complete working architecture in a sandbox: data, flows, intelligence. Never in production." },
      { titulo: "Iteration", desc: "At least two cycles of adjustment and measurement with the client's real data." },
      { titulo: "Decision", desc: "Does it meet the metric? Is the impact measurable? Is the projected cost viable? If so, it is ready for production." },
    ],
    features: [
      "From hypothesis to a validated MVP in 90 days",
      "Secure sandbox, without touching production systems",
      "Technical and business metrics defined before we start",
      "At least 2 iteration cycles per use case",
    ],
    addons: {
      label: "Common use cases",
      items: ["Document processing", "Customer service", "Automated reports", "Automated onboarding"],
    },
    para_quien: [
      "Mid-size and large companies that want to validate AI before committing budget",
      "Organizations with repetitive processes where they suspect AI can help but are not sure",
      "Innovation teams that need evidence to sell the idea internally",
    ],
    no_es_para: [
      "Companies that already know exactly what to build and have an approved budget",
      "Projects with no access to real process data",
    ],
    stack: ["Make.com", "OpenAI", "Claude", "Gemini", "Airtable", "Monday.com"],
  },
  {
    id: "knowledge-engine",
    numero: "02",
    nombre: "Knowledge Engine",
    tagline: "Your knowledge base always up to date, without waiting for someone to find the time to write.",
    color: "blue",
    problema: "Your support team loses hours answering the same questions over and over. The knowledge base exists, but it is outdated, incomplete or poorly organized. When processes change, nobody updates the documentation. The result: agents improvise, customers can't find answers, and tickets keep piling up.",
    descripcion: "We build and maintain your help desk's knowledge base with AI agents. Your team gives the instructions, the agents write the content, you approve it, and the system publishes and updates it automatically on the platform you already use.",
    pasos: [
      { titulo: "Ingestion", desc: "The client hands over what they have: PDFs, resolved tickets, manuals. The agents structure the base." },
      { titulo: "Generation", desc: "The team says which article it needs. The agent writes the draft using only validated information." },
      { titulo: "Validation", desc: "The reviewer approves or rejects with comments. If rejected, the agent fixes it without starting over." },
      { titulo: "Publishing", desc: "The system publishes automatically. When something changes, it detects the affected articles and flags them for update." },
    ],
    features: [
      "Writes articles from plain-language instructions",
      "Editorial flow with approval, rejection and scheduled dates",
      "Publishes automatically to Zendesk, WordPress, Confluence and more",
      "Detects outdated content and flags it for review",
    ],
    addons: {
      label: "Available add-ons",
      items: ["Multiple languages", "Automatic updates", "AI-generated images"],
    },
    para_quien: [
      "Companies whose support teams handle a high volume of repetitive questions",
      "Organizations with scattered documentation that nobody keeps up to date",
      "Companies that already use Zendesk, Freshdesk or similar but get far less out of it than they could",
    ],
    no_es_para: [
      "Companies with no documented processes at all",
      "Teams without someone responsible for reviewing the generated content",
    ],
    stack: ["Claude", "Make.com", "Airtable", "Monday.com", "Zendesk", "Confluence"],
  },
  {
    id: "support-engine",
    numero: "03",
    nombre: "Support Engine",
    tagline: "Your people only handle the cases that truly need human judgment.",
    color: "teal",
    problema: "Support teams answer the same questions every day. Volume grows, hiring more agents is expensive, and generic bots don't know your business, so they end up frustrating customers without solving anything. Human agents burn out on cases that don't need human judgment, and response times stay high.",
    descripcion: "We deploy an AI agent trained on your company's real knowledge. It serves your customers on the channels they already use (WhatsApp, voice or web), resolves what it can, escalates what it can't with the full context, and connects to your systems to look up and record information in real time.",
    pasos: [
      { titulo: "Knowledge base", desc: "What the agent knows. Without it, the agent can't answer well. It is built during setup." },
      { titulo: "Conversational agent", desc: "A language model with the client's context, a defined tone and clear limits. It does not improvise beyond the base." },
      { titulo: "Resolution or escalation", desc: "It resolves what it can in real time. What it can't, it escalates with the full history." },
      { titulo: "Orchestration", desc: "Make.com connects the agent to the channel, manages the flow and records every interaction." },
    ],
    features: [
      "Live 24/7 on WhatsApp with its own knowledge base",
      "Queries your systems in real time to answer with real data",
      "Escalates with the full history, so the customer never repeats anything",
      "Answers only with validated information, with no hallucinations",
    ],
    addons: {
      label: "Available add-ons",
      items: ["Voice agent (VAPI)", "User authentication", "API connections", "Payment processing"],
    },
    para_quien: [
      "Companies with a high volume of repetitive questions on WhatsApp or other channels",
      "Call centers that want to extend their hours or reduce operational load",
      "Companies that already have a knowledge base but haven't put it to work in customer service",
    ],
    no_es_para: [
      "Companies without defined customer service processes",
      "Cases where almost all service requires complex human judgment",
    ],
    stack: ["WhatsApp Business API", "OpenAI", "Claude", "Make.com", "Airtable", "Monday.com"],
  },
  {
    id: "signal-engine",
    numero: "04",
    nombre: "Signal Engine",
    tagline: "Your business spots opportunities in its own data and acts on them, without anyone watching reports.",
    color: "lavender",
    problema: "Your company collects data every day: in the CRM, in the billing system, in the loyalty app. But that data sits idle. Nobody looks at it in real time, and by the time someone analyzes it, it is too late to act. Campaigns go out the same for everyone, and opportunities are lost because nobody caught them in time.",
    descripcion: "We connect your data sources, analyze them continuously with AI, and when the system detects a relevant signal, it acts on its own. Your business learns from its own behavior and responds in real time under explicit rules that you define.",
    pasos: [
      { titulo: "Source integration", desc: "We connect your CRM, loyalty, billing and other platforms that have an API." },
      { titulo: "Continuous AI analysis", desc: "The system continuously analyzes behavior patterns, key metrics and anomalies." },
      { titulo: "Business rules", desc: "Defined with you: which signals matter and which action each one triggers. Nothing runs autonomously without explicit rules." },
      { titulo: "Automated action", desc: "WhatsApp, email, a CRM record or a benefit activation, whenever the conditions are met." },
    ],
    features: [
      "Brings CRM, loyalty, billing and other sources into a single flow",
      "Detects behavior patterns in real time",
      "Triggers automatic WhatsApp or email actions based on defined rules",
      "Everything runs on explicit rules, with no uncontrolled autonomous actions",
    ],
    addons: {
      label: "Common industries",
      items: ["Retail and shopping malls", "Telecommunications", "Healthcare", "Finance"],
    },
    para_quien: [
      "Companies with customer data spread across several systems that never get cross-referenced",
      "Marketing teams that run manual, generic campaigns for lack of automation",
      "Organizations with an active CRM that they don't use to trigger real-time actions",
    ],
    no_es_para: [
      "Companies without structured data, or platforms without an API",
      "Organizations without clarity on what behavior they want to detect",
    ],
    stack: ["Make.com", "OpenAI", "Gemini", "Monday.com", "WhatsApp Business API"],
  },
];

export const productosDetalle: Record<Idioma, ProductoDetalle[]> = { es: productosEs, en: productosEn };

export type TextosProductosPagina = {
  meta: { title: string; descriptionSinEcommerce: string };
  eyebrow: string;
  sinEcommerce: { h1a: string; h1b: string; texto: string };
  puertasAria: string;
  serviciosAria: string;
  producto: string;
  engagement: string;
  cta: string;
  problema: string;
  comoFunciona: string;
  queIncluye: string;
  paraQuien: string;
  noEsPara: string;
  stack: string;
  bandaFinal: { titulo: string; descripcion: string; ctaSecundario: string };
};

export const productosPagina: Record<Idioma, TextosProductosPagina> = {
  es: {
    meta: {
      title: "Productos",
      descriptionSinEcommerce:
        "Soluciones de automatización con IA para tu empresa. Knowledge Engine, Support Engine, IA Lab y Signal Engine.",
    },
    eyebrow: "Nuestros productos",
    sinEcommerce: {
      h1a: "Automatización con IA,",
      h1b: "lista para tu operación",
      texto:
        "Cada producto resuelve un problema concreto. No son demos ni conceptos — son sistemas funcionando con arquitectura real, métricas verificables y soporte continuo.",
    },
    puertasAria: "Dos formas de empezar",
    serviciosAria: "Servicios",
    producto: "Producto",
    engagement: "Engagement de 90 días",
    cta: "Agendar diagnóstico →",
    problema: "El problema",
    comoFunciona: "Cómo funciona",
    queIncluye: "Qué incluye",
    paraQuien: "Para quién es",
    noEsPara: "No es para",
    stack: "Stack tecnológico",
    bandaFinal: {
      titulo: "¿Cuál de estos productos es para tu empresa?",
      descripcion:
        "Agenda una llamada de 20 minutos. Revisamos un proceso concreto y te decimos qué producto encaja mejor con tu operación.",
      ctaSecundario: "Ver casos de éxito",
    },
  },
  en: {
    meta: {
      title: "Products",
      descriptionSinEcommerce:
        "AI automation solutions for your company. Knowledge Engine, Support Engine, IA Lab and Signal Engine.",
    },
    eyebrow: "Our products",
    sinEcommerce: {
      h1a: "AI automation,",
      h1b: "ready for your operation",
      texto:
        "Each product solves a specific problem. They are not demos or concepts: they are working systems with real architecture, verifiable metrics and ongoing support.",
    },
    puertasAria: "Two ways to start",
    serviciosAria: "Services",
    producto: "Product",
    engagement: "90-day engagement",
    cta: "Book an assessment →",
    problema: "The problem",
    comoFunciona: "How it works",
    queIncluye: "What's included",
    paraQuien: "Who it's for",
    noEsPara: "Not for",
    stack: "Tech stack",
    bandaFinal: {
      titulo: "Which of these products is right for your company?",
      descripcion:
        "Book a 20-minute call. We review one specific process and tell you which product best fits your operation.",
      ctaSecundario: "See case studies",
    },
  },
};
