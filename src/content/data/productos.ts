import type { Idioma } from "../../lib/i18n/config.ts";

export type Producto = {
  id: string;
  numero: string;
  nombre: string;
  tagline: string;
  descripcion: string;
  features: string[];
  addons: { label: string; items: string[] };
  color: "blue" | "teal" | "purple" | "lavender";
};

export const productos: Producto[] = [
  {
    id: "ia-lab",
    numero: "01",
    nombre: "IA Lab",
    tagline:
      "En 90 días sabes si tu hipótesis de IA funciona — con datos reales y el sistema ya construido.",
    descripcion:
      "Tomamos un caso de uso concreto, construimos el experimento con arquitectura real, lo medimos y lo iteramos en un sandbox seguro. Al final tienes una decisión basada en datos: escalar o no. Si escala, el sistema ya está listo.",
    features: [
      "De la hipótesis a un MVP validado en 90 días",
      "Sandbox seguro — sin tocar sistemas productivos",
      "Métricas técnicas y de negocio definidas antes de arrancar",
      "Mínimo 2 ciclos de iteración por caso de uso",
    ],
    addons: {
      label: "Casos de uso frecuentes",
      items: [
        "Procesamiento de documentos",
        "Atención al cliente",
        "Reportes automáticos",
        "Onboarding automatizado",
      ],
    },
    color: "purple",
  },
  {
    id: "knowledge-engine",
    numero: "02",
    nombre: "Knowledge Engine",
    tagline:
      "Tu base de conocimiento siempre actualizada, sin depender de que alguien encuentre el tiempo de escribir.",
    descripcion:
      "Agentes de IA que construyen y mantienen la base de conocimiento de tu equipo de soporte. Tu equipo da las instrucciones, los agentes generan el contenido, tú lo validas, y el sistema publica automáticamente.",
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
    color: "blue",
  },
  {
    id: "support-engine",
    numero: "03",
    nombre: "Support Engine",
    tagline:
      "Tu equipo humano solo atiende los casos que realmente necesitan juicio humano.",
    descripcion:
      "Un agente de IA entrenado con el conocimiento real de tu empresa que atiende clientes por WhatsApp, voz o web. Resuelve lo que puede, escala lo que no — con el contexto completo para el agente humano.",
    features: [
      "Activo 24/7 en WhatsApp con base de conocimiento propia",
      "Consulta tus sistemas en tiempo real para responder con datos reales",
      "Escala con historial completo — el cliente no repite nada",
      "Responde solo con información validada — sin alucinaciones",
    ],
    addons: {
      label: "Add-ons disponibles",
      items: [
        "Agente de voz (VAPI)",
        "Autenticación de usuarios",
        "Conexión a APIs",
        "Procesamiento de pagos",
      ],
    },
    color: "teal",
  },
  {
    id: "signal-engine",
    numero: "04",
    nombre: "Signal Engine",
    tagline:
      "Tu negocio detecta oportunidades en sus propios datos y actúa solo — sin que nadie tenga que estar mirando reportes.",
    descripcion:
      "Conectamos tus fuentes de datos, las analizamos con IA de forma continua, y cuando se detecta una señal relevante el sistema actúa automáticamente. El equipo define las reglas una vez — el sistema las ejecuta siempre.",
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
    color: "lavender",
  },
];

/** Borrador en inglés (pendiente de revisión, ver i18n/revision.ts). Mismo orden e ids. */
const productosEn: Producto[] = [
  {
    id: "ia-lab",
    numero: "01",
    nombre: "IA Lab",
    tagline: "In 90 days you know whether your AI hypothesis works, with real data and the system already built.",
    descripcion:
      "We take a specific use case, build the experiment on real architecture, measure it and iterate in a secure sandbox. In the end you have a data-driven decision: scale it or not. If it scales, the system is ready.",
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
    color: "purple",
  },
  {
    id: "knowledge-engine",
    numero: "02",
    nombre: "Knowledge Engine",
    tagline: "Your knowledge base always up to date, without waiting for someone to find the time to write.",
    descripcion:
      "AI agents that build and maintain your support team's knowledge base. Your team gives the instructions, the agents write the content, you approve it, and the system publishes it automatically.",
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
    color: "blue",
  },
  {
    id: "support-engine",
    numero: "03",
    nombre: "Support Engine",
    tagline: "Your people only handle the cases that truly need human judgment.",
    descripcion:
      "An AI agent trained on your company's real knowledge that serves customers on WhatsApp, voice or web. It resolves what it can and escalates what it can't, with the full context for the human agent.",
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
    color: "teal",
  },
  {
    id: "signal-engine",
    numero: "04",
    nombre: "Signal Engine",
    tagline: "Your business spots opportunities in its own data and acts on them, without anyone watching reports.",
    descripcion:
      "We connect your data sources, analyze them continuously with AI, and when a relevant signal shows up the system acts automatically. Your team defines the rules once and the system applies them every time.",
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
    color: "lavender",
  },
];

/** Productos por idioma. El español es el arreglo `productos` de arriba, sin cambios. */
export const productosPorIdioma: Record<Idioma, Producto[]> = { es: productos, en: productosEn };
