/**
 * Textos del home (/ y /en) y de las secciones que comparte con otras páginas
 * (Productos IA, IA Lab, Casos, Contacto, banda final). El español es el copy publicado:
 * no cambiarlo aquí sin pasar por el documento de contenido. El inglés es borrador
 * mientras "inicio" esté en PENDIENTES_REVISION_EN.
 *
 * Imports relativos con .ts para que los tests unitarios lo carguen con Node.
 */

import type { Idioma } from "../../../lib/i18n/config.ts";
import { site, type Cifra } from "../site.ts";
import type { Interes } from "../../../lib/contact.ts";

export type TextosInicio = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    h1: { a: string; b: string; c: string; d: string };
    descripcion: string;
    ctaPrimario: string;
    ctaCasos: string;
    nota: string;
    partners: string;
    fotoAlt: string;
    tarjetaEyebrow: string;
    tarjetaTexto: string;
    tarjetaCta: string;
    perfilPartner: string;
  };
  cifras: readonly Cifra[];
  logos: { ia: string; automatizacion: string };
  productos: {
    eyebrow: string;
    titulo: { a: string; b: string; resaltado: string };
    intro: string;
    producto: string;
    engagement: string;
    verMas: string;
    anterior: string;
    siguiente: string;
    irAlProducto: string;
    notaTitulo: string;
    notaTexto: string;
  };
  iaLab: {
    eyebrow: string;
    subtitulo: string;
    intro: string;
    pasos: readonly { label: string; titulo: string; desc: string }[];
    stackTitulo: string;
    stack: { airtable: string; make: string; monday: string };
    iaSegunCaso: string;
    diferenciaTitulo: string;
    diferenciadores: readonly string[];
    cta: string;
  };
  casos: { eyebrow: string; titulo: string; resaltado: string; intro: string; verCaso: string };
  contacto: {
    eyebrow: string;
    titulo: string;
    intro: string;
    email: string;
    whatsapp: string;
    ubicacion: string;
    ciudad: string;
    exitoTitulo: string;
    exitoTexto: string;
    verDemos: string;
    nombres: string;
    nombresPh: string;
    apellidos: string;
    apellidosPh: string;
    empresa: string;
    empresaPh: string;
    emailLabel: string;
    emailPh: string;
    telefono: string;
    opcional: string;
    telefonoAyuda: string;
    interes: string;
    interesPh: string;
    mensaje: string;
    mensajePh: string;
    consentimientoAntes: string;
    consentimientoEnlace: string;
    consentimientoDespues: string;
    consentimientoError: string;
    honeypot: string;
    verificacionFallo: string;
    reintentar: string;
    escribenos: string;
    oPor: string;
    enviando: string;
    enviar: string;
    verificacionPendiente: string;
    verificando: string;
    ayudaEnvio: string;
    pie: string;
    errorConexion: string;
    errorGeneral: string;
    /**
     * Errores 400 y 429 del servidor. null = mostrar el mensaje de /api/contact, que viene
     * en español; en inglés se reemplaza por estos textos.
     */
    errorDatos: string | null;
    errorLimite: string | null;
  };
  bandaFinal: { titulo: string; descripcion: string; ctaPrimario: string; ctaSecundario: string };
};

export const inicio: Record<Idioma, TextosInicio> = {
  es: {
    meta: {
      title: "Mundo Lógico | Automatización e IA para empresas",
      description:
        "Diseñamos e implementamos automatizaciones con IA para que tu equipo deje de hacer trabajo repetitivo y se enfoque en lo que realmente importa.",
    },
    hero: {
      eyebrow: "Automatización e IA para empresas en Colombia",
      h1: { a: "Automatizamos lo que", b: "frena tu negocio.", c: "Construimos lo que", d: "lo escala." },
      descripcion: site.descripcion,
      ctaPrimario: "Agenda una llamada de 20 minutos →",
      ctaCasos: "Ver casos de éxito",
      nota: "Sin costo. Revisamos un proceso concreto y te decimos si vale la pena automatizarlo.",
      partners: "Partners oficiales:",
      fotoAlt: "Equipo de trabajo revisando un proceso automatizado",
      tarjetaEyebrow: "Casos reales",
      tarjetaTexto: "Sector público, distribución industrial y servicios financieros",
      tarjetaCta: "Ver casos →",
      perfilPartner: "Ver perfil de Mundo Lógico en el directorio de partners",
    },
    cifras: site.cifras.items,
    logos: { ia: "IA agnósticos:", automatizacion: "Automatización:" },
    productos: {
      eyebrow: "Productos IA",
      titulo: { a: "Construido, probado, roto", b: "y mejorado.", resaltado: "Antes de llegar a ti." },
      intro:
        "Cada producto carga con arquitectura real, integraciones en producción y decisiones que solo se aprenden ejecutando. No vendemos el proceso — vendemos el resultado de haberlo hecho antes.",
      producto: "Producto",
      engagement: "Engagement de 90 días",
      verMas: "Ver más información",
      anterior: "Anterior",
      siguiente: "Siguiente",
      irAlProducto: "Ir al producto",
      notaTitulo: "Arquitectura abierta.",
      notaTexto:
        "Cada producto se construye sobre plataformas que el cliente contrata directamente — sin markup de licencias. El costo operativo crece en proporción al uso real, no a nuestra tarifa.",
    },
    iaLab: {
      eyebrow: "🧪 Producto Flagship",
      subtitulo: "Del problema a la prueba. De la prueba a producción.",
      intro:
        "Traes una hipótesis de negocio o un proceso que quieres transformar con IA. Nosotros construimos la arquitectura completa, la probamos con datos reales, y al final sabes si funciona — y si funciona, queda implementado.",
      pasos: [
        {
          label: "Entrada",
          titulo: "Tu hipótesis",
          desc: "Un problema de negocio, un proceso costoso, una idea que quieres probar antes de invertir en grande.",
        },
        {
          label: "Arquitectura",
          titulo: "Simulamos tu operación",
          desc: "Construimos una arquitectura funcional completa: datos en Airtable, flujos en Make, procesos en Monday, inteligencia con la IA adecuada.",
        },
        {
          label: "Prueba",
          titulo: "Datos reales, resultado real",
          desc: "Corremos la solución con tu información. No una demo. Un sistema funcionando que genera métricas verificables.",
        },
        {
          label: "Decisión",
          titulo: "Validas y desplegás",
          desc: "Si la hipótesis se confirma, el sistema ya está construido y listo para producción. Si no, aprendiste sin haber invertido en una implementación completa.",
        },
      ],
      stackTitulo: "Columna vertebral del Lab",
      stack: {
        airtable: "Base de datos flexible — captura y estructura los datos del experimento",
        make: "Motor de automatización — orquesta los flujos y conecta los sistemas",
        monday: "Gestión del proceso — visibilidad y control del flujo de trabajo",
      },
      iaSegunCaso: "+ IA según el caso:",
      diferenciaTitulo: "¿Qué lo diferencia?",
      diferenciadores: [
        "No es una demo ni un piloto genérico. Es tu proceso real corriendo con IA.",
        "Si la hipótesis valida, el sistema ya está construido. Sin re-trabajo.",
        "Si no valida, aprendiste rápido y barato, sin comprometer un presupuesto completo.",
        "Seleccionamos la IA que mejor resuelve tu caso — no la que está de moda.",
      ],
      cta: "Llevar mi hipótesis al IA Lab →",
    },
    casos: {
      eyebrow: "Casos de éxito",
      titulo: "Resultados reales,",
      resaltado: "no promesas",
      intro: "Cada proyecto tiene métricas concretas. Esto es lo que hemos construido para nuestros clientes.",
      verCaso: "Ver caso completo →",
    },
    contacto: {
      eyebrow: "Contacto",
      titulo: "Cuéntanos qué quieres automatizar",
      intro:
        "Agenda una llamada de 20 minutos. Sin compromiso. Revisamos un proceso concreto y te decimos si vale la pena automatizarlo.",
      email: "Email",
      whatsapp: "WhatsApp",
      ubicacion: "Ubicación",
      ciudad: site.contacto.ciudad,
      exitoTitulo: "Mensaje recibido",
      exitoTexto: "Te respondemos en 24 a 48 horas para agendar la llamada.",
      verDemos: "Mira los demos →",
      nombres: "Nombres",
      nombresPh: "Tus nombres",
      apellidos: "Apellidos",
      apellidosPh: "Tus apellidos",
      empresa: "Empresa",
      empresaPh: "Nombre de tu empresa",
      emailLabel: "Email",
      emailPh: "tu@empresa.com",
      telefono: "Teléfono o WhatsApp",
      opcional: "(opcional)",
      telefonoAyuda: "Al menos 7 dígitos. Solo números, espacios, +, - o paréntesis.",
      interes: "¿Qué te interesa?",
      interesPh: "Selecciona una opción",
      mensaje: "Cuéntanos tu proceso o problema",
      mensajePh: "¿Qué proceso quieres automatizar? ¿Qué problema tienes hoy?",
      consentimientoAntes: "Autorizo a Mundo Lógico a tratar mis datos para responder a esta solicitud, según la",
      consentimientoEnlace: "política de privacidad",
      consentimientoDespues: ".",
      consentimientoError: "Marca la autorización para poder enviar tu mensaje.",
      honeypot: "Sitio web",
      verificacionFallo: "No pudimos verificar tu navegador.",
      reintentar: "Intentar de nuevo",
      escribenos: "o escríbenos a",
      oPor: "o por",
      enviando: "Enviando...",
      enviar: "Enviar mensaje →",
      verificacionPendiente: "Verificación pendiente",
      verificando: "Verificando...",
      ayudaEnvio: "Para enviar, marca la autorización de tratamiento de datos.",
      pie: "Sin compromiso. Te respondemos en 24 a 48 horas.",
      errorConexion: "No se pudo enviar el mensaje. Revisa tu conexión e intenta de nuevo.",
      errorGeneral: "Ocurrió un error. Intenta de nuevo o escríbenos directamente.",
      errorDatos: null,
      errorLimite: null,
    },
    bandaFinal: {
      titulo: "¿Tu negocio tiene procesos que se pueden automatizar?",
      descripcion:
        "Agenda una llamada de 20 minutos. Revisamos un proceso concreto y te decimos si vale la pena automatizarlo.",
      ctaPrimario: "Agenda una llamada de 20 minutos →",
      ctaSecundario: "Ver más casos",
    },
  },
  en: {
    meta: {
      title: "Mundo Lógico | Automation and AI for businesses",
      description:
        "We design and implement AI-powered automations so your team stops doing repetitive work and focuses on what really matters.",
    },
    hero: {
      eyebrow: "Automation and AI for businesses in Colombia",
      h1: { a: "We automate what", b: "holds your business back.", c: "We build what", d: "helps it scale." },
      descripcion:
        "We connect your tools, your data and AI agents into one system that handles your team's repetitive work. End-to-end processes, not scattered automations or isolated chatbots.",
      ctaPrimario: "Book a 20-minute call →",
      ctaCasos: "See case studies",
      nota: "Free of charge. We review one specific process and tell you whether it is worth automating.",
      partners: "Official partners:",
      fotoAlt: "Team reviewing an automated process",
      tarjetaEyebrow: "Real cases",
      tarjetaTexto: "Public sector, industrial distribution and financial services",
      tarjetaCta: "See cases →",
      perfilPartner: "See Mundo Lógico's profile in the partner directory",
    },
    cifras: [
      { valor: "21 years", unidad: "", label: "building technology for businesses", complemento: "building technology" },
      { valor: "+70", unidad: "companies", label: "companies with automated processes", complemento: "in Colombia and the US" },
      { valor: "+300", unidad: "automations", label: "automations in production", complemento: "in production" },
    ],
    logos: { ia: "AI agnostic:", automatizacion: "Automation:" },
    productos: {
      eyebrow: "AI products",
      titulo: { a: "Built, tested, broken", b: "and improved.", resaltado: "Before it reaches you." },
      intro:
        "Every product comes with real architecture, integrations running in production and decisions you only learn by doing. We don't sell the process. We sell the result of having done it before.",
      producto: "Product",
      engagement: "90-day engagement",
      verMas: "Learn more",
      anterior: "Previous",
      siguiente: "Next",
      irAlProducto: "Go to product",
      notaTitulo: "Open architecture.",
      notaTexto:
        "Every product runs on platforms the client contracts directly, with no license markup. Operating costs grow with real usage, not with our fees.",
    },
    iaLab: {
      eyebrow: "🧪 Flagship product",
      subtitulo: "From problem to proof. From proof to production.",
      intro:
        "You bring a business hypothesis or a process you want to transform with AI. We build the full architecture, test it with real data, and in the end you know whether it works. If it does, it is already implemented.",
      pasos: [
        {
          label: "Input",
          titulo: "Your hypothesis",
          desc: "A business problem, a costly process, an idea you want to test before investing big.",
        },
        {
          label: "Architecture",
          titulo: "We simulate your operation",
          desc: "We build a complete working architecture: data in Airtable, flows in Make, processes in Monday, intelligence with the right AI.",
        },
        {
          label: "Test",
          titulo: "Real data, real results",
          desc: "We run the solution with your information. Not a demo. A working system that produces verifiable metrics.",
        },
        {
          label: "Decision",
          titulo: "You validate and deploy",
          desc: "If the hypothesis holds, the system is already built and ready for production. If not, you learned without paying for a full implementation.",
        },
      ],
      stackTitulo: "The Lab's backbone",
      stack: {
        airtable: "Flexible database: captures and structures the experiment's data",
        make: "Automation engine: orchestrates the flows and connects the systems",
        monday: "Process management: visibility and control of the workflow",
      },
      iaSegunCaso: "+ AI depending on the case:",
      diferenciaTitulo: "What makes it different?",
      diferenciadores: [
        "It is not a demo or a generic pilot. It is your real process running with AI.",
        "If the hypothesis holds, the system is already built. No rework.",
        "If it doesn't, you learned fast and cheap, without committing a full budget.",
        "We choose the AI that best solves your case, not the one that is trending.",
      ],
      cta: "Bring my hypothesis to the IA Lab →",
    },
    casos: {
      eyebrow: "Case studies",
      titulo: "Real results,",
      resaltado: "not promises",
      intro: "Every project has concrete metrics. This is what we have built for our clients.",
      verCaso: "See the full case →",
    },
    contacto: {
      eyebrow: "Contact",
      titulo: "Tell us what you want to automate",
      intro:
        "Book a 20-minute call. No commitment. We review one specific process and tell you whether it is worth automating.",
      email: "Email",
      whatsapp: "WhatsApp",
      ubicacion: "Location",
      ciudad: "Medellín, Colombia",
      exitoTitulo: "Message received",
      exitoTexto: "We will reply within 24 to 48 hours to schedule the call.",
      verDemos: "See the demos →",
      nombres: "First name",
      nombresPh: "Your first name",
      apellidos: "Last name",
      apellidosPh: "Your last name",
      empresa: "Company",
      empresaPh: "Your company name",
      emailLabel: "Email",
      emailPh: "you@company.com",
      telefono: "Phone or WhatsApp",
      opcional: "(optional)",
      telefonoAyuda: "At least 7 digits. Numbers, spaces, +, - or parentheses only.",
      interes: "What are you interested in?",
      interesPh: "Choose an option",
      mensaje: "Tell us about your process or problem",
      mensajePh: "Which process do you want to automate? What problem do you have today?",
      consentimientoAntes: "I authorize Mundo Lógico to process my data to respond to this request, as described in the",
      consentimientoEnlace: "privacy policy",
      // La política solo existe en español.
      consentimientoDespues: " (in Spanish).",
      consentimientoError: "Check the authorization box to send your message.",
      honeypot: "Website",
      verificacionFallo: "We couldn't verify your browser.",
      reintentar: "Try again",
      escribenos: "or email us at",
      oPor: "or message us on",
      enviando: "Sending...",
      enviar: "Send message →",
      verificacionPendiente: "Verification pending",
      verificando: "Verifying...",
      ayudaEnvio: "To send, check the data authorization box.",
      pie: "No commitment. We reply within 24 to 48 hours.",
      errorConexion: "We couldn't send your message. Check your connection and try again.",
      errorGeneral: "Something went wrong. Try again or email us directly.",
      errorDatos: "Please check the form fields and try again.",
      errorLimite: "Too many attempts in a row. Wait a moment and try again.",
    },
    bandaFinal: {
      titulo: "Does your business have processes that could be automated?",
      descripcion: "Book a 20-minute call. We review one specific process and tell you whether it is worth automating.",
      ctaPrimario: "Book a 20-minute call →",
      ctaSecundario: "See more cases",
    },
  },
};

/** Etiquetas visibles de las opciones del formulario en inglés. El valor que va a Make no cambia. */
export const ETIQUETA_INTERES_EN: Record<Interes, string> = {
  "Knowledge Engine": "Knowledge Engine",
  "Support Engine": "Support Engine",
  "IA Lab": "IA Lab",
  "Signal Engine": "Signal Engine",
  "E-commerce en Shopify": "Shopify e-commerce",
  "Diagnóstico de automatización": "Automation assessment",
  Otro: "Other",
};
