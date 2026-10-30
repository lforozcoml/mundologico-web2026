/**
 * Contrato y validación del formulario de contacto. Lo usan el formulario
 * (límites de longitud) y /api/contact (validación en el servidor).
 */

export const CONTACT_LIMITS = {
  nombre: 80,
  apellidos: 80,
  empresa: 120,
  email: 254,
  interes: 60,
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
  interes: string;
  mensaje: string;
  /** Campo trampa: debe llegar vacío. */
  [HONEYPOT_FIELD]: string;
  /** Milisegundos entre que se pintó el formulario y el envío. */
  elapsedMs: number;
  turnstileToken: string;
};

/** Lo que /api/contact manda al webhook de Make. */
export type ContactPayload = {
  nombre: string;
  apellidos: string;
  empresa: string;
  email: string;
  interes: string;
  mensaje: string;
  origen: string;
  timestamp: string;
};

export type ContactValidation =
  | { kind: "ok"; data: Omit<ContactPayload, "origen" | "timestamp">; token: string }
  /** Error que se le muestra al usuario. */
  | { kind: "invalid"; error: string }
  /** Bot detectado: se responde ok para que no se adapte, pero no se envía nada. */
  | { kind: "spam"; reason: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LINK_RE = /(https?:\/\/|www\.)/i;
const LINKS_RE = /(https?:\/\/|www\.)/gi;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
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

  const data = {
    nombre: str(b.nombre),
    apellidos: str(b.apellidos),
    empresa: str(b.empresa),
    email: str(b.email).toLowerCase(),
    interes: str(b.interes),
    mensaje: str(b.mensaje),
  };

  if (!data.nombre || !data.apellidos || !data.email || !data.mensaje) {
    return { kind: "invalid", error: "Faltan campos requeridos: nombres, apellidos, email y mensaje." };
  }
  if (
    data.nombre.length > CONTACT_LIMITS.nombre ||
    data.apellidos.length > CONTACT_LIMITS.apellidos ||
    data.empresa.length > CONTACT_LIMITS.empresa ||
    data.email.length > CONTACT_LIMITS.email ||
    data.interes.length > CONTACT_LIMITS.interes ||
    data.mensaje.length > CONTACT_LIMITS.mensaje
  ) {
    return { kind: "invalid", error: "Uno de los campos es demasiado largo." };
  }
  if (data.mensaje.length < CONTACT_LIMITS.mensajeMin) {
    return { kind: "invalid", error: "Cuéntanos un poco más sobre tu proceso." };
  }
  if (!EMAIL_RE.test(data.email)) {
    return { kind: "invalid", error: "El email no es válido." };
  }
  // Los bots de spam meten enlaces en el nombre o llenan el mensaje de ellos.
  if (LINK_RE.test(data.nombre + data.apellidos) || (data.mensaje.match(LINKS_RE)?.length ?? 0) > MAX_LINKS) {
    return { kind: "spam", reason: "links" };
  }

  const token = str(b.turnstileToken);
  if (!token) {
    return { kind: "invalid", error: "Completa la verificación de seguridad antes de enviar." };
  }

  return { kind: "ok", data, token };
}
