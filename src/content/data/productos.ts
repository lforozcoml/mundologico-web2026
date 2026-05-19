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
    id: "knowledge-engine",
    numero: "01",
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
    numero: "02",
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
    id: "ia-lab",
    numero: "03",
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
