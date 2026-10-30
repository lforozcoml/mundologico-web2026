import { NextRequest, NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";

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

type TurnstileResult = { success: boolean; "error-codes"?: string[]; hostname?: string };

async function verifyTurnstile(token: string, ip: string, secret: string): Promise<TurnstileResult> {
  const form = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") form.set("remoteip", ip);
  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    body: form,
    signal: AbortSignal.timeout(5000),
  });
  return (await res.json()) as TurnstileResult;
}

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
    console.error("[contact] Falta configuración:", {
      MAKE_WEBHOOK_URL: Boolean(webhookUrl),
      TURNSTILE_SECRET_KEY: Boolean(turnstileSecret),
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
    console.warn("[contact] Spam descartado:", { reason: result.reason, ip });
    return NextResponse.json({ ok: true }, { status: 200 });
  }
  if (result.kind === "invalid") {
    return NextResponse.json({ error: result.error }, { status: 422 });
  }

  let turnstile: TurnstileResult;
  try {
    turnstile = await verifyTurnstile(result.token, ip, turnstileSecret);
  } catch (err) {
    console.error("[contact] Error verificando Turnstile:", err);
    return NextResponse.json(
      { error: "No pudimos verificar el envío. Intenta de nuevo en un momento." },
      { status: 503 }
    );
  }
  if (!turnstile.success) {
    console.warn("[contact] Turnstile rechazó el envío:", { codes: turnstile["error-codes"], ip });
    return NextResponse.json(
      { error: "No pudimos verificar que eres una persona. Recarga la página e intenta de nuevo." },
      { status: 403 }
    );
  }

  const payload: ContactPayload = {
    ...result.data,
    origen: "mundologico.com",
    timestamp: new Date().toISOString(),
  };

  // Header secreto opcional: el escenario de Make descarta lo que no lo traiga.
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.MAKE_WEBHOOK_SECRET) headers["x-ml-secret"] = process.env.MAKE_WEBHOOK_SECRET;

  try {
    const makeRes = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!makeRes.ok) {
      console.error("[contact] Make respondió con error:", makeRes.status);
      return NextResponse.json(
        { error: "Error al procesar la solicitud" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Error llamando a Make webhook:", err);
    return NextResponse.json(
      { error: "No se pudo conectar con el servidor de procesamiento" },
      { status: 503 }
    );
  }
}
