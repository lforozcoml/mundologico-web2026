import type { Idioma } from "@/lib/contact";

/**
 * Textos de la tarjeta digital (/contacto/[slug]) en español e inglés.
 * Ningún texto visible de la tarjeta, del bloque de captura ni de sus errores
 * va suelto en el JSX: todo sale de aquí. Sin raya larga (em dash).
 */
export type TextosTarjeta = {
  lema: string;
  irAlSitio: string;
  selectorIdioma: string;
  nombreIdioma: Record<Idioma, string>;
  guardar: string;
  llamar: string;
  whatsapp: string;
  web: string;
  agendar: string;
  descripcionPersona: (nombre: string, empresa: string) => string;
  descripcionEmpresa: (empresa: string) => string;
  captura: {
    titulo: string;
    nombre: string;
    nombrePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    opcionales: string;
    telefono: string;
    telefonoAyuda: string;
    mensaje: string;
    mensajePlaceholder: string;
    consentimientoAntes: string;
    consentimientoEnlace: string;
    consentimientoDespues: string;
    consentimientoError: string;
    consentimientoAyuda: string;
    enviar: string;
    enviando: string;
    verificando: string;
    /** Éxito de la tarjeta. /demos-ml pasa el suyo (prop `exito`). */
    exito: string;
    /** Enlace a /demos-ml en el estado de éxito. */
    verDemos: string;
    errorDatos: string;
    errorLimite: string;
    errorGeneral: string;
    errorConexion: string;
    errorVerificacion: string;
    reintentar: string;
    alternativaAntes: string;
    alternativaO: string;
  };
};

export const textosTarjeta: Record<Idioma, TextosTarjeta> = {
  es: {
    lema: "Automatización e IA para empresas",
    irAlSitio: "Ir a mundologico.com",
    selectorIdioma: "Idioma",
    nombreIdioma: { es: "Español", en: "English" },
    guardar: "Guardar contacto",
    llamar: "Llamar",
    whatsapp: "WhatsApp",
    web: "Visitar sitio web",
    agendar: "Agendar llamada de 20 minutos",
    descripcionPersona: (nombre, empresa) =>
      `Guarda el contacto de ${nombre} de ${empresa}: automatización e IA para empresas.`,
    descripcionEmpresa: (empresa) => `Guarda el contacto de ${empresa}: automatización e IA para empresas.`,
    captura: {
      titulo: "Déjanos tus datos y recibe un correo con acceso a 2 demos de comunicación",
      nombre: "Nombre completo",
      nombrePlaceholder: "Tu nombre y apellido",
      email: "Correo",
      emailPlaceholder: "tu@empresa.com",
      opcionales: "Agregar teléfono o mensaje (opcional)",
      telefono: "Teléfono o WhatsApp",
      telefonoAyuda: "Al menos 7 dígitos. Solo números, espacios, +, - o paréntesis.",
      mensaje: "Mensaje",
      mensajePlaceholder: "¿En qué te podemos ayudar?",
      consentimientoAntes: "Autorizo a Mundo Lógico a tratar mis datos para responder a esta solicitud, según la ",
      consentimientoEnlace: "política de privacidad",
      consentimientoDespues: ".",
      consentimientoError: "Marca la autorización para poder enviar tus datos.",
      consentimientoAyuda: "Para enviar, marca la autorización de tratamiento de datos.",
      enviar: "Enviar mis datos",
      enviando: "Enviando...",
      verificando: "Verificando...",
      exito: "Gracias. Revisa tu correo: te enviamos el acceso a los demos y te escribimos en 24 a 48 horas.",
      verDemos: "Mira los demos →",
      errorDatos: "Revisa tu nombre y tu correo e intenta de nuevo.",
      errorLimite: "Hubo muchos intentos seguidos. Espera un momento e intenta de nuevo.",
      errorGeneral: "No pudimos enviar tus datos.",
      errorConexion: "No pudimos enviar tus datos. Revisa tu conexión.",
      errorVerificacion: "No pudimos verificar tu navegador.",
      reintentar: "Intentar de nuevo",
      alternativaAntes: "Escríbenos por",
      alternativaO: "o a",
    },
  },
  en: {
    lema: "Automation and AI for businesses",
    irAlSitio: "Go to mundologico.com",
    selectorIdioma: "Language",
    nombreIdioma: { es: "Español", en: "English" },
    guardar: "Save contact",
    llamar: "Call",
    whatsapp: "WhatsApp",
    web: "Visit website",
    agendar: "Book a 20-minute call",
    descripcionPersona: (nombre, empresa) =>
      `Save the contact details of ${nombre} at ${empresa}: automation and AI for businesses.`,
    descripcionEmpresa: (empresa) => `Save the contact details of ${empresa}: automation and AI for businesses.`,
    captura: {
      titulo: "Leave your details and get an email with access to 2 communication demos",
      nombre: "Full name",
      nombrePlaceholder: "Your first and last name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      opcionales: "Add phone or message (optional)",
      telefono: "Phone or WhatsApp",
      telefonoAyuda: "At least 7 digits. Numbers, spaces, +, - or parentheses only.",
      mensaje: "Message",
      mensajePlaceholder: "How can we help?",
      consentimientoAntes: "I authorize Mundo Lógico to process my data to respond to this request, as described in the ",
      consentimientoEnlace: "privacy policy",
      // La política solo existe en español.
      consentimientoDespues: " (in Spanish).",
      consentimientoError: "Check the authorization box to send your details.",
      consentimientoAyuda: "To send, check the data authorization box.",
      enviar: "Send my details",
      enviando: "Sending...",
      verificando: "Verifying...",
      exito: "Thanks. Check your email: we sent you access to the demos, and we will reply within 24 to 48 hours.",
      verDemos: "See the demos →",
      errorDatos: "Please check your name and email and try again.",
      errorLimite: "Too many attempts in a row. Wait a moment and try again.",
      errorGeneral: "We couldn't send your details.",
      errorConexion: "We couldn't send your details. Check your connection.",
      errorVerificacion: "We couldn't verify your browser.",
      reintentar: "Try again",
      alternativaAntes: "Message us on",
      alternativaO: "or email",
    },
  },
};
