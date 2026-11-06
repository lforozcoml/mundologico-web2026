import { NextRequest, NextResponse } from "next/server";
import { validateContact, type ContactData, type ContactPayload } from "@/lib/contact";
import { log, motivoError } from "@/lib/log";
import { site } from "@/content/data/site";

// Rate limiter in-memory: 3 envíos por IP cada 60 segundos.
// Solo vive dentro de una instancia caliente del serverless; la protección real es Turnstile.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_PER_WINDOW) return true;
  entry.count++;
  return false;
}

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const MAKE_TIMEOUT_MS = 8000;
const ES_PRODUCCION = process.env.VERCEL_ENV === "production";

/** TURNSTILE_VERIFY_URL solo existe para los tests (servidor simulado). En producción se ignora. */
function turnstileUrl(): string {
  return !ES_PRODUCCION && process.env.TURNSTILE_VERIFY_URL ? process.env.TURNSTILE_VERIFY_URL : TURNSTILE_VERIFY_URL;
}

type TurnstileResult = { success: boolean; "error-codes"?: string[]; hostname?: string };

async function verifyTurnstile(token: string, ip: string, secret: string): Promise<TurnstileResult> {
  const form = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") form.set("remoteip", ip);
  const res = await fetch(turnstileUrl(), {
    method: "POST",
    body: form,
    signal: AbortSignal.timeout(5000),
  });
  return (await res.json()) as TurnstileResult;
}

type ResultadoMake = { ok: true } | { ok: false; motivo: string };

async function notificarMake(webhookUrl: string, payload: ContactPayload): Promise<ResultadoMake> {
  // Header secreto opcional: el escenario de Make descarta lo que no lo traiga.
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.MAKE_WEBHOOK_SECRET) headers["x-ml-secret"] = process.env.MAKE_WEBHOOK_SECRET;
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(MAKE_TIMEOUT_MS),
    });
    return res.ok ? { ok: true } : { ok: false, motivo: `http-${res.status}` };
  } catch (err) {
    return { ok: false, motivo: motivoError(err) };
  }
}

function payloadMake(data: ContactData, timestamp: string): ContactPayload {
  return {
    nombre: data.nombre,
    apellidos: data.apellidos,
    empresa: data.empresa,
    email: data.email,
    interes: data.interes,
    mensaje: data.mensaje,
    origen: "mundologico.com",
    timestamp,
    telefono: data.telefono,
    fuente: data.fuente,
    consentimiento: data.consentimiento,
  };
}

/**
 * Orden: validar, Turnstile, enviar a Make. Make es quien escribe el lead en Airtable
 * y manda los correos; el sitio no habla con Airtable.
 */
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera un momento antes de volver a enviar." },
      { status: 429 }
    );
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  if (!webhookUrl || !turnstileSecret) {
    log.error("contacto.config_incompleta", {
      MAKE_WEBHOOK_URL: Boolean(webhookUrl),
      TURNSTILE_SECRET_KEY: Boolean(turnstileSecret),
      vercel_env: process.env.VERCEL_ENV,
    });
    return NextResponse.json(
      { error: "Configuración incompleta en el servidor" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const result = validateContact(body);

  if (result.kind === "spam") {
    // Se responde ok para que el bot no sepa que fue detectado.
    log.warn("contacto.spam_descartado", { motivo: result.reason });
    return NextResponse.json({ ok: true }, { status: 200 });
  }
  if (result.kind === "invalid") {
    return NextResponse.json({ error: result.error }, { status: 422 });
  }

  let turnstile: TurnstileResult;
  try {
    turnstile = await verifyTurnstile(result.token, ip, turnstileSecret);
  } catch (err) {
    log.error("contacto.turnstile_error", { motivo: motivoError(err) });
    return NextResponse.json(
      { error: "No pudimos verificar el envío. Intenta de nuevo en un momento." },
      { status: 503 }
    );
  }
  if (!turnstile.success) {
    log.warn("contacto.turnstile_rechazo", { codigos: turnstile["error-codes"]?.join(",") });
    return NextResponse.json(
      { error: "No pudimos verificar que eres una persona. Recarga la página e intenta de nuevo." },
      { status: 403 }
    );
  }

  const { data } = result;
  const id = crypto.randomUUID();
  const fecha = new Date().toISOString();
  const contexto = { id, fuente: data.fuente, interes: data.interes };

  const make = await notificarMake(webhookUrl, payloadMake(data, fecha));
  if (!make.ok) {
    log.error("contacto.make_error", { ...contexto, motivo: make.motivo });
    return NextResponse.json(
      { error: `No pudimos registrar tu mensaje. Intenta de nuevo o escríbenos a ${site.contacto.email}.` },
      { status: 502 }
    );
  }
  log.info("contacto.make_ok", contexto);

  return NextResponse.json({ ok: true }, { status: 200 });
}
