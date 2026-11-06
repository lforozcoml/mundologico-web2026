import type { ContactData } from "@/lib/contact";
import { motivoError } from "@/lib/log";

/**
 * Guarda leads en la tabla Leads de Airtable (fuente de verdad).
 * Base "Seguimiento de Proyectos", tabla Leads. Los nombres de campo deben coincidir
 * exactamente con los de la tabla; las opciones de Interés y Fuente salen de src/lib/contact.ts.
 */

const AIRTABLE_API_URL = "https://api.airtable.com";
const TIMEOUT_MS = 8000;

export type AirtableConfig = { token: string; baseId: string; tableId: string; apiUrl: string };

export type AirtableEstadoConfig =
  | { kind: "ok"; config: AirtableConfig }
  | { kind: "faltante"; faltan: string[] };

/** Lee la configuración del entorno. No lanza: el handler decide qué hacer si falta. */
export function leerConfigAirtable(env: NodeJS.ProcessEnv = process.env): AirtableEstadoConfig {
  const token = env.AIRTABLE_TOKEN;
  const baseId = env.AIRTABLE_BASE_ID;
  const tableId = env.AIRTABLE_LEADS_TABLE_ID;
  if (!token || !baseId || !tableId) {
    const faltan = [
      !token && "AIRTABLE_TOKEN",
      !baseId && "AIRTABLE_BASE_ID",
      !tableId && "AIRTABLE_LEADS_TABLE_ID",
    ].filter((v): v is string => Boolean(v));
    return { kind: "faltante", faltan };
  }
  // AIRTABLE_API_URL solo existe para los tests (servidor simulado). En producción se ignora.
  const apiUrl =
    env.VERCEL_ENV !== "production" && env.AIRTABLE_API_URL ? env.AIRTABLE_API_URL : AIRTABLE_API_URL;
  return { kind: "ok", config: { token, baseId, tableId, apiUrl } };
}

/** Campos tal como se llaman en la tabla Leads. */
export function camposLead(data: ContactData, fecha: string): Record<string, string | boolean> {
  const campos: Record<string, string | boolean> = {
    Nombre: data.nombre,
    Apellidos: data.apellidos,
    Email: data.email,
    Interés: data.interes,
    Mensaje: data.mensaje,
    Fuente: data.fuente,
    Consentimiento: data.consentimiento,
    Fecha: fecha,
    Estado: "Nuevo",
  };
  // Los opcionales vacíos no se mandan, para no dejar celdas con "".
  if (data.empresa) campos.Empresa = data.empresa;
  if (data.telefono) campos["Teléfono"] = data.telefono;
  return campos;
}

/** Airtable responde `{ error: "TIPO" }` o `{ error: { type: "TIPO", message } }`. */
function tipoErrorAirtable(cuerpo: unknown): string {
  if (typeof cuerpo !== "object" || cuerpo === null || !("error" in cuerpo)) return "";
  const { error } = cuerpo;
  if (typeof error === "string") return error;
  if (typeof error === "object" && error !== null && "type" in error && typeof error.type === "string") {
    return error.type;
  }
  return "";
}

export type ResultadoAirtable = { ok: true; recordId: string } | { ok: false; motivo: string };

export async function guardarLead(
  config: AirtableConfig,
  data: ContactData,
  fecha: string,
): Promise<ResultadoAirtable> {
  const url = `${config.apiUrl}/v0/${encodeURIComponent(config.baseId)}/${encodeURIComponent(config.tableId)}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${config.token}`, "Content-Type": "application/json" },
      // Sin typecast: un valor que no exista en un select debe fallar, no crear opciones nuevas.
      body: JSON.stringify({ fields: camposLead(data, fecha) }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      // Solo el tipo de error de Airtable, nunca el cuerpo completo.
      const tipo = tipoErrorAirtable(await res.json().catch(() => null));
      return { ok: false, motivo: `http-${res.status}${tipo ? `:${tipo}` : ""}` };
    }
    const json: unknown = await res.json().catch(() => null);
    const recordId =
      typeof json === "object" && json !== null && "id" in json && typeof json.id === "string" ? json.id : "";
    return { ok: true, recordId };
  } catch (err) {
    return { ok: false, motivo: motivoError(err) };
  }
}
