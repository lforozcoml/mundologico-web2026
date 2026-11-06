/**
 * Contrato y validación del formulario de contacto. Lo usan el formulario
 * (opciones y límites), /api/contact (validación en el servidor) y los tests.
 * No importa nada para que los tests unitarios lo carguen con Node directamente.
 */

/**
 * Opciones del selector de interés. Es la única lista: la usan el formulario y el servidor.
 * El valor es lo que viaja a Make (el escenario lo usa): no cambiar los existentes,
 * solo agregar. Lo que ve la persona sale de ETIQUETA_INTERES.
 */
export const INTERESES = [
  "Knowledge Engine",
  "Support Engine",
  "IA Lab",
  "Signal Engine",
  "E-commerce en Shopify",
  "Diagnóstico de automatización",
  "Otro",
] as const;
export type Interes = (typeof INTERESES)[number];

/** Texto visible de cada opción. */
export const ETIQUETA_INTERES: Record<Interes, string> = {
  "Knowledge Engine": "Knowledge Engine",
  "Support Engine": "Support Engine",
  "IA Lab": "IA Lab",
  "Signal Engine": "Signal Engine",
  "E-commerce en Shopify": "E-commerce en Shopify",
  "Diagnóstico de automatización": "Diagnóstico de automatización",
  Otro: "Otro",
};

/** Orígenes permitidos del lead (query param `src`). Coinciden con el campo Fuente de Airtable. */
export const FUENTES = ["web", "nfc", "rueda-2026-11"] as const;
export type Fuente = (typeof FUENTES)[number];
export const FUENTE_POR_DEFECTO: Fuente = "web";

export const CONTACT_LIMITS = {
  nombre: 80,
  apellidos: 80,
  empresa: 120,
  email: 254,
  telefono: 30,
  telefonoMinDigitos: 7,
  mensajeMin: 10,
  mensaje: 4000,
} as const;

/** Envíos más rápidos que esto desde que se pintó el formulario se tratan como bot. */
export const MIN_FILL_MS = 3000;

/** Más enlaces que esto en el mensaje se trata como spam. */
export const MAX_LINKS = 2;

/** Nombre del campo trampa. Invisible para personas; los bots lo llenan. */
export const HONEYPOT_FIELD = "website";

/** Lo que el formulario manda a /api/contact. */
export type ContactRequest = {
  nombre: string;
  apellidos: string;
  empresa: string;
  email: string;
  /** Opcional: cadena vacía si no viene. */
  telefono: string;
  interes: string;
  mensaje: string;
  /** Valor crudo del query param `src`. El servidor lo normaliza a una Fuente. */
  origen: string;
  consentimiento: boolean;
  /** Campo trampa: debe llegar vacío. */
  [HONEYPOT_FIELD]: string;
  /** Milisegundos entre que se pintó el formulario y el envío. */
  elapsedMs: number;
  turnstileToken: string;
};

/** Datos del lead ya validados. */
export type ContactData = {
  nombre: string;
  apellidos: string;
  empresa: string;
  email: string;
  telefono: string;
  interes: Interes;
  mensaje: string;
  fuente: Fuente;
  consentimiento: true;
};

/**
 * Lo que /api/contact manda al webhook de Make. Los campos de antes se mantienen
 * con el mismo nombre (el escenario los usa); los nuevos solo se agregan.
 */
export type ContactPayload = {
  nombre: string;
  apellidos: string;
  empresa: string;
  email: string;
  interes: Interes;
  mensaje: string;
  /** Siempre "mundologico.com". El origen del lead va en `fuente`. */
  origen: "mundologico.com";
  timestamp: string;
  telefono: string;
  fuente: Fuente;
  consentimiento: true;
};

export type ContactValidation =
  | { kind: "ok"; data: ContactData; token: string }
  /** Error que se le muestra al usuario. */
  | { kind: "invalid"; error: string }
  /** Bot detectado: se responde ok para que no se adapte, pero no se envía nada. */
  | { kind: "spam"; reason: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LINK_RE = /(https?:\/\/|www\.)/i;
const LINKS_RE = /(https?:\/\/|www\.)/gi;
const TELEFONO_RE = /^[\d\s+\-()]+$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function esInteres(value: string): value is Interes {
  return (INTERESES as readonly string[]).includes(value);
}

/** Cualquier valor fuera de la lista, o ausente, se guarda como "web". */
export function normalizarFuente(value: unknown): Fuente {
  const v = str(value).toLowerCase();
  return (FUENTES as readonly string[]).includes(v) ? (v as Fuente) : FUENTE_POR_DEFECTO;
}

/** Vacío es válido (el campo es opcional). Si viene: caracteres permitidos y mínimo 7 dígitos. */
export function telefonoValido(value: string): boolean {
  if (value === "") return true;
  if (value.length > CONTACT_LIMITS.telefono || !TELEFONO_RE.test(value)) return false;
  return value.replace(/\D/g, "").length >= CONTACT_LIMITS.telefonoMinDigitos;
}

export function validateContact(body: unknown): ContactValidation {
  if (typeof body !== "object" || body === null) {
    return { kind: "invalid", error: "Cuerpo inválido" };
  }
  const b = body as Record<string, unknown>;

  if (str(b[HONEYPOT_FIELD]) !== "") return { kind: "spam", reason: "honeypot" };
  if (typeof b.elapsedMs !== "number" || b.elapsedMs < MIN_FILL_MS) {
    return { kind: "spam", reason: "too-fast" };
  }

  const nombre = str(b.nombre);
  const apellidos = str(b.apellidos);
  const empresa = str(b.empresa);
  const email = str(b.email).toLowerCase();
  const telefono = str(b.telefono);
  const interes = str(b.interes);
  const mensaje = str(b.mensaje);

  if (!nombre || !apellidos || !email || !mensaje) {
    return { kind: "invalid", error: "Faltan campos requeridos: nombres, apellidos, email y mensaje." };
  }
  if (
    nombre.length > CONTACT_LIMITS.nombre ||
    apellidos.length > CONTACT_LIMITS.apellidos ||
    empresa.length > CONTACT_LIMITS.empresa ||
    email.length > CONTACT_LIMITS.email ||
    mensaje.length > CONTACT_LIMITS.mensaje
  ) {
    return { kind: "invalid", error: "Uno de los campos es demasiado largo." };
  }
  if (mensaje.length < CONTACT_LIMITS.mensajeMin) {
    return { kind: "invalid", error: "Cuéntanos un poco más sobre tu proceso." };
  }
  if (!EMAIL_RE.test(email)) {
    return { kind: "invalid", error: "El email no es válido." };
  }
  if (!esInteres(interes)) {
    return { kind: "invalid", error: "Selecciona qué te interesa." };
  }
  if (!telefonoValido(telefono)) {
    return {
      kind: "invalid",
      error: "El teléfono no es válido. Usa al menos 7 dígitos y solo números, espacios, +, - o paréntesis.",
    };
  }
  // Los bots de spam meten enlaces en el nombre o llenan el mensaje de ellos.
  if (LINK_RE.test(nombre + apellidos) || (mensaje.match(LINKS_RE)?.length ?? 0) > MAX_LINKS) {
    return { kind: "spam", reason: "links" };
  }
  // Tiene que ser exactamente true: ni "true" ni 1.
  if (b.consentimiento !== true) {
    return { kind: "invalid", error: "Debes autorizar el tratamiento de tus datos para enviar el mensaje." };
  }

  const token = str(b.turnstileToken);
  if (!token) {
    return { kind: "invalid", error: "Completa la verificación de seguridad antes de enviar." };
  }

  return {
    kind: "ok",
    data: {
      nombre,
      apellidos,
      empresa,
      email,
      telefono,
      interes,
      mensaje,
      fuente: normalizarFuente(b.origen),
      consentimiento: true,
    },
    token,
  };
}
