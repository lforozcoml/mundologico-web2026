import { NextRequest, NextResponse } from "next/server";

export interface ContactPayload {
  nombre: string;
  empresa: string;
  email: string;
  interes: string;
  mensaje: string;
  origen: string;
  timestamp: string;
}

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("[contact] MAKE_WEBHOOK_URL no está configurado");
    return NextResponse.json(
      { error: "Configuración incompleta en el servidor" },
      { status: 500 }
    );
  }

  let body: Partial<ContactPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  // Validación de campos requeridos
  const { nombre, email, mensaje } = body;
  if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
    return NextResponse.json(
      { error: "Faltan campos requeridos: nombre, email y mensaje son obligatorios" },
      { status: 422 }
    );
  }

  // Validación básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return NextResponse.json({ error: "Email inválido" }, { status: 422 });
  }

  const payload: ContactPayload = {
    nombre: nombre.trim(),
    empresa: body.empresa?.trim() ?? "",
    email: email.trim().toLowerCase(),
    interes: body.interes?.trim() ?? "",
    mensaje: mensaje.trim(),
    origen: "mundologico.com",
    timestamp: new Date().toISOString(),
  };

  try {
    const makeRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
